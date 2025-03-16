import { httpClient } from ".."

export const getDepartments = async () : Promise<Departament[]>=> {
    return httpClient.get("/departments").then((res) => res.data)
    .catch((error) => {
      console.error("Error Fetching Departments:", error);
      throw error;
    });
}

export type Departament = {
    id: number,
    name: string
  }