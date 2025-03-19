import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";
import { useGetDepartments } from "@/reactQuery/query/departments";
import { useGetEmployees } from "@/reactQuery/query/employees";
import { useGetPriorities } from "@/reactQuery/query/priorities";
import { useGetStatuses } from "@/reactQuery/query/statuses";

const CreateTaskPage = () => {

        const{data:departments = [], isLoading:isLoadingDep } =   useGetDepartments();
        const{data:employees = [], isLoading:isLodingEmp } =   useGetEmployees();
        const{data:priorities = [], isLoading:isLodingPri} =   useGetPriorities();
        const{data:statuses = [], isLoading:isLodingSta} =   useGetStatuses();

if(isLoadingDep || isLodingEmp || isLodingPri || isLodingSta){
  return 
}

    return(
        <div className='px-[118px] mt-[40px]'>
            <h1 className="h-[41px] flex items-center font-[600] text-[34px] text-[#212529] leading-[100%]">შექმენი ახალი დავალება</h1>
            <div className="mt-[25px] border-[0.3px] w-full bg-[#FBF9FFA6] rounded-[4px] pl-[55px] pt-[65px] border-[#DDD2FF]">
                <form action="">
                  <div className="flex flex-col gap-[61px]">
                    <div className="flex gap-[161px]"> {/*first section*/}
                  <div className="flex flex-col"> {/*title field Start*/}
                    <label className="py-[6px] flex text-[16px] text-[#343A40]" htmlFor="title">
                    სათაური <svg className="w-[8px] h-[8px]" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.31997 7.03996H3.67997C3.59185 7.03996 3.51997 6.96871 3.51997 6.87996V4.83559L1.7431 5.85121C1.66747 5.89496 1.5706 5.86871 1.52622 5.79309L1.20622 5.24934C1.18435 5.21246 1.1781 5.16871 1.18935 5.12746C1.19997 5.08621 1.22685 5.05121 1.26372 5.02996L3.0406 3.99996L1.26372 2.97059C1.22685 2.94934 1.19997 2.91371 1.18935 2.87246C1.1781 2.83121 1.18435 2.78746 1.2056 2.75059L1.5256 2.20684C1.56997 2.13121 1.66747 2.10559 1.7431 2.14934L3.51997 3.16434V1.11996C3.51997 1.03184 3.59185 0.959961 3.67997 0.959961H4.31997C4.40872 0.959961 4.47997 1.03184 4.47997 1.11996V3.16434L6.25685 2.14934C6.33247 2.10559 6.42935 2.13121 6.47372 2.20684L6.79372 2.75059C6.8156 2.78746 6.82185 2.83121 6.8106 2.87246C6.79997 2.91371 6.7731 2.94934 6.73622 2.97059L4.95935 3.99996L6.73622 5.02934C6.77247 5.05121 6.79935 5.08621 6.8106 5.12746C6.82122 5.16871 6.8156 5.21246 6.79372 5.24934L6.47372 5.79309C6.42935 5.86871 6.33247 5.89496 6.25685 5.85059L4.47997 4.83559V6.87996C4.47997 6.96871 4.40872 7.03996 4.31997 7.03996Z" fill="#343A40"/>
</svg>
                    </label> 
                    <input className="text-[14px] font-[300] focus:outline-none text-[#0D0F10] rounded-[5px] w-[550px] h-[45px] border-[1px] p-[14px] bg-[#FFFFFF] border-[#DEE2E6]" id="title" type="text" placeholder="სათაური" />
                 <div className="mt-[4px] flex flex-col gap-[2px] px-[1px]">
                 <span className="flex items-center font-[350] text-[10px] text-[#6C757D] h-[12px]">მინიმუმ 2 სიმბოლო</span>
                 <span className="flex items-center font-[350] text-[10px] text-[#6C757D] h-[12px]">მაქსიმუმ 255 სიმბოლო</span>
                 </div>
                 </div> {/*title field End*/}
                 <div className="flex flex-col"> {/*department field Start*/}
                    <label className="py-[6px] flex text-[16px] text-[#343A40]" htmlFor="title">
                    დეპარტამენტი <svg className="w-[8px] h-[8px]" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.31997 7.03996H3.67997C3.59185 7.03996 3.51997 6.96871 3.51997 6.87996V4.83559L1.7431 5.85121C1.66747 5.89496 1.5706 5.86871 1.52622 5.79309L1.20622 5.24934C1.18435 5.21246 1.1781 5.16871 1.18935 5.12746C1.19997 5.08621 1.22685 5.05121 1.26372 5.02996L3.0406 3.99996L1.26372 2.97059C1.22685 2.94934 1.19997 2.91371 1.18935 2.87246C1.1781 2.83121 1.18435 2.78746 1.2056 2.75059L1.5256 2.20684C1.56997 2.13121 1.66747 2.10559 1.7431 2.14934L3.51997 3.16434V1.11996C3.51997 1.03184 3.59185 0.959961 3.67997 0.959961H4.31997C4.40872 0.959961 4.47997 1.03184 4.47997 1.11996V3.16434L6.25685 2.14934C6.33247 2.10559 6.42935 2.13121 6.47372 2.20684L6.79372 2.75059C6.8156 2.78746 6.82185 2.83121 6.8106 2.87246C6.79997 2.91371 6.7731 2.94934 6.73622 2.97059L4.95935 3.99996L6.73622 5.02934C6.77247 5.05121 6.79935 5.08621 6.8106 5.12746C6.82122 5.16871 6.8156 5.21246 6.79372 5.24934L6.47372 5.79309C6.42935 5.86871 6.33247 5.89496 6.25685 5.85059L4.47997 4.83559V6.87996C4.47997 6.96871 4.40872 7.03996 4.31997 7.03996Z" fill="#343A40"/>
</svg>
</label> 
                    {/* onValueChange={(value) => changeStatus(taskId, Number(value))} */}
                    <Select  defaultValue={departments[0].id.toString()}>
                  <SelectTrigger  className="font-[300] w-[550px] h-[45px] rounded-[5px] border-[1px] p-[14px] gap-[6px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="font-[300] w-[550px]">
                    {departments?.map((department) => <SelectItem value={department.id.toString()}>
                     <span className="font-[300] text-[14px] text-[#0D0F10]">
                      {department.name}
                      </span>
                      </SelectItem>)}
                    
                  </SelectContent>
                </Select>
                
                 </div> {/*department field End*/}
                 
                 </div>{/*first End*/}


                 <div className="flex gap-[161px]"> {/*Second section start*/}
                 <div className="flex flex-col w-[550px] h-[196px]"> {/*description field Start*/}
                    <label className="py-[6px] flex text-[16px] text-[#343A40]" htmlFor="title">
                    აღწერა
                    </label> 
                    <textarea
          className="w-[550px] h-[133px] rounded-[5px] border-[1px] border-[#DEE2E6] focus:outline-none resize-none p-[14px] text-[14px] font-[300] leading-[150%] bg-[#FFFFFF]"
      />
      <div className="mt-[4px] flex flex-col gap-[2px] px-[1px]">
                 <span className="flex items-center font-[350] text-[10px] text-[#6C757D] h-[12px]">მინიმუმ 2 სიმბოლო</span>
                 <span className="flex items-center font-[350] text-[10px] text-[#6C757D] h-[12px]">მაქსიმუმ 255 სიმბოლო</span>
                 </div>
                    </div>{/*description field End*/}
                    <div className="flex flex-col"> {/*Employee field Start*/}
                    <label className="py-[6px] flex text-[16px] text-[#343A40]" htmlFor="title">
                    პასუხისმგებელი თანამშრომელი <svg className="w-[8px] h-[8px]" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.31997 7.03996H3.67997C3.59185 7.03996 3.51997 6.96871 3.51997 6.87996V4.83559L1.7431 5.85121C1.66747 5.89496 1.5706 5.86871 1.52622 5.79309L1.20622 5.24934C1.18435 5.21246 1.1781 5.16871 1.18935 5.12746C1.19997 5.08621 1.22685 5.05121 1.26372 5.02996L3.0406 3.99996L1.26372 2.97059C1.22685 2.94934 1.19997 2.91371 1.18935 2.87246C1.1781 2.83121 1.18435 2.78746 1.2056 2.75059L1.5256 2.20684C1.56997 2.13121 1.66747 2.10559 1.7431 2.14934L3.51997 3.16434V1.11996C3.51997 1.03184 3.59185 0.959961 3.67997 0.959961H4.31997C4.40872 0.959961 4.47997 1.03184 4.47997 1.11996V3.16434L6.25685 2.14934C6.33247 2.10559 6.42935 2.13121 6.47372 2.20684L6.79372 2.75059C6.8156 2.78746 6.82185 2.83121 6.8106 2.87246C6.79997 2.91371 6.7731 2.94934 6.73622 2.97059L4.95935 3.99996L6.73622 5.02934C6.77247 5.05121 6.79935 5.08621 6.8106 5.12746C6.82122 5.16871 6.8156 5.21246 6.79372 5.24934L6.47372 5.79309C6.42935 5.86871 6.33247 5.89496 6.25685 5.85059L4.47997 4.83559V6.87996C4.47997 6.96871 4.40872 7.03996 4.31997 7.03996Z" fill="#343A40"/>
</svg>
</label> 
                    {/* onValueChange={(value) => changeStatus(taskId, Number(value))} */}
                    <Select  defaultValue={employees[0].id.toString()}>
                  <SelectTrigger  className="font-[300] w-[550px] h-[45px] rounded-[5px] border-[1px] p-[14px] gap-[6px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="font-[300] w-[550px]">
                    {employees?.map((employee) => <SelectItem className="font-[300]" value={employee.id.toString()}>
                   <div className="flex items-center gap-[10px]">
                      <img className="w-[30px] h-[30px]" src={employee.avatar} alt="" />
                      <span className="text-[#0D0F10] font-[300] text-[14px]">{employee.name}</span>
                      </div>
                      </SelectItem>)}
                    
                  </SelectContent>
                </Select>
                
                 </div> {/*Employee field End*/}
                 </div> {/*Second section End*/}

                 <div  className="flex gap-[161px]"> {/*Third section Start*/}
                 <div className="flex w-[550px] gap-[32px] h-[77px]"> {/*description field Start*/}
                  <div className="flex flex-col">
                    <label className="py-[6px] flex text-[16px] text-[#343A40]" htmlFor="title">
                    პრიორიტეტი*
                    </label> 
                    <Select  defaultValue={priorities[0].id.toString()}>
                  <SelectTrigger  className="font-[300] w-[259px] h-[45px] rounded-[5px] border-[1px] p-[14px] gap-[6px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="font-[300]">
                    {priorities?.map((priority) => <SelectItem className="font-[300]" value={priority.id.toString()}>
                   <div className="flex items-center gap-[6px]">
                      <img className="w-[16px] h-[18px]" src={priority.icon} alt="" />
                      <span className="text-[#0D0F10] font-[300] text-[14px]">{priority.name}</span>
                      </div>
                      </SelectItem>)}
                    
                  </SelectContent>
                </Select>
                    </div>
                    <div className="flex flex-col">
                    <label className="py-[6px] flex text-[16px] text-[#343A40]" htmlFor="title">
                    სტატუსი*
                    </label> 
                    <Select  defaultValue={statuses[0].id.toString()}>
                  <SelectTrigger  className="font-[300] w-[259px] h-[45px] rounded-[5px] border-[1px] p-[14px] gap-[6px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="font-[300]">
                    {statuses?.map((status) => <SelectItem className="font-[300]" value={status.id.toString()}>
                   
                      <span className="text-[#0D0F10] font-[300] text-[14px]">{status.name}</span>
                      
                      </SelectItem>)}
                    
                  </SelectContent>
                </Select>
                    </div>
                  </div>
                 </div> {/*Third section End*/}

                 </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTaskPage;