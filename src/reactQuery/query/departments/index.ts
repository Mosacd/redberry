import { Departament, getDepartments } from "@/API/departments";

import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const useGetDepartments = <T = Departament[]>(
    {
      queryOptions,
    }: {
      queryOptions?: Omit<UseQueryOptions<Departament[], Error, T>, "queryKey">;
    } = {},
  ): UseQueryResult<T, Error> => {
    return useQuery<Departament[], Error, T>({
      queryKey: ["departments"],
      queryFn:getDepartments,
      staleTime: 60 * 1000,
      ...queryOptions,
    });
  };