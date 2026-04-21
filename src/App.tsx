import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import AppRouter from "./router/AppRouter";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";

function App() {
   // const { AuthCheck } = useAuthStore();

   // useEffect(() => {
   //    AuthCheck()
   // }, []);

   return (
      <BrowserRouter>
         <Toaster />
         <AppRouter />
      </BrowserRouter>
   )
}

export default App;
