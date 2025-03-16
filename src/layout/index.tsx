import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {

    return(
        <>
            <Header /> 
            <Outlet/>
            </> 
     )

}


export default DashboardLayout;