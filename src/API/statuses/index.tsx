import { httpClient } from ".."

export const getStatuses = async () : Promise<Status[]>=> {
    return httpClient.get("/statuses").then((res) => res.data)
    .catch((error) => {
      console.error("Error Fetching Statuses:", error);
      throw error;
    });
}

export type Status = {
    id: number,
    name: string
  }