import { getSingleTask, getTasks, Task } from "@/API/tasks";
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


  export const useSingleGetTask= <T = Task>(
    {
      queryOptions,
      id
    }: {
      queryOptions?: Omit<UseQueryOptions<Task, Error, T>, "queryKey">;
      id?: number
    } = {},
   
  ): UseQueryResult<T, Error> => {
    if (!id) {
      throw new Error("ID is required to fetch a task");
    }
    return useQuery<Task, Error, T>({
      queryKey: ["tasks", id],
      queryFn: () =>  getSingleTask(id),
      staleTime: 60 * 1000,
      ...queryOptions,
    });
  };

