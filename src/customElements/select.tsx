// import Icon from '@/assets/Icon.svg'

import { useState } from "react";

// const options = [
//     "მართვის დეპარტამენტი",
//     "ფინანსის დეპარტამენტი",
//     "ლოჯისტიკის დეპარტამენტი",
//     "IT დეპარტამენტი",
//   ];
  
const CustomSelect = () => {
    const [selectedOption, setSelectedOption] =useState<"თანამშრომელი" | "პრიორიტეტი" | "დეპარტამენტი"| "none">();
    
  return (
    <>
      <button
        className=""
        onClick={() => { 
            setSelectedOption("დეპარტამენტი");
        }}
        onBlur={() => setSelectedOption('none')}
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
{/* {selectedOption == "დეპარტამენტი" &&  */}
<form className={`w-full pt-[40px] px-[30px] pb-[20px] absolute border-[0.5px] border-[#8338EC] top-[55px] rounded-[10px] h-[274px]`} onClick={(e) => {e.stopPropagation()}}>
  <div className="flex flex-col gap-[22px] items-start max-w-fit *:flex *:gap-[15px]">
    <div>
  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
  <label htmlFor="vehicle1"> I have a bike</label>
  </div>
  <div>
  <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
  <label htmlFor="vehicle2"> I have a car</label>
  </div>
  <div>
  <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
  <label htmlFor="vehicle3"> I have a boat</label>
  </div>
  <div>
  <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
  <label htmlFor="vehicle3"> I have a boat</label>
  </div>
  </div>
 <button></button>

   </form>
{/* } */}

      </button>

      <button
        className="flex gap-[8px] px-[18px] py-[10px] rounded-[10px]  cursor-pointer 
        items-center"
        onClick={() => {
            setSelectedOption("პრიორიტეტი");
        }}
        onBlur={() => setSelectedOption('none')}
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
        onClick={() => {
            setSelectedOption("თანამშრომელი");
        }}
        onBlur={() => setSelectedOption('none')}
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
