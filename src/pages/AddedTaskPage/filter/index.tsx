// import Icon from '@/assets/Icon.svg'

import { Checkbox } from "@/components/ui/checkbox";
import { useGetDepartments } from "@/reactQuery/query/departments";
import { useGetEmployees } from "@/reactQuery/query/employees";
import { useGetPriorities } from "@/reactQuery/query/priorities";
import { Dispatch, SetStateAction, useState } from "react";

type options =  "თანამშრომელი" | "პრიორიტეტი" | "დეპარტამენტი" | "none"
  
const CustomSelect:React.FC<{setAppliedDepartments: Dispatch<SetStateAction<string[]>>;
  setAppliedPriorities: Dispatch<SetStateAction<string[]>>,
  setAppliedEmployee: React.Dispatch<React.SetStateAction<string | null>>,
  }>
 = ({setAppliedDepartments,setAppliedPriorities,setAppliedEmployee}
 ) => {

    const [selectedOption, setSelectedOption] =useState<options>('none');
        const{data:departments = [], } =   useGetDepartments();
        const{data:employees = [], } = useGetEmployees();
        const{data:priorities = [], } = useGetPriorities();
        const colorsDepartment = ["#FF66A8", "#FD9A6A", "#FFD86D", "#89B6FF", "#5FAA5B", "#D288C5", "#A3A65D"];

        const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
        const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
        const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);


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


       const handleButtonClick = (option: options) => (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop the event from bubbling up
        
        // Toggle the dropdown - close if already open, open if closed
        if (selectedOption === option) {
          setSelectedOption('none');
        } else {
          setSelectedOption(option);
          
          // Set up a one-time click handler on the document
          setTimeout(() => {
            const closeDropdown = () => {
              setSelectedOption('none');
              document.removeEventListener('click', closeDropdown);
            };
            document.addEventListener('click', closeDropdown);
          }, 0);
        }
      };
      
  return (
    <>
      <button
        onClick={handleButtonClick("დეპარტამენტი")} >
        <div className="flex gap-[8px] px-[18px] py-[10px] rounded-[10px]
        items-center cursor-pointer">
        <span className={` ${selectedOption == "დეპარტამენტი" ? "text-[#8338EC]" : ""}`}>დეპარტამენტი</span>
        <svg
      className={` text-gray-600 transition-transform duration-200 ${
        selectedOption == "დეპარტამენტი"  ? "rotate-180 fill-[#8338EC]" : "fill-[#0D0F10]"
      }`}
      width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L12 13.5858L6.70711 8.29289Z" fill=""/>
</svg>
</div>
      </button>
      
      <button
        className="flex gap-[8px] px-[18px] py-[10px] rounded-[10px]  cursor-pointer 
        items-center"
        onClick={handleButtonClick("პრიორიტეტი")}
      >
        <span className={` ${selectedOption == "პრიორიტეტი" ? "text-[#8338EC]" : ""}`}>პრიორიტეტი</span>
        <svg
      className={` text-gray-600 transition-transform duration-200 ${
        selectedOption == "პრიორიტეტი" ? "rotate-180 fill-[#8338EC]" : "fill-[#0D0F10]"
      }`}
      width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L12 13.5858L6.70711 8.29289Z" fill=""/>
</svg>
      </button>

      <button
        className="flex gap-[8px] px-[18px] py-[10px] rounded-[10px]  cursor-pointer 
        items-center"
        onClick={handleButtonClick("თანამშრომელი")}>
        <span className={` ${selectedOption == "თანამშრომელი" ? "text-[#8338EC]" : ""}`}>თანამშრომელი</span>
        <svg
      className={` text-gray-600 transition-transform duration-200 ${
        selectedOption == "თანამშრომელი" ? "rotate-180 fill-[#8338EC]" : "fill-[#0D0F10]"
      }`}
      width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L12 13.5858L6.70711 8.29289Z" fill=""/>
</svg>
      </button>

    
      {selectedOption != "none" && 
<form className={`flex flex-col w-full pt-[40px] px-[30px] pb-[20px] absolute border-[0.5px] border-[#8338EC] top-[55px] rounded-[10px] max-h-[275px] gap-[25px] bg-[#FFFF]`} onClick={(e) => e.stopPropagation()}>
    
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
 
      </>
  );
};

export default CustomSelect;
