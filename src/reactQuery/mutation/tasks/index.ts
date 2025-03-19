import { putTaskStatus } from "@/API/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export const usePutTaskStatus = () => {
   
    const queryClient = useQueryClient(); 

    return useMutation<
      void,
      Error,
      { id: number; statusId: number }
    >({
      mutationKey: ['statusPut'],
      mutationFn: putTaskStatus, 
      onSuccess: (_, { id }) => {   
        console.log('status updated successfully!');
        queryClient.invalidateQueries({
            queryKey: ['tasks', id],
            exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: ['tasks'],
            exact: true,
          });
      },
      onError: (error: Error) => {
        console.error('Error Updating Status:', error);
      },
    });
  };