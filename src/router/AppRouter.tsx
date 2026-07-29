import { Navigate, Route, Routes } from "react-router-dom";

import Companies from "@/pages/admin/companies/Companies";
import Dashboard from "@/pages/admin/Dashboard";
import DashboardLayout from "@/pages/admin/DashboardLayout";
import Create from "@/pages/admin/jobs/Create";
import Jobs from "@/pages/admin/jobs/Jobs";
import Users from "@/pages/admin/users/Users";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PublicRoute from "@/components/auth/PublicRoute";
import HomePage from "@/pages/HomePage";
import MainLayout from "@/components/layout/MainLayout";
import AuthLayout from "@/components/layout/AuthLayout";
import JobListing from "@/pages/JobListing";

const AppRouter = () => {

   return (
      <Routes>
         {/* Public Routes */}
         <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobListing />} />
         </Route>
         
         {/* Auth Routes */}
         <Route element={<PublicRoute />}>
            <Route element={<AuthLayout />}>
               <Route path="/sign-in" element={<SignIn />} />
               <Route path="/sign-up" element={<SignUp />} />
            </Route>
         </Route>
         
         {/* Admin Routes */}
         <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<DashboardLayout />}>
               <Route index element={<Navigate to="dashboard" replace />} />
               <Route path="dashboard" element={<Dashboard />} />
               <Route path="jobs" element={<Jobs />} />
               <Route path="jobs/create" element={<Create />} />
               <Route path="users" element={<Users />} />
               <Route path="companies" element={<Companies />} />
            </Route>
         </Route>
         
         {/* Catch-all 404 Routes */}
         <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
   )
}

export default AppRouter