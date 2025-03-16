import { getPriorities, Priority } from "@/API/priorities";
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const useGetPriorities= <T = Priority[]>(
    {
      queryOptions,
    }: {
      queryOptions?: Omit<UseQueryOptions<Priority[], Error, T>, "queryKey">;
    } = {},
  ): UseQueryResult<T, Error> => {
    return useQuery<Priority[], Error, T>({
      queryKey: ["priorities"],
      queryFn: getPriorities,
      staleTime: 60 * 1000,
      ...queryOptions,
    });
  };



