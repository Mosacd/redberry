import { httpClient } from ".."

export const getPriorities = async () : Promise<Priority[]>=> {
    return httpClient.get("/priorities").then((res) => res.data)
    .catch((error) => {
      console.error("Error Fetching Priorities:", error);
      throw error;
    });
}

export type Priority = {
    id: number,
    name: string,
    icon: string,
  }