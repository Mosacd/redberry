import { Route, Routes } from 'react-router-dom';
import GeneralTaskPage from "@/pages/generalTaskPage";
import DashboardLayout from './layout';


function App() {

  return (
   
    <Routes>
      <Route  element = {<DashboardLayout/>}>
      <Route index element = {<GeneralTaskPage/>} />
     </Route>
     <Route path='*' element = {<div className='flex w-screen h-screen justify-center items-center'><h1 className='text-8xl text-center'>404 Page Not Found</h1></div>} />
    </Routes>

  
  )
}

export default App