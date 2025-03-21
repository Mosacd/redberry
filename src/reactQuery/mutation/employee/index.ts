import { postEmployee } from "@/API/employees";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export const usePostEmployee = () => {

    const queryClient = useQueryClient(); 
    
    return useMutation<
      void,
      Error,
      FormData
    >({
      mutationKey: ['employeePost'],
      mutationFn: postEmployee,
      onSuccess: () => {  
        
        console.log('employee added successfully!');
          queryClient.invalidateQueries({
            queryKey: ['employees'],
            exact: true,
          });
      },
      onError: (error: Error) => {
        console.error('Error Adding Employee:', error);
      },
    });
  }