import { postTask, putTaskStatus } from "@/API/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


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

  export const usePostTask = () => {
    const navigate = useNavigate();

    const queryClient = useQueryClient(); 
    
    return useMutation<
      void,
      Error,
      { name:string, description:string, due_date:string, status_id:number, employee_id:number, priority_id:number }
    >({
      mutationKey: ['taskPost'],
      mutationFn: postTask,
      onSuccess: () => {  
        navigate("/");
        console.log('status updated successfully!');
          queryClient.invalidateQueries({
            queryKey: ['tasks'],
            exact: true,
          });
      },
      onError: (error: Error) => {
        console.error('Error Updating Status:', error);
      },
    });
  }