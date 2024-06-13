import axios from "axios";
import useSWRImmutable from 'swr/immutable'

const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const fetchResOutput = response.data;
    return fetchResOutput;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export function useVerifyAccess(query = '') {
  const url = `/api/auth/verify`;

  const { data, error } = useSWRImmutable(url, () => fetcher(url));

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}