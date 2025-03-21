import CreateEmployeeFrom from "@/components/createEmployee";
import Header from "@/components/header";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
   const [empFormOpen, setEmpFormOpen] = useState<boolean>(false)
    return(
        <>
            <Header setEmpFormOpen = {setEmpFormOpen}/> 
            {empFormOpen && <CreateEmployeeFrom setEmpFormOpen = {setEmpFormOpen}/>}
           <div className="mb-[100px]">
            <Outlet />
            </div>
            </> 
     )

}


export default DashboardLayout;