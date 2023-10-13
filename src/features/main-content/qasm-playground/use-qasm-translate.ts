import { useCallback, useState } from 'react';

export interface IUseQasmTranslateArgs {
  code: string;
}

export interface IUseQasmTranslate {
  isLoading: boolean;
  error: any;
  result: any;
  run: () => void;
}

export const useQasmTranslate = ({
  code
}: IUseQasmTranslateArgs): IUseQasmTranslate => {
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
