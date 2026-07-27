
import useAuthStore from '@/store/useAuthStore'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Loader from '../Loader';

interface ProtectedRouteProps {
   allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
   const { user, isAuthenticated, loading } = useAuthStore();
   const location = useLocation();

   if(loading){
      return <Loader />;
   }

   if(!isAuthenticated){
      return <Navigate to="/sign-in" state={{ from: location }} replace />;
   }

   if(allowedRoles && user && !allowedRoles.includes(user.role)){
      return <Navigate to="/" replace />;
   }
   
   return <Outlet />
}

export default ProtectedRoute;