import { httpClient } from ".."
import { personalToken } from "..";
import { Departament } from "../departments";
import { Employee } from "../employees";
import { Priority } from "../priorities";
import { Status } from "../statuses";

export const getTasks = async () : Promise<Task[]>=> {
    return httpClient.get("/tasks", {
        headers: {
          Authorization: `Bearer ${personalToken}`,
        },
      }).then((res) => { 
        console.log(res.data)
        return res.data})
    .catch((error) => {
      console.error("Error Fetching Tasks:", error);
      throw error;
    });
}


export const getSingleTask = async (id:number) : Promise<Task>=> {
  return httpClient.get(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${personalToken}`,
      },
    }).then((res) => { 
      console.log(res.data)
      return res.data})
  .catch((error) => {
    console.error("Error Fetching Tasks:", error);
    throw error;
  });
}

export const putTaskStatus = async (data: {id:number, statusId:number}): Promise<void> => {
   await httpClient.put(`/tasks/${data.id}`,
    { 
      status_id: data.statusId
  },
    {
      headers: {
        Authorization: `Bearer ${personalToken}`,
      }
    }).catch((error) => {
      console.error("Error Updating Task Status:", error);
      throw error;
  });
}

export const postTask = async (data: {name:string, description:string, due_date:string, status_id:number, employee_id:number, priority_id:number}): Promise<void> => {
  await httpClient.post(`/tasks`,
   { 
     name: data.name,
     description: data.description,
     due_date: data.due_date,
     status_id: data.status_id,
     employee_id: data.employee_id,
     priority_id: data.priority_id
 },
   {
     headers: {
       Authorization: `Bearer ${personalToken}`,
     }
   }).catch((error) => {
     console.error("Error Updating Task Status:", error);
     throw error;
 });
}






export type Task = {
    id: number,
    name: string,
    description: string,
    due_date: string,
    department: Departament,
    employee: Employee,
    status: Status,
    priority:Priority,
    total_comments:number
  }

