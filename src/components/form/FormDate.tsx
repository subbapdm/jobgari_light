
import { format, getMonth, getYear, setMonth, setYear } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { cn } from "@/lib/utils";

interface FormDateProps {
   value: Date;
   onChange: (date: Date) => void;
   startYear?: number;
   endYear?: number;
   className?: string;
}

export function FormDate({
      value,
      onChange,
      startYear = getYear(new Date()) - 100, 
      endYear = getYear(new Date()) + 100, 
      className
   }: FormDateProps) {
      const date = value ?? new Date();
      const months = [
         "January",
         "February",
         "March",
         "April",
         "May",
         "June",
         "July",
         "August",
         "September",
         "October",
         "November",
         "December"
      ];

      const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

      const handleMonthChange = (month: string) => {
        onChange(setMonth(date, month.indexOf(month)))
      }

      const handleYearChange = (year: string) => {
         onChange(setYear(date, parseInt(year)))
      }

      const handleSelect = (selectedDate: Date | undefined) => {
         if(selectedDate){
            onChange(selectedDate);
         }
      }

      return (
         <Popover>
            <PopoverTrigger asChild>
               <Button
                  variant="outline"
                  data-empty={!date}
                  className={cn("w-full justify-start text-left data-[empty=true]:text-muted-foreground", className)}
               >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
               <div className="flex justify-between gap-2">
                  <Select
                     onValueChange={handleMonthChange}
                     value={months[getMonth(date)]}
                  >
                     <SelectTrigger className="w-full min-h-10 rounded-sm">
                        <SelectValue placeholder="Month" />
                     </SelectTrigger>
                     <SelectContent position="popper" className="p-1">
                        {months.map(month => (
                           <SelectItem key={month} value={month} className="p-2">{month}</SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
                  <Select
                     onValueChange={handleYearChange}
                     value={getYear(date).toString()}
                  >
                     <SelectTrigger className="w-full min-h-10 rounded-sm">
                        <SelectValue placeholder="Year" />
                     </SelectTrigger>
                     <SelectContent position="popper" className="max-h-[300px] overflow-y-auto p-1">
                        {years.map(year => (
                           <SelectItem key={year} value={year.toString()} className="p-2">{year}</SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>
               <Calendar 
                  mode="single" 
                  selected={date} 
                  onSelect={handleSelect}
                  month={date}
                  onMonthChange={(month) => onChange(month)}
                  className="p-0"
                  classNames={{
                     day: "p-0.5"
                  }}
               />
            </PopoverContent>
         </Popover>
      )
}