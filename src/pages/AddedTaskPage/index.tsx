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
              text-[#212529] cursor-pointer hover:border-[#B588F4]'>თანამშრომლის შექმნა</button>
            <button className='py-[10px] px-[20px] bg-[#8338EC] rounded-[5px]
             leading-[100%] transition duration-200
               cursor-pointer hover:bg-[#B588F4]'><div className='flex gap-[4px]
               items-center text-[#FFFFFF]'><img src={add} alt="" className='w-[20px] h-[20px]' /> შექმენი ახალი დავალება</div></button>
          </div>
         </div>
        
        <div className='px-[118px]'>
        <h1 className='font-[FiraGO] leading-[100%] font-[600] text-[34px] mt-[40px] mb-[52px] tracking-[0] text-[#212529]'>დავალებების გვერდი</h1>
        <CustomSelect
        appliedDepartments={appliedDepartments} appliedPriorities={appliedPriorities} appliedEmployee={appliedEmployee}
        setAppliedDepartments ={setAppliedDepartments} setAppliedPriorities = {setAppliedPriorities} setAppliedEmployee = {setAppliedEmployee} />
         
        
        <div className='w-[1680px] flex justify-center gap-[52px] mt-[79px]'>
        
        <TaskList appliedDepartments={appliedDepartments} appliedPriorities={appliedPriorities} appliedEmployee={appliedEmployee}/>
        
        </div>
        
        </div>
    
        </>
      )
}

export default GeneralTaskPage;