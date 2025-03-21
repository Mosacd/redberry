import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePutTaskStatus } from "@/reactQuery/mutation/tasks";
import { useGetStatuses } from "@/reactQuery/query/statuses";
import { useSingleGetTask } from "@/reactQuery/query/tasks";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/ka";
import { usePostComment } from "@/reactQuery/mutation/comments";
import { FormEvent, useRef, useState } from "react";
import { useGetComments } from "@/reactQuery/query/comments";

const formattedDate = (due_at:string) => {
    return  dayjs(due_at)
      .locale("ka")
      .format("ddd - D/M/YYYY"); 
    }


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

  

    const colorsPriority = ['#08A508','#FFBE0B','#FA4D4D'];
    const colorsDepartment = ["#FF66A8", "#FD9A6A", "#FFD86D", "#89B6FF", "#5FAA5B", "#D288C5", "#A3A65D"];

    if(isLoading){
      return
    }

    console.log(task?.total_comments)

    return(
        <div className='px-[121px] pr-[110px] mt-[40px]'>
          {task &&  
          <div className="flex w-full gap-[223px] justify-between">
          <div >
          <div className="flex flex-col gap-[26px] w-full max-w-[715px]">
          <div className="flex flex-col gap-[12px] h-[105px] justify-center">
          <div className="flex  items-center gap-[18px]">
                <div className="flex items-center w-[106px] px-[5px] py-[4px] gap-[4px] border-[0.5px] rounded-[3px] bg-[#FFFFFF] text-[16px] leaing-[150%] font-[500]"
                style={{
                    borderColor: colorsPriority[task?.priority.id-1],
                    color: colorsPriority[task?.priority.id-1],
                  }}
                ><img src={task?.priority.icon} alt="" className="w-[18px] h-[20px]"/> {task?.priority.name}</div>
               <div className="text-[#FFFFFF] flex items-center px-[10px] py-[5px] rounded-[15px] h-[29px]"  style={{
                    backgroundColor: colorsDepartment[task?.department.id-1],
                  }}
                  >{task?.department.name}</div>
            </div>
            <h1 className="flex items-center font-[600] text-[34px] text-[#212529] w-fit h-[41px]">{task?.name}</h1>
            </div>
            <p className="text-[18px] leading-[150%] text-[#000000] w-fit">მიზანია რომ შეიქმნას თანამედროვე, სუფთა და ფუნქციონალური დიზაინი, რომელიც უზრუნველყოფს მარტივ ნავიგაციას და მკაფიო ინფორმაციის გადაცემას. დიზაინი უნდა იყოს ადაპტირებადი (responsive), გამორჩეული ვიზუალით, მინიმალისტური სტილით და ნათელი ტიპოგრაფიით.</p>
            </div>

            <div className="flex flex-col gap-[18px] w-fit mt-[63px] h-[277px]">
                <div className="py-[10px] h-[49px] flex items-center"><h1 className="font-[600] text-[24px] text-[#2A2A2A]">დავალების დეტალები</h1></div>
                <div className="flex flex-col h-[210px] *:flex *:items-center *:gap-[70px] *:py-[12px] *:border-b-[1px] *:border-b-white *:h-[70px]">
                  <div className="py-[10px] ">
                  <div className="flex items-center gap-[6px] w-[164px]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.2104 15.8901C20.5742 17.3946 19.5792 18.7203 18.3123 19.7514C17.0454 20.7825 15.5452 21.4875 13.9428 21.8049C12.3405 22.1222 10.6848 22.0422 9.12055 21.5719C7.55627 21.1015 6.13103 20.2551 4.96942 19.1067C3.80782 17.9583 2.94522 16.5428 2.45704 14.984C1.96886 13.4252 1.86996 11.7706 2.169 10.1647C2.46804 8.55886 3.1559 7.05071 4.17245 5.77211C5.189 4.49351 6.50329 3.4834 8.0004 2.83008" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V12H22Z" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<p className="leading-[150%] text-[#474747]">სტატუსი</p>
                  </div>
                  {/* <select className="w-[259px] h-[45px] rounded-[5px]
                  border-[1px] p-[14px] gap-[6px] bg-[#FFFFFF] border-[#8338EC]
                  " name="" id=""></select> */}

                <Select  defaultValue={task.status.id.toString()}  onValueChange={(value) => changeStatus(taskId, Number(value))}>
                  <SelectTrigger  className="w-[259px] h-[45px] rounded-[5px] border-[1px] p-[14px] gap-[6px]">
                    <SelectValue placeholder="სტატუსი" />
                  </SelectTrigger>
                  <SelectContent>
                    {status?.map((status) => <SelectItem value={status.id.toString()}>
                    <span className="font-[300] text-[14px] text-[#0D0F10]">
                      {status.name}
                      </span>
                      </SelectItem>)}
                    
                  </SelectContent>
                </Select>
                
                  </div>
                  <div className="py-[12px]">
                  <div className="flex items-center gap-[6px] w-[164px]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 12C13.2091 12 15 10.2091 15 8C15 5.79086 13.2091 4 11 4C8.79086 4 7 5.79086 7 8C7 10.2091 8.79086 12 11 12Z" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 22V20C19 18.9391 18.5786 17.9217 17.8284 17.1716C17.0783 16.4214 16.0609 16 15 16H7C5.93913 16 4.92172 16.4214 4.17157 17.1716C3.42143 17.9217 3 18.9391 3 20V22" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<p className="leading-[150%] text-[#474747]">თანამშრომელი</p>
                    </div>
                    <div className="h-[41px] flex items-end relative">
                     <div className="flex gap-[12px] h-[32px] items-center">
                      <img src={task.employee.avatar} alt="" className="w-[32px] h-[32px]"/>
                      <div className="relative">
                      <p className="absolute left-0 top-[-14px] text-[11px] font-[300] text-[#474747] text-nowrap">{task.employee.department.name}</p>
                      <p className="text-[14px] leading-[150%] text-[#0D0F10]">{task.employee.name} {task.employee.surname}</p>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-[8px]">
<div className="flex items-center gap-[6px] w-[164px]">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 2V6" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 2V6" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 10H21" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<p className="leading-[150%] text-[#474747]">დავალების ვადა</p>
                    </div>
                    <p className="text-[14px] leading-[150%] text-[#0D0F10]">{formattedDate(task.due_date)}</p>
                  </div>
                </div>
            </div>
          
            </div>
            <div className="flex flex-col min-h-[975px] py-10 mt-[59px] mb-[59px] gap-[66px] bg-[#F8F3FEA6] border-transparent border-[0.3px] rounded-[10px] w-[741px] items-center"
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
                       return setCommentID(comment.id)}} className="flex hover:cursor-pointer items-center gap-[6px] py-[6px] h-[26px] w-[67px] group">
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
              //  position: 'absolute',
              //  top: '200%',
              //  left: '50%',
              //  transform: 'translate(-50%, -50%)',
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