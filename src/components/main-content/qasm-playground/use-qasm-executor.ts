import { useCallback, useState } from 'react';

import { sq } from '../../../clients/qasm-runner/src';
import {
  COMPLETED_WAITING_ACTIVE_DELAYED_FAILED_PAUSED_STUCK,
  Data,
  Execution
} from '../../../clients/qasm-runner/src/schema.generated';

export interface IUseQasmExecutorArgs {
  code: string;
  type: 'translation' | 'simulation';
}

export interface IUseQasmExecutor {
  isLoading: boolean;
  error: any;
  result: {
    data: Data[];
    errors: string[];
    warnings: string[];
    infos: string[];
  } | null;

  run: () => void;
}

export const useQasmExecutor = ({
  code,
  type
}: IUseQasmExecutorArgs): IUseQasmExecutor => {
  if (type !== 'translation' && type !== 'simulation') {
    throw new Error('Invalid type');
  }

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IUseQasmExecutor['result']>(null);

  const run = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const base64Code = btoa(code);

      // Step 1: Trigger simulation
      const [response, errors] = await sq.mutate(m =>
        type === 'translation'
          ? m.translate({ base64Code })
          : m.simulate({ base64Code })
      );

      // Check for errors
      if (errors) {
        setError('Error triggering simulation');
        return;
      }

      const executionId = response.id;

      // Step 2: Polling with a 5-second interval
      const pollingInterval = 5000;
      let execution: {
        id: string;
        status: COMPLETED_WAITING_ACTIVE_DELAYED_FAILED_PAUSED_STUCK | null;
        result: {
          data: Data[];
          errors: string[];
          warnings: string[];
          infos: string[];
        };
      };
      do {
        await new Promise(resolve => setTimeout(resolve, pollingInterval));

        // Make a polling API call to get the simulation status
        const [newExecution, errors] = await sq.query(q => {
          const t = q.execution({ taskId: executionId });

          return {
            id: t.id,
            status: t.status,
            result: {
              data: t.data.result?.data || [],
              errors: t.data.result?.errors || [],
              warnings: t.data.result?.warnings || [],
              infos: t.data.result?.infos || []
            }
          };
        });

        if (errors) {
          setError('Error polling simulation');
          return;
        }

        execution = newExecution;

        // Check the status, and update the state accordingly
        if (execution.status === 'completed') {
          // Simulation completed successfully
          setResult(execution.result);
        } else if (execution.status === 'failed') {
          // Simulation failed
          setError('Simulation failed');
        }
        // Continue polling until the status is 'completed' or 'failed'
      } while (
        execution.status !== 'completed' &&
        execution.status !== 'failed'
      );
    } catch (error) {
      // Handle errors from API calls
      setError('Error triggering or polling simulation');
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  return {
    isLoading,
    error,
    result,
    run
  };
};
