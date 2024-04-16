import { useCallback, useState } from 'react';

export interface IUseQasmSimulateArgs {
  code: string;
}

export interface IUseQasmSimulate {
  isLoading: boolean;
  error: any;
  result: any;
  run: () => void;
}

export const useQasmSimulate = ({
  code
}: IUseQasmSimulateArgs): IUseQasmSimulate => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const run = useCallback(async () => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false);
  }, [code]);

  return {
    isLoading,
    error,
    result,
    run
  };
};
