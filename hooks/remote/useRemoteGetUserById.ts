import { useMemo } from 'react';

import { User } from '../../ts/types/main/User';
import { useFetch } from '../useFetch';

const useRemoteGetUserById = (id: number) => {
  const url = `/users/${id}`;

  const { data, error, isFetching } = useFetch(
    ['getUser', { id }],
    'GET',
    url,
    { limit: 100, skip: 0 }
  );

  const user: User = useMemo(
    () => ({
      id: data?.data.id,
      firstName: data?.data.firstName,
      lastName: data?.data.lastName,
    }),
    [data?.data]
  );

  return { user, error, isFetching };
};

export default useRemoteGetUserById;
