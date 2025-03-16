import CustomSelect from "@/pages/AddedTaskPage/filter";
import logo from '@/assets/Frame 1000006027.svg'
import add from '@/assets/add.svg'
import TaskList from "./traskList";
import { useState } from "react";



const GeneralTaskPage = () => {

    const [appliedDepartments, setAppliedDepartments] = useState<string[]>([]);
    const [appliedPriorities, setAppliedPriorities] = useState<string[]>([]);
    const [appliedEmployee, setAppliedEmployee] = useState<string | null>(null);
   

    return (
        <>
      
         <div className='flex w-full justify-between px-[120px] py-[30px]'>
          <img src={logo} alt="" />
          <div className='flex gap-[40px]'>
            <button className='py-[10px] px-[20px] border-[#8338EC] border-[1px] rounded-[5px]
             transition duration-200
             font-[FiraGO] text-[#212529] cursor-pointer hover:border-[#B588F4]'>თანამშრომლის შექმნა</button>
            <button className='py-[10px] px-[20px] bg-[#8338EC] rounded-[5px]
             leading-[100%] transition duration-200
              text-[#FFFFFF] cursor-pointer hover:bg-[#B588F4]'><div className='flex gap-[4px]
               items-center'><img src={add} alt="" className='w-[20px] h-[20px]' /> შექმენი ახალი დავალება</div></button>
          </div>
         </div>
        
        <div className='px-[118px]'>
        <h1 className='font-[FiraGO] leading-[100%] font-[600] text-[34px] mt-[40px] mb-[52px] tracking-[0] text-[#212529]'>დავალებების გვერდი</h1>
        <div className='px-[2px] flex max-w-fit gap-[45px] border-[1px] border-[#DEE2E6] rounded-[10px] relative'>
        <CustomSelect
        setAppliedDepartments ={setAppliedDepartments} setAppliedPriorities = {setAppliedPriorities} setAppliedEmployee = {setAppliedEmployee} />
           </div>
        <div>
            {[...appliedDepartments,...appliedPriorities, ...(appliedEmployee ? [appliedEmployee] : [])].map((tag) => {
                return(
                    <div className="flex gap-[4px] px-[10px] py-[6px] bg-[#FFFFF] border-[1px] border-[#CED4DA] rounded-[43px] w-fit">
                        <span>{tag}</span>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 4L3.5 11" stroke="#343A40" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.5 4L10.5 11" stroke="#343A40" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                         </div>
                 )
            })}
        </div>
        <div className='w-[1680px] flex justify-center gap-[52px] mt-[79px]'>
        
        <TaskList appliedDepartments={appliedDepartments} appliedPriorities={appliedPriorities} appliedEmployee={appliedEmployee}/>
        
        </div>
        
        </div>
    
        </>
      )
}

export default GeneralTaskPage;