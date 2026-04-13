const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiClient {
   private baseUrl: string;

   constructor(){
      this.baseUrl = API_BASE_URL;
   }

   protected async request<T>(endpoint: string, options: RequestInit = {}): Promise<T>{
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
         headers: {
            "Content-Type": "application/json"
         },
         ...options,
      })

      if(!response.ok){
         const error = await response.json();
         throw new Error(error.message || "Something went wrong");
      }

      return response.json();
   }
}