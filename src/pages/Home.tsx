
import useAuthStore from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";


const Home = () => {
   const navigate = useNavigate();
   const { user } = useAuthStore();

   return (
      <div className="flex justify-center mt-23">
         <div className="p-10">
            <h1 className="text-2xl font-bold">Welcome Back!</h1>
            <p className="text-md text-gray-600">{user?.name}</p>
         </div>
      </div>
   )
}

export default Home;