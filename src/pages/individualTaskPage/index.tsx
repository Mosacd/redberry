import { useSingleGetTask } from "@/reactQuery/query/tasks";
import { useParams } from "react-router-dom";



const TaskPage = () => {

    const { id } = useParams();
   
    const taskId = Number(id);

    
    const {data:task} = useSingleGetTask({id:taskId});

    const colorsPriority = ['#08A508','#FFBE0B','#FA4D4D'];
    const colorsDepartment = ["#FF66A8", "#FD9A6A", "#FFD86D", "#89B6FF", "#5FAA5B", "#D288C5", "#A3A65D"];

    return(
        <div className='px-[121px]'>
          {task &&  
          <>
          <div className="flex flex-col gap-[26px] max-w-[715px]">
          <div className="flex flex-col gap-[12px]">
          <div className="flex  items-center gap-[18px]">
                <div className="flex w-[106px] px-[5px] py-[4px] gap-[4px] border-[0.5px] rounded-[3px] bg-[#FFFFFF] text-[16px] leaing-[150%] font-[600]"
                style={{
                    borderColor: colorsPriority[task?.priority.id-1],
                    color: colorsPriority[task?.priority.id-1],
                  }}
                ><img src={task?.priority.icon} alt="" className="w-[18px] h-[20px]"/> {task?.priority.name}</div>
               <div className="text-[#FFFFFF] px-[10px] py-[5px] rounded-[15px] h-[29px]"  style={{
                    backgroundColor: colorsDepartment[task?.department.id-1],
                  }}
                  >{task?.department.name}</div>
            </div>
            <h1 className="flex items-center font-[600] text-[34px] text-[#212529] w-fit h-[41px]">{task?.name}</h1>
            </div>
            <p className="text-[18px] leading-[150%] text-[#000000] w-fit">{task?.description}</p>
            </div>

            <div className="flex felx-col gap-[18px] mt-[63px]">
                <div className="py-[10px] h-[49px] flex items-center"><h1 className="font-[600] text-[24px] text-[#2A2A2A]">დავალების დეტალები</h1></div>
                <div>

                </div>
            </div>
            </>
}
        </div>
    )

}

export default TaskPage;