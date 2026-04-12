import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import DashboardLayout from "./pages/admin/DashboardLayout"
import Dashboard from "./pages/admin/Dashboard"
import Users from "./pages/admin/users/Users"
import Jobs from "./pages/admin/jobs/jobs"
import Create from "./pages/admin/jobs/Create"

function App() {

   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/admin" element={<DashboardLayout />}>
               <Route index element={<Navigate to="dashboard" replace />} />
               <Route path="dashboard" element={<Dashboard />} />
               <Route path="jobs" element={<Jobs />} />
               <Route path="jobs/create" element={<Create />} />
               <Route path="users" element={<Users />} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}

export default App
