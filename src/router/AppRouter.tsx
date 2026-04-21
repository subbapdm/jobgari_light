import { Navigate, Route, Routes } from "react-router-dom";

import Companies from "@/pages/admin/companies/Companies";
import Dashboard from "@/pages/admin/Dashboard";
import DashboardLayout from "@/pages/admin/DashboardLayout";
import Create from "@/pages/admin/jobs/Create";
import Jobs from "@/pages/admin/jobs/Jobs";
import Users from "@/pages/admin/users/Users";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import Home from "@/pages/Home";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PublicRoute from "@/components/auth/PublicRoute";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";

const AppRouter = () => {

   return (
      <Routes>
         {/* Public Routes */}
         <Route path="/" element={<Home />} />
         
         <Route element={<PublicRoute />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
         </Route>
         
         {/* Protected Routes */}
         <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<DashboardLayout />}>
               <Route index element={<Navigate to="dashboard" replace />} />
               <Route path="dashboard" element={<Dashboard />} />
               <Route path="jobs" element={<Jobs />} />
               <Route path="jobs/create" element={<Create />} />
               <Route path="users" element={<Users />} />
               <Route path="companies" element={<Companies />} />
            </Route>
         </Route>
      </Routes>
   )
}

export default AppRouter