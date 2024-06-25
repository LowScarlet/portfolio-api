import useSWRImmutable from 'swr/immutable'
import { fetcher } from '../../_utils/fetcher';

export function useVerifyAccess(query = '') {
  const url = `/api/auth/verify`;

  const { data, error } = useSWRImmutable(url, () => fetcher(url));

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}