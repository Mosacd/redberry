import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

            <div className="flex flex-col gap-[18px] mt-[63px] h-[277px]">
                <div className="py-[10px] h-[49px] flex items-center"><h1 className="font-[600] text-[24px] text-[#2A2A2A]">დავალების დეტალები</h1></div>
                <div className="flex flex-col h-[210px] *:flex *:items-center *:gap-[70px] *:py-[12px] *:border-b-[1px]">
                  <div className="py-[10px]">
                  <div className="flex items-center gap-[6px]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.2104 15.8901C20.5742 17.3946 19.5792 18.7203 18.3123 19.7514C17.0454 20.7825 15.5452 21.4875 13.9428 21.8049C12.3405 22.1222 10.6848 22.0422 9.12055 21.5719C7.55627 21.1015 6.13103 20.2551 4.96942 19.1067C3.80782 17.9583 2.94522 16.5428 2.45704 14.984C1.96886 13.4252 1.86996 11.7706 2.169 10.1647C2.46804 8.55886 3.1559 7.05071 4.17245 5.77211C5.189 4.49351 6.50329 3.4834 8.0004 2.83008" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V12H22Z" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<p className="leading-[150%] text-[#474747]">სტატუსი</p>
                  </div>
                  <select className="w-[259px] h-[45px] rounded-[5px]
                  border-[1px] p-[14px] gap-[6px] bg-[#FFFFFF] border-[#8338EC]
                  " name="" id=""></select>

                <Select >
                  <SelectTrigger className="w-[259px] h-[45px] rounded-[5px] border-[1px] p-[14px] gap-[6px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                
                  </div>
                  <div className="py-[12px]">

                  </div>
                  <div className="py-[8px]">

                  </div>
                </div>
            </div>
            </>
}
        </div>
    )

}

export default TaskPage;