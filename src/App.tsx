import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import DashboardLayout from "./pages/admin/DashboardLayout"

function App() {

   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<DashboardLayout />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App
