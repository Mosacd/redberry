import { Task } from "@/API/tasks";


const TaskOverview:React.FC <{task:Task}> = ({task}) => {

    const colorsPriority = ['#08A508','#FFBE0B','#FA4D4D'];
    const colorsDepartment = ["#FF66A8", "#FD9A6A", "#FFD86D", "#89B6FF", "#5FAA5B", "#D288C5", "#A3A65D"];

    return(
        <div className="flex flex-col gap-[26px] w-full max-w-[715px] break-all overflow-hidden">
            <div className="flex flex-col gap-[12px] h-[105px] justify-center">
            <div className="flex  items-center gap-[18px]">
                    <div className="flex items-center  px-[5px] py-[4px] gap-[4px] border-[0.5px] rounded-[3px] bg-[#FFFFFF] text-[16px] leaing-[150%] font-[500]"
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
                <p className="text-[18px] leading-[150%] text-[#000000] w-fit ">{task?.description}</p>
                </div>
    )
}


export default TaskOverview;