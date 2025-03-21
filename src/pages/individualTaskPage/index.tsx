
import { usePutTaskStatus } from "@/reactQuery/mutation/tasks";
import { useGetStatuses } from "@/reactQuery/query/statuses";
import { useSingleGetTask } from "@/reactQuery/query/tasks";
import { useParams } from "react-router-dom";


import { usePostComment } from "@/reactQuery/mutation/comments";
import { FormEvent, useRef, useState } from "react";
import { useGetComments } from "@/reactQuery/query/comments";
import TaskOverview from "./taskOverview";
import TaskDetails from "./taskDetails";




const TaskPage = () => {

    const { id } = useParams();
   
    const taskId = Number(id);
    const commentRef = useRef<HTMLTextAreaElement | null>(null);
    const subCommentRef = useRef<HTMLTextAreaElement | null>(null);
    const [commentID, setCommentID] = useState<number | null>(null);
 
    const {data:task, isLoading} = useSingleGetTask({id:taskId});
    const {data:status} = useGetStatuses();
    const {data:comments = []} = useGetComments({taskId:taskId});
    const reversedComments = [...comments].reverse();

    
     const {mutate:putStatus } = usePutTaskStatus();
     const {mutate:postComment } = usePostComment();
 
    const numOfComments = () => {
      let amount = comments.length
      comments.forEach((comment) => amount += comment.sub_comments.length)
      return amount
    }

     const changeStatus = (id:number, statusId:number) => {
      putStatus({id, statusId})
     }

    
     const createComment = (e:FormEvent) => {
      e.preventDefault();
      postComment({taskId:taskId, parentId: null, text: commentRef.current?.value || ""})
      if (commentRef.current) {
        commentRef.current.value = "";
      }
     }

     const createSubComment = (e:FormEvent, parent_id:number) => {
      e.preventDefault();

      if (subCommentRef.current?.value.trim().length === 0) {
        console.log("Text is empty after trimming:", subCommentRef.current?.value);
        throw new Error("Text cannot be empty");
      }

      postComment({taskId:taskId, parentId: parent_id, text: subCommentRef.current?.value || ""})
      if (subCommentRef.current) {
        subCommentRef.current.value = "";
      }
      setCommentID(null);
     }

  

  

    if(isLoading){
      return
    }

    console.log(task?.total_comments)

    return(
        <div className='px-[121px] pr-[110px] mt-[40px]'>
          {task &&  
         <div className="flex w-full gap-[223px] justify-between">
          <div >
            <TaskOverview task = {task}/>

            <TaskDetails changeStatus = {changeStatus} status={status} task={task} taskId={taskId}/>
          
            </div>
            <div className="flex break-all overflow-hidden flex-col min-h-[975px] py-10 mt-[59px] mb-[59px] gap-[66px] bg-[#F8F3FEA6] border-transparent border-[0.3px] rounded-[10px] w-[741px] items-center"
            style={{ 
              boxShadow: '0 0 0 0.2px #ADB5BD'
            }}
            >
                 
            <form onSubmit={createComment} className="w-[651px] h-[135px] rounded-[10px] border-transparent bg-[#FFFFFF] pt-[18px] pb-[15px] px-[20px] border-[0.3px] flex flex-col justify-between max-h-[135px]"
            style={{ 
               boxShadow: '0 0 0 0.2px #ADB5BD'
            }}
            >
      <textarea
        ref={commentRef}
        placeholder="დაწერე კომენტარი"
        className="w-full border-none focus:outline-none resize-none py-[10px] h-full text-[#0D0F10]"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#8338EC] hover:bg-[#B588F4] h-[35px] text-white px-[20px] py-[8px] rounded-[20px] cursor-pointer"
          
        >
          დააკომენტარე
        </button>
      </div>
    </form>
    <div className="flex flex-col items-start w-[651px] gap-[40px]">
      <div className="flex gap-[7px] items-center "> {/* comment title */}
      <h1 className="text-[20px] font-[500]">კომენტარები</h1>
      <p className="p-[10px] rounded-[30px] h-[22px] w-[30px] justify-center text-center text-[14px] font-[500] items-center flex text-white bg-[#8338EC]">{numOfComments()}</p>
      </div> {/* comment title end*/}
      <div className="gap-[38px] flex flex-col">  {/* actual comments section div */}
        {reversedComments?.map((comment) => {
          return(
              <div key={comment.id}> {/* comments/subcomments div */}
                <div className="flex items-start gap-[12px] relative"> {/* comment div */}
                    <img src={comment.author_avatar} alt="" className="w-[38px] h-[38px] rounded-full"/>
                    
                    <div className="flex flex-col gap-[10px]">
                      <div className="flex flex-col gap-[8px]">
                      <p className="font-[500] text-[18px] h-[22px] text-[#212529]">{comment.author_nickname}</p>
                      <p className="font-[350] text-[16px] text-[#343A40]">{comment.text}</p>
                      </div>
                      <button onClick={() => {
                        if(comment.id == commentID){
                         return  setCommentID(null);
                        }
                       return setCommentID(comment.id)}} className="flex hover:cursor-pointer items-center gap-[6px] py-[6px] h-[26px]  group">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_9228_1684)">
    <path className="group-hover:fill-[#B588F4]" d="M16.0007 13.9993H14.6673V11.9993C14.6673 8.66602 12.0007 5.99935 8.66732 5.99935H5.33398V4.66602H8.66732C12.734 4.66602 16.0007 7.93268 16.0007 11.9993V13.9993Z" fill="#8338EC"/>
    <path className="group-hover:fill-[#B588F4]" d="M2 5.33333L5.33333 8.66667V2L2 5.33333Z" fill="#8338EC"/>
    </g>
    <defs>
    <clipPath id="clip0_9228_1684">
    <rect width="16" height="16" fill="white"/>
    </clipPath>
    </defs>
    </svg>

                        <span className="text-[12px] text-[#8338EC] group-hover:text-[#B588F4]">უპასუხე</span>
                      </button>
                     
                    </div>
                </div>
                {comment.id == commentID && <form onSubmit={(e) => createSubComment(e,comment.id)} className="h-[135px] w-[651px] mt-4 z-50 rounded-[10px] border-transparent bg-[#FFFFFF] pt-[18px] pb-[15px] px-[20px] border-[0.3px] flex flex-col justify-between max-h-[135px]"
            style={{ 
               boxShadow: '0 0 0 0.2px #ADB5BD',
             
            }}
            >
      <textarea
        ref={subCommentRef}
        placeholder="დაწერე კომენტარი"
        className="w-full border-none focus:outline-none resize-none py-[10px] h-full text-[14px] font-[400] font-[FiraGO] leading-[100%]"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#8338EC] h-[35px]  text-white px-[20px] py-[8px] rounded-[20px] cursor-pointer"
          
        >
          დააკომენტარე
        </button>
      </div>
    </form>
        }
                <div>
                {comment.sub_comments.slice().reverse().map((subcomment) => {
                  return(
                    <div key={subcomment.id} className={`ml-[53px] flex items-start gap-[12px] mt-[19px] mb-[19px]`}>
                      <img src={subcomment.author_avatar} alt={subcomment.author_nickname} className="w-[38px] h-[38px] rounded-full"/>
                      <div className="flex flex-col gap-[8px]">
                      <p className="font-[500] text-[18px] h-[22px] text-[#021526]">{subcomment.author_nickname}</p>
                      <p className="font-[400] text-[16px] text-[#343A40]">{subcomment.text}</p>
                      </div>
                    </div>
                  )
                })
                
                }
                

                
                </div>
             
          </div>
          )
        })}
          
      </div> {/* actual comments section end */}
    </div>
    </div>  
            </div>
           
           
}
        </div>
    )

}

export default TaskPage;