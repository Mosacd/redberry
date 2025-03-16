// import Icon from '@/assets/Icon.svg'

import { Checkbox } from "@/components/ui/checkbox";
import { useGetDepartments } from "@/reactQuery/query/departments";
import { useState } from "react";

type options =  "თანამშრომელი" | "პრიორიტეტი" | "დეპარტამენტი" | "none"
  
const CustomSelect = () => {


    const [selectedOption, setSelectedOption] =useState<options>();
        const{data:departments = [], isLoading} =   useGetDepartments();
  
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
        
        onClick={handleButtonClick("დეპარტამენტი")}
    
      >
        <div className="flex gap-[8px] px-[18px] py-[10px] rounded-[10px]
        items-center cursor-pointer">
        <span className={` ${selectedOption == "დეპარტამენტი" ? "text-[#8338EC]" : ""}`}>დედპარტამენტი</span>
        <svg
      className={` text-gray-600 transition-transform duration-200 ${
        selectedOption == "დეპარტამენტი"  ? "rotate-180 fill-[#8338EC]" : "fill-[#0D0F10]"
      }`}
      width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L12 13.5858L6.70711 8.29289Z" fill=""/>
</svg>
</div>

      </button>
      {selectedOption == "დეპარტამენტი" && 
<form className={`flex flex-col w-full pt-[40px] px-[30px] pb-[20px] absolute border-[0.5px] border-[#8338EC] top-[55px] rounded-[10px] max-h-[275px] gap-[25px] bg-[#FFFF]`} onClick={(e) => e.stopPropagation()}>
    
<div className="flex flex-col gap-[22px] items-start max-w-fit *:flex *:gap-[15px] overflow-auto *:items-center **:cursor-pointer"  style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#8338EC #ffffff",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          paddingRight: "16px",
        }}>
    {departments.map((department) =>{
        return(
            
<label
        htmlFor={department.name}
      >
    <Checkbox id={department.name} checkmarkColor="stroke-[#000000]" className="border-[#000000]" />
    
       {department.name}
      </label>
  
        )
    })}
      </div>
    
  <div className="w-full flex justify-end">
 <button className="py-[9px] px-[20px] bg-[#8338EC]  rounded-[20px] text-[#FFFFFF] w-[155px] cursor-pointer" onClick={(e) =>{e.preventDefault()}}>არჩევა</button>
 </div>
   </form>
}

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
        onClick={handleButtonClick("თანამშრომელი")}
       
      >
        <span className={` ${selectedOption == "თანამშრომელი" ? "text-[#8338EC]" : ""}`}>თანამშრომელი</span>
        <svg
      className={` text-gray-600 transition-transform duration-200 ${
        selectedOption == "თანამშრომელი" ? "rotate-180 fill-[#8338EC]" : "fill-[#0D0F10]"
      }`}
      width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L12 13.5858L6.70711 8.29289Z" fill=""/>
</svg>
      </button>
   
 
      </>
  );
};

export default CustomSelect;
