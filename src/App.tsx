import { Route, Routes } from 'react-router-dom';

import DashboardLayout from './layout';


function App() {

  return (
   
    <Routes>
      <Route index element = {<DashboardLayout/>} />
     
    </Routes>

  
  )
}

export default App