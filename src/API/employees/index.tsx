import { httpClient } from ".."
import { personalToken } from "..";

export const getEmployees = async () : Promise<Employee[]>=> {
    return httpClient.get("/employees", {
        headers: {
          Authorization: `Bearer ${personalToken}`,
        },
      }).then((res) => res.data)
    .catch((error) => {
      console.error("Error Fetching Employees:", error);
      throw error;
    });
}

export type Employee = {
    id: number,
    name: string,
    surname: string,
    avatar: string,
    department_id: number,
  }

