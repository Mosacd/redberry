import { postComment } from "@/API/comments";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export const usePostComment = () => {
   
    const queryClient = useQueryClient(); 

    return useMutation<
      void,
      Error,
      { taskId: number; text: string }
    >({
      mutationKey: ['commentPost'],
      mutationFn: postComment, 
      onSuccess: (_, { taskId }) => {   
        console.log('comment posted successfully!');
        queryClient.invalidateQueries({
            queryKey: ['comments', taskId],
            exact: true,
          });
      },
      onError: (error: Error) => {
        console.error('Error Posting Comment:', error);
      },
    });
  };