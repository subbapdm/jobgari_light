import type { Location } from "@/types/location";
import { ApiClient } from "./client";

export class LocationService extends ApiClient{

   /**
    * Get all locations
   */
   async getLocations(): Promise<{ locations: Location[] }>{
      return this.request("/locations");
   }
};

export const locationService = new LocationService();