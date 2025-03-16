import { Employee, getEmployees } from "@/API/employees";
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const useGetEmployees= <T = Employee[]>(
    {
      queryOptions,
    }: {
      queryOptions?: Omit<UseQueryOptions<Employee[], Error, T>, "queryKey">;
    } = {},
  ): UseQueryResult<T, Error> => {
    return useQuery<Employee[], Error, T>({
      queryKey: ["employees"],
      queryFn: getEmployees,
      staleTime: 60 * 1000,
      ...queryOptions,
    });
  };



