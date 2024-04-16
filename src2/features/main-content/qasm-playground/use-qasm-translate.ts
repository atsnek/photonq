import { useCallback, useState } from 'react';

import { sq } from '../../../clients/qasm-runner/src';
import {
  COMPLETED_WAITING_ACTIVE_DELAYED_FAILED_PAUSED_STUCK,
  Translation
} from '../../../clients/qasm-runner/src/schema.generated';

export interface IUseQasmTranslateArgs {
  code: string;
}

export interface IUseQasmTranslate {
  isLoading: boolean;
  error: any;
  data: {
    translation: (Translation | null)[] | null;
    errors: string[];
    warnings: string[];
  } | null;

  run: () => void;
}

export const useQasmTranslate = ({
  code
}: IUseQasmTranslateArgs): IUseQasmTranslate => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<IUseQasmTranslate['data']>(null);

  const run = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const base64Code = btoa(code);

      // Step 1: Trigger simulation
      const [triggerSimulationResponse, errors] = await sq.mutate(m =>
        m.translate({ base64Code })
      );

      // Check for errors
      if (errors) {
        setError('Error triggering simulation');
        return;
      }

      const translationId = triggerSimulationResponse.id;

      // Step 2: Polling with a 5-second interval
      const pollingInterval = 5000;
      let translate: {
        id: string;
        status: COMPLETED_WAITING_ACTIVE_DELAYED_FAILED_PAUSED_STUCK | null;
        data: {
          translation: (Translation | null)[];
          errors: string[];
          warnings: string[];
        };
      };
      do {
        await new Promise(resolve => setTimeout(resolve, pollingInterval));

        // Make a polling API call to get the simulation status
        const [newTranslate, errors] = await sq.query(q => {
          const t = q.translate({ taskId: translationId });

          return {
            id: t.id,
            status: t.status,
            data: {
              translation: t.data.result?.translation || [],
              errors: t.data.result?.errors || [],
              warnings: t.data.result?.warnings || []
            }
          };
        });

        if (errors) {
          setError('Error polling simulation');
          return;
        }

        translate = newTranslate;

        // Check the status, and update the state accordingly
        if (translate.status === 'completed') {
          // Simulation completed successfully
          setData(translate.data);
        } else if (translate.status === 'failed') {
          // Simulation failed
          setError('Simulation failed');
        }
        // Continue polling until the status is 'completed' or 'failed'
      } while (
        translate.status !== 'completed' &&
        translate.status !== 'failed'
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
    data,
    run
  };
};
