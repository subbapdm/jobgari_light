
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import useAuthStore from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
   const navigate = useNavigate();
   const { user } = useAuthStore();

   return (
      <>
         <Hero />
      </>
   )
}

export default HomePage;