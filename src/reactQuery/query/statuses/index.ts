import { getStatuses, Status } from "@/API/status";
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const useGetStatuses = <T = Status[]>(
    {
      queryOptions,
    }: {
      queryOptions?: Omit<UseQueryOptions<Status[], Error, T>, "queryKey">;
    } = {},
  ): UseQueryResult<T, Error> => {
    return useQuery<Status[], Error, T>({
      queryKey: ["statuses"],
      queryFn:getStatuses,
      staleTime: 60 * 1000,
      ...queryOptions,
    });
  };



