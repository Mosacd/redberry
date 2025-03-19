import { Navigate, Route, Routes } from 'react-router-dom';
import GeneralTaskPage from "@/pages/generalTaskPage";
import DashboardLayout from './layout';
import TaskPage from './pages/individualTaskPage';
import CreateTaskPage from './pages/createTaskPage';


function App() {

  return (
   
    <Routes>
      <Route  element = {<DashboardLayout/>}>
      <Route  index element = {<Navigate to={'/home'}/>} />
      <Route  path='/home' element = {<GeneralTaskPage/>} />
      <Route path='/taskPage/:id' element = {<TaskPage/>} />
      <Route path='/createTaskPage' element = {<CreateTaskPage/>} />
     </Route>
     <Route path='*' element = {<div className='flex w-screen h-screen justify-center items-center'><h1 className='text-8xl text-center'>404 Page Not Found</h1></div>} />
    </Routes>

  
  )
}

export default App