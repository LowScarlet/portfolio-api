import { UserInterface, UserInterface_ValidationErrors } from "../../rest/UserInterface";
import { getCookie } from 'cookies-next';
import { UserProfileInterface } from "../../rest/UserProfileInterface";
import useSWR from "swr";
import { fetcherClient } from "@/app/app/_utils/fetcher";

interface BadRequest {
  message: string,
  validationErrors: UserInterface_ValidationErrors
}

type Output = { user: UserInterface & { UserProfile: UserProfileInterface } } & BadRequest;

export function useUser(query = '') {
  const accessToken = getCookie('accessToken')
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/user?${query}`;

  const { data, error } = useSWR<Output>(url, () => fetcherClient(url, accessToken));

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}