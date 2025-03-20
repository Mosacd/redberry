import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";
import { useGetDepartments } from "@/reactQuery/query/departments";
import { useGetEmployees } from "@/reactQuery/query/employees";
import { useGetPriorities } from "@/reactQuery/query/priorities";
import { useGetStatuses } from "@/reactQuery/query/statuses";

import { FormEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ka} from "date-fns/locale/ka";

import "./datepicker.css";
import { usePostTask } from "@/reactQuery/mutation/tasks";
import dayjs from "dayjs";

const CreateTaskPage = () => {


        const{data:departments = [], isLoading:isLoadingDep } =   useGetDepartments();
        const{data:employees = [], isLoading:isLodingEmp } =   useGetEmployees();
        const{data:priorities = [], isLoading:isLodingPri} =   useGetPriorities();
        const{data:statuses = [], isLoading:isLodingSta} =   useGetStatuses();
        const{ mutate:postTask } = usePostTask();

        const [title, setTitle] = useState<string>("");
        const [departmentId, setDepartmentId] = useState<number | null>(null);
        const [description, setDescription] = useState<string>("");
        const [employeeId, setEmployeeId] = useState<number | null>(null);
        const [priorityId, setPriorityId] = useState<number | null>(null);
        const [statusId, setStatusId] = useState<number | null>(null);
        const [deadline, setDeadline] = useState<Date | null>(null);
        const [titleTouched, setTitleTouched] = useState(false);
        const [descriptionTouched, setDescriptionTouched] = useState(false);
      
       const formattedDate = (due_at:string) => {
           return  dayjs(due_at)
             .locale("ka")
             .format("YYYY-MM-DD");
           }
          

        
        useEffect(() => {
          if (priorities.length > 0 && priorityId === null) {
              setPriorityId(priorities[1].id);
          }
      }, [priorities, priorityId]);
  
      useEffect(() => {
          if (statuses.length > 0 && statusId === null) {
              setStatusId(statuses[0].id);
          }
      }, [statuses, statusId]);


      const handleForm = (e:FormEvent) => {
          e.preventDefault()

            
          
          if(title.length < 2 || title.length > 255 || description.length < 2 || description.length > 255 ||
            employeeId == null || priorityId == null || statusId == null || deadline == null || departmentId == null ||
            deadline < new Date()
           ) {
            
            console.log("wrong")
            return
          }   

          console.log(title)
            console.log(description)
            console.log(employeeId)
            console.log(priorityId)
            console.log( statusId)
            console.log(formattedDate(deadline?.toString()))
            console.log(departmentId)
            console.log(deadline < new Date())
         
          

           return postTask( { name:title, description:description, due_date:formattedDate(deadline?.toString()), status_id:statusId, employee_id:employeeId, priority_id:priorityId})

      } 


      if(isLoadingDep || isLodingEmp || isLodingPri || isLodingSta){
        return
      }

    return(
        <div className='px-[118px] my-[40px]'>
            <h1 className="h-[41px] flex items-center font-[600] text-[34px] text-[#212529] leading-[100%]">შექმენი ახალი დავალება</h1>
            <div className="mt-[25px] border-[0.3px] w-full bg-[#FBF9FFA6] rounded-[4px] pl-[55px] py-[65px] border-[#DDD2FF]">
                <form onSubmit={handleForm}>
                  <div className="flex flex-col gap-[61px] w-[1261px]">
                    <div className="flex gap-[161px]"> {/*first section*/}
                  <div className="flex flex-col"> {/*title field Start*/}
                    <label className="py-[6px] flex text-[16px] text-[#343A40]" htmlFor="title">
                    სათაური <svg className="w-[8px] h-[8px]" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.31997 7.03996H3.67997C3.59185 7.03996 3.51997 6.96871 3.51997 6.87996V4.83559L1.7431 5.85121C1.66747 5.89496 1.5706 5.86871 1.52622 5.79309L1.20622 5.24934C1.18435 5.21246 1.1781 5.16871 1.18935 5.12746C1.19997 5.08621 1.22685 5.05121 1.26372 5.02996L3.0406 3.99996L1.26372 2.97059C1.22685 2.94934 1.19997 2.91371 1.18935 2.87246C1.1781 2.83121 1.18435 2.78746 1.2056 2.75059L1.5256 2.20684C1.56997 2.13121 1.66747 2.10559 1.7431 2.14934L3.51997 3.16434V1.11996C3.51997 1.03184 3.59185 0.959961 3.67997 0.959961H4.31997C4.40872 0.959961 4.47997 1.03184 4.47997 1.11996V3.16434L6.25685 2.14934C6.33247 2.10559 6.42935 2.13121 6.47372 2.20684L6.79372 2.75059C6.8156 2.78746 6.82185 2.83121 6.8106 2.87246C6.79997 2.91371 6.7731 2.94934 6.73622 2.97059L4.95935 3.99996L6.73622 5.02934C6.77247 5.05121 6.79935 5.08621 6.8106 5.12746C6.82122 5.16871 6.8156 5.21246 6.79372 5.24934L6.47372 5.79309C6.42935 5.86871 6.33247 5.89496 6.25685 5.85059L4.47997 4.83559V6.87996C4.47997 6.96871 4.40872 7.03996 4.31997 7.03996Z" fill="#343A40"/>
</svg>
                    </label> 

                    <input 
                    onBlur={() => setTitleTouched(true)}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required className={`text-[14px] font-[300] focus:outline-none text-[#0D0F10] rounded-[5px]
                     w-[550px] h-[45px] border-[1px] p-[14px] bg-[#FFFFFF] border-[#DEE2E6] id="title" 
                     type="text" placeholder="სათაური ${
                      (title.length > 0 || titleTouched) && (    (!(title.length >= 2) || !(title.length <= 255))
            ? "border-[#FA4D4D]" : "border-[#DEE2E6]")
              
          }
                     
                     `} />

                 <div className="mt-[4px] flex flex-col gap-[2px] px-[1px]">
                 <span className={`flex items-center font-[350] text-[10px] text-[#6C757D] h-[12px]
                 ${
                  (title.length > 0 || titleTouched) &&  (!(title.length >= 2)
                    ? "text-red-500" : "text-[#08A508]")
                }
                 `}>მინიმუმ 2 სიმბოლო</span>
                 <span className={`flex items-center font-[350] text-[10px] text-[#6C757D] h-[12px]
                 ${
                  (title.length > 0 || titleTouched) && ( !(title.length <= 255) 
                    ? "text-red-500" : "text-[#08A508]")
                }
                 `}>მაქსიმუმ 255 სიმბოლო</span>
                 </div>
                 </div> {/*title field End*/}
                 <div className="flex flex-col"> {/*department field Start*/}
                    <label className="py-[6px] flex text-[16px] text-[#343A40]" htmlFor="title">
                    დეპარტამენტი <svg className="w-[8px] h-[8px]" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.31997 7.03996H3.67997C3.59185 7.03996 3.51997 6.96871 3.51997 6.87996V4.83559L1.7431 5.85121C1.66747 5.89496 1.5706 5.86871 1.52622 5.79309L1.20622 5.24934C1.18435 5.21246 1.1781 5.16871 1.18935 5.12746C1.19997 5.08621 1.22685 5.05121 1.26372 5.02996L3.0406 3.99996L1.26372 2.97059C1.22685 2.94934 1.19997 2.91371 1.18935 2.87246C1.1781 2.83121 1.18435 2.78746 1.2056 2.75059L1.5256 2.20684C1.56997 2.13121 1.66747 2.10559 1.7431 2.14934L3.51997 3.16434V1.11996C3.51997 1.03184 3.59185 0.959961 3.67997 0.959961H4.31997C4.40872 0.959961 4.47997 1.03184 4.47997 1.11996V3.16434L6.25685 2.14934C6.33247 2.10559 6.42935 2.13121 6.47372 2.20684L6.79372 2.75059C6.8156 2.78746 6.82185 2.83121 6.8106 2.87246C6.79997 2.91371 6.7731 2.94934 6.73622 2.97059L4.95935 3.99996L6.73622 5.02934C6.77247 5.05121 6.79935 5.08621 6.8106 5.12746C6.82122 5.16871 6.8156 5.21246 6.79372 5.24934L6.47372 5.79309C6.42935 5.86871 6.33247 5.89496 6.25685 5.85059L4.47997 4.83559V6.87996C4.47997 6.96871 4.40872 7.03996 4.31997 7.03996Z" fill="#343A40"/>
</svg>
</label> 
                    {/* onValueChange={(value) => changeStatus(taskId, Number(value))} */}
                    <Select 
                    value={departmentId?.toString()}
                    onValueChange={(value) => setDepartmentId(Number(value))}
                     required>
                  <SelectTrigger   className="w-[550px] h-[45px] rounded-[5px] border-[1px] p-[14px] gap-[6px]">
                    <SelectValue  placeholder = {<span className="font-[300] text-[#0D0F10] text-[14px]">აირჩიე დეპარტამენტი</span>}></ SelectValue>
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
                    onBlur={() => setDescriptionTouched(true)}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
          className={`w-[550px] h-[133px] rounded-[5px] border-[1px] border-[#DEE2E6] focus:outline-none resize-none p-[14px] text-[14px] font-[300] leading-[150%] bg-[#FFFFFF]
            ${
              (description.length > 0 || descriptionTouched) && (  (!(description.length >= 2) || !(description.length <= 255))
              ? "border-[#FA4D4D]" : "border-[#DEE2E6]" )
                
            }
            `}
      />
      <div className="mt-[4px] flex flex-col gap-[2px] px-[1px]">
                 <span className={`flex items-center font-[350] text-[10px] text-[#6C757D] h-[12px]
                  ${
                    (description.length > 0 || descriptionTouched)  &&  (  !(description.length >= 2)
                      ? "text-red-500" : "text-[#08A508]" )
                      
                  }
                  `}>მინიმუმ 2 სიმბოლო</span>
                 <span className={`flex items-center font-[350] text-[10px] text-[#6C757D] h-[12px]
                  ${
                    (description.length > 0 || descriptionTouched) && ( !(description.length <= 255)
                      ? "text-red-500" : "text-[#08A508]" )
                      
                  }
                  `}>მაქსიმუმ 255 სიმბოლო</span>
                 </div>
                    </div>{/*description field End*/}
                    <div className="flex flex-col"> {/*Employee field Start*/}
                    <label className="py-[6px] flex text-[16px] text-[#343A40]" htmlFor="title">
                    პასუხისმგებელი თანამშრომელი <svg className="w-[8px] h-[8px]" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.31997 7.03996H3.67997C3.59185 7.03996 3.51997 6.96871 3.51997 6.87996V4.83559L1.7431 5.85121C1.66747 5.89496 1.5706 5.86871 1.52622 5.79309L1.20622 5.24934C1.18435 5.21246 1.1781 5.16871 1.18935 5.12746C1.19997 5.08621 1.22685 5.05121 1.26372 5.02996L3.0406 3.99996L1.26372 2.97059C1.22685 2.94934 1.19997 2.91371 1.18935 2.87246C1.1781 2.83121 1.18435 2.78746 1.2056 2.75059L1.5256 2.20684C1.56997 2.13121 1.66747 2.10559 1.7431 2.14934L3.51997 3.16434V1.11996C3.51997 1.03184 3.59185 0.959961 3.67997 0.959961H4.31997C4.40872 0.959961 4.47997 1.03184 4.47997 1.11996V3.16434L6.25685 2.14934C6.33247 2.10559 6.42935 2.13121 6.47372 2.20684L6.79372 2.75059C6.8156 2.78746 6.82185 2.83121 6.8106 2.87246C6.79997 2.91371 6.7731 2.94934 6.73622 2.97059L4.95935 3.99996L6.73622 5.02934C6.77247 5.05121 6.79935 5.08621 6.8106 5.12746C6.82122 5.16871 6.8156 5.21246 6.79372 5.24934L6.47372 5.79309C6.42935 5.86871 6.33247 5.89496 6.25685 5.85059L4.47997 4.83559V6.87996C4.47997 6.96871 4.40872 7.03996 4.31997 7.03996Z" fill="#343A40"/>
</svg>
</label> 
                    {/* onValueChange={(value) => changeStatus(taskId, Number(value))} */}
                    <Select 
                    disabled={departmentId == null}
                    value={employeeId?.toString()}
                    onValueChange={(value) => setEmployeeId(Number(value))}
                    required
                    >
                  <SelectTrigger  className="font-[300] w-[550px] h-[45px] rounded-[5px] border-[1px] p-[14px] gap-[6px]">
                    <SelectValue placeholder={<span className="font-[300] text-[#0D0F10] text-[14px]">აირჩიე თანამშრომელი</span>} />
                
                    
                  </SelectTrigger>
                  <SelectContent className="font-[300] w-[550px]">
                    <button className="relative hover:cursor-pointer leading-[100%] hover:bg-[#F8F9FA] font-[400] flex justify-start w-full items-center h-[48px] p-[14px] pl-[11px]">
                  <div className="flex items-center gap-[10px]">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.75" y="0.75" width="16.5" height="16.5" rx="8.25" stroke="#8338EC" stroke-width="1.5"/>
                  <path d="M9.576 8.456H13.176V9.656H9.576V13.304H8.256V9.656H4.656V8.456H8.256V4.808H9.576V8.456Z" fill="#8338EC"/>
                  </svg>
                  
                    <span className="font-[400] text-[16px] text-[#8338EC]">
                      დაამატე თანამშრომელი</span>
                      </div>
                      </button>
                    {employees.filter((employee) => employee.department.id == departmentId )?.map((employee) => <SelectItem className="font-[300] hover:bg-[#F8F9FA]" value={employee.id.toString()}>
                   <div className="flex items-center gap-[10px]">
                      <img className="w-[30px] h-[30px]" src={employee.avatar} alt="" />
                      <span className="text-[#0D0F10] font-[300] text-[14px]">{employee.name} {employee.surname}</span>
                      </div>
                      </SelectItem>)}
                    
                  </SelectContent>
                </Select>
                
                 </div> {/*Employee field End*/}
                 </div> {/*Second section End*/}

                 <div  className="flex gap-[161px]"> {/*Third section Start*/}
                 <div className="flex w-[550px] gap-[32px] h-[77px]"> 
                  <div className="flex flex-col"> {/*priority field Start*/}
                    <label className="py-[6px] flex text-[16px] text-[#343A40]" htmlFor="title">
                    პრიორიტეტი*
                    </label> 
                    <Select
                     value={priorityId?.toString() || priorities[1].id.toString()}
                    onValueChange={(value) => setPriorityId(Number(value))}
                    required  >
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
                    </div> {/*priority field End*/}
                    <div className="flex flex-col"> {/*status field start*/}
                    <label className="py-[6px] flex text-[16px] text-[#343A40]" htmlFor="title">
                    სტატუსი*
                    </label> 
                    <Select 
                    value={statusId?.toString() || statuses[0].id.toString()}
                    onValueChange={(value) => setStatusId(Number(value))}
                    required >
                  <SelectTrigger  className="font-[300] w-[259px] h-[45px] rounded-[5px] border-[1px] p-[14px] gap-[6px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="font-[300]">
                    {statuses?.map((status) => <SelectItem className="font-[300]" value={status.id.toString()}>
                   
                      <span className="text-[#0D0F10] font-[300] text-[14px]">{status.name}</span>
                      
                      </SelectItem>)}
                    
                  </SelectContent>
                </Select>
                    </div> {/*status field End*/}
                  </div>
                  <div className="flex flex-col"> {/*status field start*/}
                    <label className="py-[6px] flex text-[16px] text-[#343A40]" htmlFor="title">
                    დედლაინი
                    </label> 
             <div className="group">     
        <div className="flex  w-[318px] items-center rounded-[5px] border-[1px] h-[45px] gap-[6px] p-[14px] group-focus-within:border-[#8338EC] bg-[#FFFFFF] border-[#DEE2E6]">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.00065 0.167969V1.5013H9.00065V0.167969H10.334V1.5013H13.0007C13.3689 1.5013 13.6673 1.79978 13.6673 2.16797V12.8346C13.6673 13.2028 13.3689 13.5013 13.0007 13.5013H1.00065C0.632464 13.5013 0.333984 13.2028 0.333984 12.8346V2.16797C0.333984 1.79978 0.632464 1.5013 1.00065 1.5013H3.66732V0.167969H5.00065ZM12.334 6.83463H1.66732V12.168H12.334V6.83463ZM3.66732 2.83464H1.66732V5.5013H12.334V2.83464H10.334V4.16797H9.00065V2.83464H5.00065V4.16797H3.66732V2.83464Z" fill="#4D596A"/>
</svg>


        <DatePicker 
          required
          selected={deadline}
          onChange={(date) =>  setDeadline(date)}
          dateFormat="dd.MM.yyyy"
          placeholderText="DD/MM/YYY"
          className={`relative group outline-none w-full text-[14px] font-[300], leading-[20px], leading-[-1.25%] text-[#0D0F10]
            ${deadline !== null && deadline < new Date() ? 'border-[#FA4D4D]': 'border-[#08A508]' }
            `}
      
          locale={ka}
        />
        
        
      </div>
      </div>  
      </div>
                  
                 </div> {/*Third section End*/}
                 </div>
                 
<div className="flex mt-[147px] justify-end  w-[1261px]">
      <button type="submit" className="rounded-[5px] w-[208px] h-[42px] px-[20px] py-[10px] bg-[#8338EC] text-[white] cursor-pointer text-[18px] hover:bg-[#B588F4]">დავალების შექმნა</button>
</div>
                </form>
            </div>
        </div>
    )
}

export default CreateTaskPage;