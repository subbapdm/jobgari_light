
import useAuthStore from '@/store/useAuthStore'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../Loader';

const ProtectedRoute = () => {
   const { isAuthenticated, loading } = useAuthStore();

   if(loading){
      return <Loader />
   }
   
   return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />
}

export default ProtectedRoute;