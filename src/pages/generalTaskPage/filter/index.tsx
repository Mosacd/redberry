// import Icon from '@/assets/Icon.svg'

import { Checkbox } from "@/components/ui/checkbox";
import { useGetDepartments } from "@/reactQuery/query/departments";
import { useGetEmployees } from "@/reactQuery/query/employees";
import { useGetPriorities } from "@/reactQuery/query/priorities";
import { Dispatch, SetStateAction, useState } from "react";

type Options =  "თანამშრომელი" | "პრიორიტეტი" | "დეპარტამენტი" | null
  
const CustomSelect:React.FC<{setAppliedDepartments: Dispatch<SetStateAction<string[]>>;
  setAppliedPriorities: Dispatch<SetStateAction<string[]>>,
  setAppliedEmployee: React.Dispatch<React.SetStateAction<string | null>>,
  appliedDepartments:string[], appliedPriorities: string[]; appliedEmployee: string | null; 
  }>
 = ({setAppliedDepartments,setAppliedPriorities,setAppliedEmployee,appliedDepartments,appliedPriorities,appliedEmployee}
 ) => {
console.log("mawoni")
    const [selectedOption, setSelectedOption] =useState<Options>(null);
        const{data:departments = [], } =   useGetDepartments();
        const{data:employees = [], } = useGetEmployees();
        const{data:priorities = [], } = useGetPriorities();
        const colorsDepartment = ["#FF66A8", "#FD9A6A", "#FFD86D", "#89B6FF", "#5FAA5B", "#D288C5", "#A3A65D"];

        const [selectedDepartments, setSelectedDepartments] = useState<string[]>(appliedDepartments);
        const [selectedPriorities, setSelectedPriorities] = useState<string[]>(appliedPriorities);
        const [selectedEmployee, setSelectedEmployee] = useState<string | null>(appliedEmployee);
       
        const handleTagClick = (tag: string) => {
          if (appliedDepartments.includes(tag)) {
            setSelectedDepartments(prev => prev.filter(dep => dep !== tag));
            setAppliedDepartments(prev => prev.filter(dep => dep !== tag));
             // Remove from departments
          } else if (appliedPriorities.includes(tag)) {
            setSelectedPriorities(prev => prev.filter(pri => pri !== tag));
            setAppliedPriorities(prev => prev.filter(pri => pri !== tag)); // Remove from priorities
          } else if (appliedEmployee === tag.split(" ")[0]) {
            setSelectedEmployee(null);
            setAppliedEmployee(null); // Remove employee
          }
        };

        const handleAllTagClick = () =>{
          setSelectedDepartments([]);
          setSelectedPriorities([]);
          setSelectedEmployee(null);
          setAppliedDepartments([]);
          setAppliedPriorities([]);
          setAppliedEmployee(null);
        }

        const applyFilters = () => {
          setAppliedDepartments(selectedDepartments);
          setAppliedPriorities(selectedPriorities);
          setAppliedEmployee(selectedEmployee);
        };

        const handleDepartmentChange = (department: string) => {
          setSelectedDepartments((prev) =>
              prev.includes(department)
                  ? prev.filter((dep) => dep !== department) 
                  : [...prev, department]
          );
      };
      
      const handlePriorityChange = (priority: string) => {
          setSelectedPriorities((prev) =>
              prev.includes(priority)
                  ? prev.filter((pri) => pri !== priority)
                  : [...prev, priority]
          );
      };
  
      const handleEmployeeChange = (employee: string) => {
          setSelectedEmployee(employee === selectedEmployee ? null : employee);
      };


       const handleButtonClick = (option: Options) => (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop the event from bubbling up
        
        // Toggle the dropdown - close if already open, open if closed
        if (selectedOption === option) {
          setSelectedOption(null);
        } else {
          setSelectedOption(option);
          
          // Set up a one-time click handler on the document
          setTimeout(() => {
            const closeDropdown = () => {
              setSelectedOption(null);
              document.removeEventListener('click', closeDropdown);
            };
            document.addEventListener('click', closeDropdown);
          }, 0);
        }
      };

      const options:Options[] = ["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"];

  return (
    <div className='px-[2px] flex w-full justify-between  max-w-[688px] gap-[45px] border-[1px] border-[#DEE2E6] rounded-[10px] relative'>
      {options.map((option) => (
      <button key={option} onClick={handleButtonClick(option)}>
        <div className="flex gap-[8px] px-[18px] py-[10px] rounded-[10px] items-center cursor-pointer">
          <span className={selectedOption === option ? "text-[#8338EC]" : ""}>
            {option}
          </span>
          <svg
            className={`text-gray-600 transition-transform duration-200 ${
              selectedOption === option
                ? "rotate-180 fill-[#8338EC]"
                : "fill-[#0D0F10]"
            }`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L12 13.5858L6.70711 8.29289Z"
              fill=""
            />
          </svg>
        </div>
      </button>
    ))}

    
      {selectedOption != null && 
<form className={`flex flex-col z-50 w-full pt-[40px] px-[30px] pb-[20px] absolute border-[0.5px] border-[#8338EC] top-[55px] rounded-[10px] max-h-[275px] gap-[25px] bg-[#FFFF]`} onClick={(e) => e.stopPropagation()}>
    
<div className="flex flex-col gap-[22px] items-start max-w-fit *:flex *:gap-[15px] overflow-auto *:items-center **:cursor-pointer"  style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#8338EC #ffffff",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          paddingRight: "16px",
        }}>
    {selectedOption == "დეპარტამენტი" && departments.map((department) =>{
        return(
<label
        htmlFor={department.name}
      >
    <Checkbox id={department.name} 
    checkmarkColor = {colorsDepartment[department.id]} 
    style={{borderColor : colorsDepartment[department.id]}}
    checked={selectedDepartments.includes(department.name)}
            onCheckedChange={() => handleDepartmentChange(department.name)}
            />
       {department.name}
      </label>
  
        )
    })}

{selectedOption == "პრიორიტეტი" && priorities.map((priority) =>{
        return(    
<label
        htmlFor={priority.name}
        key={priority.id}
      >
    <Checkbox id={priority.name} 
    checked={selectedPriorities.includes(priority.name)}
    onCheckedChange={() => handlePriorityChange(priority.name)}
    />
       {priority.name}
      </label>
        )
    })}

{selectedOption == "თანამშრომელი" && employees.map((employee) =>{
        return(
<label
        htmlFor={employee.name}
        className="flex gap-[10px]"
        key={employee.id}
      >
    <Checkbox id={employee.name}
   checked={selectedEmployee === employee.name}
   onCheckedChange={() => handleEmployeeChange(employee.name)}
    />
       <img src={employee.avatar} alt="" className="w-[28px] h-[28px] rounded-full"/>
       <p>{employee.name} {employee.surname}</p>
      </label>
        )
    })}
      </div>
  <div className="w-full flex justify-end">
 <button onClick={(e) =>{e.preventDefault();
applyFilters();
 }} className="py-[9px] px-[20px] bg-[#8338EC] hover:bg-[#B588F4] transition duration-200 rounded-[20px] text-[#FFFFFF] w-[155px] cursor-pointer" >არჩევა</button>
 </div>
   </form>
}


<div className="flex mt-[69px] gap-[8px] absolute w-[1680px] *:cursor-pointer">
            {[...appliedDepartments,...appliedPriorities, ...(appliedEmployee ? [appliedEmployee + ` ${employees.find(employee => employee.name === appliedEmployee)?.surname}`] : [])].map((tag) => {
                return(
                    <button className="flex h-[29px] gap-[4px] px-[10px] py-[6px]  border-[1px] bg-[#FFFFFF] border-[#CED4DA] rounded-[43px]"
                    onClick={() => handleTagClick(tag)}
                    >
                        <span className={`text-[14px] text-[#343A40] text-center
                        ${appliedDepartments.length > 3 && appliedDepartments.includes(tag) ? 'max-w-[100px] truncate' : ''}
                        `}>{tag}</span>
                        <svg className="" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 4L3.5 11" stroke="#343A40" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.5 4L10.5 11" stroke="#343A40" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                         </button>
                 )
            })}
        { (appliedDepartments.length > 0 || appliedPriorities.length > 0 || appliedEmployee != null && appliedEmployee != "" ) && <button onClick={handleAllTagClick} className="text-[14px] text-center text-[#343A40] px-[10px] py-[6px] rounded-[43px] bg-[#FFFFFF]">გასუფთავება</button>}
        </div>
      </div>
  );
};

export default CustomSelect;
