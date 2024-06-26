import { fetcherClient } from "@/app/_utils/fetcher";
import { getCookie } from 'cookies-next';
import useSWR from "swr";
import { UserInterface, UserInterface_ValidationErrors } from "../../interface/UserInterface";
import { UserProfileInterface } from "../../interface/UserProfileInterface";

interface BadRequest {
  message: string,
  validationErrors: UserInterface_ValidationErrors
}

type Output = { user: UserInterface & { UserProfile: UserProfileInterface } } & BadRequest;

export function useUser() {
  const accessToken = getCookie('accessToken')
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/user`;

  const { data, error } = useSWR<Output>(url, () => fetcherClient(url, accessToken));

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}