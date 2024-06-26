import axios from "axios";

const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    return new Error(error.response.data.message);
  } else {
    return new Error('An unexpected error occurred');
  }
}

export const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    throw handleAxiosError(error)
  }
};

export const fetcherClient = async (url: string, accessToken: string | undefined) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw handleAxiosError(error)
  }
};