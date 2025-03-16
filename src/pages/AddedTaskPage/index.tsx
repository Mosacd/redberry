import CustomSelect from "@/pages/AddedTaskPage/filter";
import TaskList from "./traskList";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";



const GeneralTaskPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const getArrayFromParams = (key: string): string[] => {
        const value = searchParams.get(key);
        return value ? value.split(",") : [];
    };

    const getStringFromParams = (key: string): string | null => {
        return searchParams.get(key);
    };

    const [appliedDepartments, setAppliedDepartments] = useState<string[]>(() => getArrayFromParams("departments"));
    const [appliedPriorities, setAppliedPriorities] = useState<string[]>(() => getArrayFromParams("priorities"));
    const [appliedEmployee, setAppliedEmployee] = useState<string | null>(() => getStringFromParams("employee"));


    useEffect(() => {
        setSearchParams({
            departments: appliedDepartments.join(","),
            priorities: appliedPriorities.join(","),
            employee: appliedEmployee || "",
        });
    }, [appliedDepartments, appliedPriorities, appliedEmployee, setSearchParams]);
    
    return (
        <>
        
        <div className='px-[118px]'>
        <h1 className='font-[FiraGO] leading-[100%] font-[600] text-[34px] mt-[40px] mb-[52px] tracking-[0] text-[#212529]'>დავალებების გვერდი</h1>
        <CustomSelect
        appliedDepartments={appliedDepartments} appliedPriorities={appliedPriorities} appliedEmployee={appliedEmployee}
        setAppliedDepartments ={setAppliedDepartments} setAppliedPriorities = {setAppliedPriorities} setAppliedEmployee = {setAppliedEmployee} />
         
        
        
        
        <TaskList appliedDepartments={appliedDepartments} appliedPriorities={appliedPriorities} appliedEmployee={appliedEmployee}/>
        
      
        
        </div>
    
        </>
      )
}

export default GeneralTaskPage;