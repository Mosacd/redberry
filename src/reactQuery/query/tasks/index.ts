import { getTasks, Task } from "@/API/tasks";
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const useGetTasks= <T = Task[]>(
    {
      queryOptions,
    }: {
      queryOptions?: Omit<UseQueryOptions<Task[], Error, T>, "queryKey">;
    } = {},
  ): UseQueryResult<T, Error> => {
    return useQuery<Task[], Error, T>({
      queryKey: ["tasks"],
      queryFn: getTasks,
      staleTime: 60 * 1000,
      ...queryOptions,
    });
  };



