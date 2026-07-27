import { Link, Outlet } from "react-router-dom"


const AuthLayout = () => {
   return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 p-4">
         <div className="mb-6">
            <Link to="/" className="text-2xl font-bold text-teal-600">
               <img src="/logo.svg" width={150} />
            </Link>
         </div>

         <Outlet />
      </div>
   )
}

export default AuthLayout;