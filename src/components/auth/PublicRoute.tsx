
import useAuthStore from '@/store/useAuthStore'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../Loader';

const PublicRoute = () => {

   const { isAuthenticated, loading } = useAuthStore();

   if(loading) return <Loader />
  
   return isAuthenticated ? <Navigate to="/admin" replace /> : <Outlet />;
}

export default PublicRoute;