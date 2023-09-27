import { useQuery } from 'react-query';

import { fetchAxios } from '../libs/axios';

export const useFetch = (
  queryKey: string | [string, {}],
  method: string,
  url: string,
  params?: {}
) => {
  const { data, error, isFetching } = useQuery(
    queryKey,
    async () =>
      fetchAxios.request({
        method,
        url,
        params,
      }),
    {
      keepPreviousData: true,
      staleTime: 3600000,
      onSuccess: async (response) => {
        return response;
      },
      onError: async (error) => {
        console.log(error);
      },
    }
  );

  return { data, error, isFetching };
};
