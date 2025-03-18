import { Comment, getComments } from "@/API/comments";


import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

 export const useGetComments= <T = Comment[]>(
    {
      queryOptions,
      taskId
    }: {
      queryOptions?: Omit<UseQueryOptions<Comment[], Error, T>, "queryKey">;
      taskId?: number
    } = {},
   
  ): UseQueryResult<T, Error> => {
    if (!taskId) {
      throw new Error("Task ID is required to fetch the comments");
    }
    return useQuery<Comment[], Error, T>({
      queryKey: ["comments", taskId],
      queryFn: () =>  getComments(taskId),
      staleTime: 60 * 1000,
      ...queryOptions,
    });
  };