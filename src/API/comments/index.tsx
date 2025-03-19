import { httpClient, personalToken } from "..";

export const postComment = async (data: {taskId:number, parentId: number | null, text:string}): Promise<void> => {
    // if (data.text.trim().length === 0) {
    //     console.log("Text is empty after trimming:", data.text);
    //     throw new Error("Text cannot be empty");
    //   }
   
    await httpClient.post(`/tasks/${data.taskId}/comments`,
    { 
        text: data.text,
        parent_id:data.parentId
  },
    {
      headers: {
        Authorization: `Bearer ${personalToken}`,
      }
    }).catch((error) => {
      console.error("Error Posting Comment:", error);
      throw error;
  });
}


export const getComments= async (taskId: number) : Promise<Comment[]>=> {
    return httpClient.get(`/tasks/${taskId}/comments`, {
        headers: {
          Authorization: `Bearer ${personalToken}`,
        },
      }).then((res) => res.data)
    .catch((error) => {
      console.error("Error Fetching Employees:", error);
      throw error;
    });
}

export type Comment = {
    id: number,
    text: string,
    task_id: number,
    parent_id: number | null,
    author_avatar: string,
    author_nickname: string
    sub_comments: Comment[]
 
}