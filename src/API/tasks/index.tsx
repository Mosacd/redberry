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

