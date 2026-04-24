import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import AppRouter from "./router/AppRouter";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
   // const { AuthCheck } = useAuthStore();

   // useEffect(() => {
   //    AuthCheck()
   // }, []);

   const queryClient = new QueryClient({
      defaultOptions: {
         queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
         }
      }
   })

   return (
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <Toaster />
            <AppRouter />
         </BrowserRouter>
      </QueryClientProvider>
   )
}

export default App;
