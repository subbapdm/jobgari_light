import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import DashboardLayout from "./pages/admin/DashboardLayout"
import Dashboard from "./pages/admin/Dashboard"
import Users from "./pages/admin/users/Users"
import Create from "./pages/admin/jobs/Create"
import Jobs from "./pages/admin/jobs/Jobs"
import { Toaster } from "./components/ui/sonner"
import Companies from "./pages/admin/companies/Companies"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"

function App() {

   return (
      <BrowserRouter>
         <Toaster />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />

            <Route path="/admin" element={<DashboardLayout />}>
               <Route index element={<Navigate to="dashboard" replace />} />
               <Route path="dashboard" element={<Dashboard />} />
               <Route path="jobs" element={<Jobs />} />
               <Route path="jobs/create" element={<Create />} />
               <Route path="users" element={<Users />} />
               <Route path="companies" element={<Companies />} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}

export default App
