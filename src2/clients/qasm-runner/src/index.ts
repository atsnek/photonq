import { makeSnekQuery } from 'snek-query';
import { Query, Mutation } from './schema.generated';

export const sq = makeSnekQuery(
  { Query, Mutation },
  {
    apiURL: 'https://qasm-runner.photonq.org/graphql'
  }
);
