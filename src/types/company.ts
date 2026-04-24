export interface Company{
   _id: string;
   name: string;
   logo: string;
   location: Location;
   isVerified: boolean;
   createdAt?: string;
   updatedAt?: string;
}