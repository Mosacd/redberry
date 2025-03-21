import pitureLogo from "@/assets/Frame 1000005790.svg"

import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "../ui/select"

import { useGetDepartments } from "@/reactQuery/query/departments"
import { FormEvent, useEffect, useRef, useState } from "react"

import { usePostEmployee } from "@/reactQuery/mutation/employee";

const CreateEmployeeFrom:React.FC <{setEmpFormOpen:React.Dispatch<React.SetStateAction<boolean>>}> = ({setEmpFormOpen}) => {




  
 const{data:departments = [], isLoading:isLoadingDep } =   useGetDepartments();
    const { mutate :postEmp } = usePostEmployee();

        const [name, setName] = useState<string>(localStorage.getItem("name") || "");
        const [surname, setSurname] = useState<string>(
         localStorage.getItem("surname") || ""
        );

        const [avatar, setAvatar] = useState<string>(localStorage.getItem("avatar") || "");
        const [avatarFile, setAvatarFile] = useState<File | null>(null);
        
        const [EmpDepartmentId, setEmpDepartmentId] = useState<number | null>(
          localStorage.getItem("EmpDepartmentId") ? Number(localStorage.getItem("EmpDepartmentId")) : null
        );

        const [nameTouched, setNameTouched] = useState(false);
        const [surnameTouched, setSurnameTouched] = useState(false);
      

        const fileInputRef = useRef<HTMLInputElement>(null);

        const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0];
          
          if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setAvatar(reader.result as string);
            reader.readAsDataURL(file);
          }
        };
        
        const handleClick = () => {
          fileInputRef.current?.click();
        };
        
              useEffect(() => {
                localStorage.setItem("name", name);
                localStorage.setItem("EmpDepartmentId", EmpDepartmentId?.toString() || "");
                localStorage.setItem("surname", surname);
                localStorage.setItem("avatar", avatar || "");
              }, [name, EmpDepartmentId, surname, avatar]);

              useEffect(() => {
                  if(avatar != ""){
                    if (fileInputRef.current) {
                      fileInputRef.current.disabled = true;
                    }
                  } else {
                    if (fileInputRef.current) {
                      fileInputRef.current.disabled = false;
                    }
                  }

              },[avatar])


              function isValidName(value:string) {
                const regex = /^[a-zA-Z\u10A0-\u10FF]+$/; // Only Latin and Georgian letters
                console.log("regex :" + regex.test(value))
                return regex.test(value);
              }

              
               const handleForm = (e:FormEvent) => {
                        e.preventDefault()

                        if (!avatarFile) {
                          console.log("No file selected");
                          return;
                        }
                    
                        
                        if(name.length < 2 || name.length > 255 || 
                          surname.length < 2 || surname.length > 255 || 
                          !isValidName(name) || !isValidName(surname) || 
                          avatar.trim() === "" || 
                          EmpDepartmentId == null
                         
                         ) {
                          
                          console.log("wrong")
                          return
                        }   
              
                        console.log(name)
                          console.log(surname)
                          console.log(avatar)
                          console.log(EmpDepartmentId)
                          
                          const formData = new FormData();
                          formData.append("name", name);
                          formData.append("surname", surname);
                          formData.append("avatar", avatarFile);
                          formData.append("department_id", String(EmpDepartmentId));
                  
                         return postEmp( formData,
                         {
                          onSuccess: () => {
                            // Reset state
                            setName("");
                            setSurname("");
                            setAvatar("");
                            setEmpDepartmentId(null);
                          }
                        }
                         )

                        } 

                        const handleBackdropClick = (e: React.MouseEvent) => {
                         
                          if (e.target === e.currentTarget) {
                            handleClose()
                          }
                        };

                     const  handleClose = () => {
                      localStorage.setItem("name", "");
                      localStorage.setItem("EmpDepartmentId", "");
                      localStorage.setItem("surname", "");
                      localStorage.setItem("avatar", "");
                          setEmpFormOpen(false);
                        }

  if(isLoadingDep){
    return
  }

    return (
        <div  onClick={handleBackdropClick} className="fixed inset-0 z-50 bg-black/15 backdrop-blur-xs">
          <div className="m-auto flex flex-col gap-[37px] pt-[40px] pr-[50px] pb-[60px] pl-[50px] h-[766px] bg-[#FFFFFF] w-[913px] mt-[118px] rounded-[10px] shadow-lg">
            {/* Close Button */}
            <button onClick={handleClose} className="w-[40px] h-[40px] hover:cursor-pointer self-end">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 0C8.955 0 0 8.955 0 20C0 31.045 8.955 40 20 40C31.045 40 40 31.045 40 20C40 8.955 31.045 0 20 0ZM22.3567 20C22.3567 20 27.5883 25.2317 27.845 25.4883C28.4967 26.14 28.4967 27.195 27.845 27.845C27.1933 28.4967 26.1383 28.4967 25.4883 27.845C25.2317 27.59 20 22.3567 20 22.3567C20 22.3567 14.7683 27.5883 14.5117 27.845C13.86 28.4967 12.805 28.4967 12.155 27.845C11.5033 27.1933 11.5033 26.1383 12.155 25.4883C12.41 25.2317 17.6433 20 17.6433 20C17.6433 20 12.4117 14.7683 12.155 14.5117C11.5033 13.86 11.5033 12.805 12.155 12.155C12.8067 11.5033 13.8617 11.5033 14.5117 12.155C14.7683 12.41 20 17.6433 20 17.6433C20 17.6433 25.2317 12.4117 25.4883 12.155C26.14 11.5033 27.195 11.5033 27.845 12.155C28.4967 12.8067 28.4967 13.8617 27.845 14.5117C27.59 14.7683 22.3567 20 22.3567 20Z" fill="#DEE2E6"/>
</svg>
            </button>

    <div className="w-[813px]">
        
            <h1 className="text-center text-[32px] font-[500] mb-[45px]">თანამშრომლის დამატება</h1>
    
           
            <form onSubmit={handleForm} className="flex flex-col gap-[45px]">
            
              <div className="flex w-full justify-between gap-[45px]">
                <div>
                  <label className="block text-[#343A40] text-[14px] font-[500] h-[17px]">სახელი*</label>
                  <input
                    required
                    type="text"
                    onBlur={() => setNameTouched(true)}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className={`w-[384px] h-[42px] border-[1px] border-[#CED4DA] text-[#0D0F10] p-[10px] rounded-[6px] text-[14px] font-[300] bg-[#FFFFFF] outline-none
                        ${
                        (name.length > 0 || nameTouched) && (    (!(name.length >= 3) || !(name.length <= 255))
              ? "border-[#FA4D4D]" : "border-[#DEE2E6]")
            }
                      `}
                  />
                  <div className="mt-[6px] flex flex-col gap-[2px] px-[1px]">
                 <span className={`flex items-center font-[350] text-[10px] text-[#6C757D] h-[16px]
                ${
                (name.length > 0 || nameTouched) &&  (!(name.length >= 3)
                  ? "text-red-500" : "text-[#08A508]")
              }
                 `}>მინიმუმ 3 სიმბოლო</span>
                 <span className={`flex items-center font-[350] text-[10px] text-[#6C757D] h-[16px]
                 ${ (name.length > 0 || nameTouched) && ( !(name.length <= 255) 
                    ? "text-red-500" : "text-[#08A508]")
                }
                 `}>მაქსიმუმ 255 სიმბოლო</span>
                 </div>
                </div>
                <div>
                  <label className="block text-[#343A40] text-[14px] font-[500] h-[17px]">გვარი*</label>
                  <input
                   required
                    onChange={(e) => setSurname(e.target.value)}
                    type="text"
                    onBlur={() => setSurnameTouched(true)}
                    value={surname}
                    className={`w-[384px] h-[42px] border-[1px] border-[#CED4DA] text-[#0D0F10] p-[10px] rounded-[6px] text-[14px] font-[300] bg-[#FFFFFF] outline-none
                      ${
                        (surname.length > 0 || surnameTouched) && (    (!(surname.length >= 3) || !(surname.length <= 255))
              ? "border-[#FA4D4D]" : "border-[#DEE2E6]")
                
            }
                    `}
                  />
                  <div className="mt-[6px] flex flex-col gap-[2px] px-[1px]">
                 <span className={`flex items-center font-[350] text-[10px] text-[#6C757D] h-[16px]
               ${
                (surname.length > 0 || surnameTouched) &&  (!(surname.length >= 3)
                  ? "text-red-500" : "text-[#08A508]")
              }
                 `}>მინიმუმ 3 სიმბოლო</span>
                 <span className={`flex items-center font-[350] text-[10px] text-[#6C757D] h-[16px]
                
                ${ (surname.length > 0 || surnameTouched) && ( !(surname.length <= 255) 
                    ? "text-red-500" : "text-[#08A508]")
                }
                 `}>მაქსიმუმ 255 სიმბოლო</span>
                 </div>
                </div>
              </div>
    
              {/* Image Upload */}
              <div >
                <label className="block text-[#343A40] font-[500] h-[17px] text-[14px] mb-[8px]">ავატარი*</label>
                <div onClick={handleClick} className="border-[1px] hover:cursor-pointer h-[120px] border-dashed border-[#CED4DA] rounded-[8px] w-[813px] p-6 flex justify-center items-center relative">
                  
                <input
                 required
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />

              {avatar == "" ?  (<div className="flex flex-col gap-[5px] mt-[50px] mb-[20px] items-center justify-center">
                    <img
                    src={pitureLogo}
                    alt="avatar"
                    className="w-[24px] h-[24px] rounded-full object-cover"
                  />
                  <span className="block text-[14px] text-[#343A40]">ატვირთე ფოტო</span>
                  </div>) :

                  (<div className="relative w-[88px] h-[88px]">
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-[88px] h-[88px] rounded-full object-cover hover:cursor-auto"
                  />
                     <button onClick={(e) => {
                      e.stopPropagation()
                      return setAvatar('')}} className="absolute right-[-2px] bottom-[-2px] flex items-center justify-center w-[24px] h-[24px] hover:cursor-pointer bg-white  rounded-[30px]"
                       style={{ 
                        boxShadow: '0 0 0 0.2px #6C757D'
                     }}
                     >
                     <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.75 3.5H2.91667H12.25" stroke="#6C757D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.0837 3.49996V11.6666C11.0837 11.976 10.9607 12.2728 10.7419 12.4916C10.5232 12.7104 10.2264 12.8333 9.91699 12.8333H4.08366C3.77424 12.8333 3.47749 12.7104 3.2587 12.4916C3.03991 12.2728 2.91699 11.976 2.91699 11.6666V3.49996M4.66699 3.49996V2.33329C4.66699 2.02387 4.78991 1.72713 5.0087 1.50833C5.22749 1.28954 5.52424 1.16663 5.83366 1.16663H8.16699C8.47641 1.16663 8.77316 1.28954 8.99195 1.50833C9.21074 1.72713 9.33366 2.02387 9.33366 2.33329V3.49996" stroke="#6C757D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.83301 6.41663V9.91663" stroke="#6C757D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.16699 6.41663V9.91663" stroke="#6C757D" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                  </button>
                  
                  </div>)}
               
                </div>
              </div>
    
              {/* Dropdown */}
              <div  className="flex flex-col">
             
              <label className=" text-[#343A40] text-[14px] flex  font-[500] h-[17px]">დეპარტამენტი
              <svg className="w-[8px] h-[8px]" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.31997 7.03996H3.67997C3.59185 7.03996 3.51997 6.96871 3.51997 6.87996V4.83559L1.7431 5.85121C1.66747 5.89496 1.5706 5.86871 1.52622 5.79309L1.20622 5.24934C1.18435 5.21246 1.1781 5.16871 1.18935 5.12746C1.19997 5.08621 1.22685 5.05121 1.26372 5.02996L3.0406 3.99996L1.26372 2.97059C1.22685 2.94934 1.19997 2.91371 1.18935 2.87246C1.1781 2.83121 1.18435 2.78746 1.2056 2.75059L1.5256 2.20684C1.56997 2.13121 1.66747 2.10559 1.7431 2.14934L3.51997 3.16434V1.11996C3.51997 1.03184 3.59185 0.959961 3.67997 0.959961H4.31997C4.40872 0.959961 4.47997 1.03184 4.47997 1.11996V3.16434L6.25685 2.14934C6.33247 2.10559 6.42935 2.13121 6.47372 2.20684L6.79372 2.75059C6.8156 2.78746 6.82185 2.83121 6.8106 2.87246C6.79997 2.91371 6.7731 2.94934 6.73622 2.97059L4.95935 3.99996L6.73622 5.02934C6.77247 5.05121 6.79935 5.08621 6.8106 5.12746C6.82122 5.16871 6.8156 5.21246 6.79372 5.24934L6.47372 5.79309C6.42935 5.86871 6.33247 5.89496 6.25685 5.85059L4.47997 4.83559V6.87996C4.47997 6.96871 4.40872 7.03996 4.31997 7.03996Z" fill="#343A40"/>
</svg>
              </label>
              <Select 
                    value={EmpDepartmentId?.toString()}
                    onValueChange={(value) => setEmpDepartmentId(Number(value))}
                     required>
                  <SelectTrigger   className="w-[384px] h-[42px] rounded-[6px] border-[1px] p-[10px] gap-[6px]">
                    <SelectValue  placeholder = {<span className="font-[300] text-[#0D0F10] text-[14px]">აირჩიე დეპარტამენტი</span>}></ SelectValue>
                  </SelectTrigger>
                  <SelectContent className="font-[300] w-[384px] z-50">
                    {departments?.map((department) => <SelectItem value={department.id.toString()}>
                     <span className="font-[300] text-[14px] text-[#0D0F10]">
                      {department.name}
                      </span>
                      </SelectItem>)}
                    
                  </SelectContent>
                </Select>
              </div>
    
              {/* Buttons */}
              <div className="flex justify-end gap-[22px] mt-[15px]">
                <button onClick={handleClose} type="button" className="px-[16px] h-[42px] py-[10px] border-[1px] text-[#343A40] border-[#8338EC] hover:cursor-pointer hover:border-[#B588F4] rounded-[5px]">გაუქმება</button>
                <button type="submit" className="px-[20px] h-[42px] py-[10px] bg-[#8338EC] text-[#FFFFFF] text-[18px] rounded-[5px] hover:cursor-pointer hover:bg-[#B588F4]">
                  დაამატე თანამშრომელი
                </button>
              </div>
            </form>

            </div>
          </div>
        </div>
      );
    };
    




export default CreateEmployeeFrom;