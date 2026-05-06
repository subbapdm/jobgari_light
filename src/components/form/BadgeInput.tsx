import { useRef, useState, type KeyboardEvent } from "react";
import { Sparkle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgerInputProps {
   value?: string[];
   onChange?: (value: string[]) => void;
   placeholder?: string;
   className?: string;
   suggestings?: string [];
}


const BadgeInput = ({ value = [], onChange, placeholder, className, suggestings }: BadgerInputProps) => {
   const [input, setInput] = useState("");
   const inputRef = useRef<HTMLInputElement>(null);

   const commit = (raw: string) => {
      const trimmed = raw.trim();
      if(!trimmed || value.includes(trimmed)){
         setInput("");
         return;
      }
      onChange?.([...value, trimmed]);
      setInput("");
   };

   const remove = (item: string) => {
      onChange?.(value.filter((v) => v !== item));
   };

   const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if((e.key === "Enter" || e.key === ",") && input.trim()){
         e.preventDefault();
         commit(input);
      } else if (e.key === "Backspace" && !input && value.length){
         onChange?.(value.slice(0, -1));
      }
   };

   const filteredSuggestions = suggestings?.filter((s) => !value.includes(s));

   return (
      <div className="space-y-3">
         <div onClick={() => inputRef.current?.focus()} className={cn("flex flex-wrap gap-2 transition p-2 border border-gray-200", className)}>
            {value.map((item) => (
               <span key={item} role="listitem" className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full bg-teal-100 text-teal-700 text-[0.7rem] font-medium">
                  {item}
                  <button type="button" aria-label={`Remove ${item}`} onClick={(e) => { e.stopPropagation(); remove(item)}} className="size-4 grid place-items-center rounded hover:bg-teal-300 cursor-pointer">
                     <X className="size-3.5" />
                  </button>
               </span>
            ))}
            <input
               ref={inputRef}
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={onKeyDown}
               onBlur={() => commit(input)}
               placeholder={value.length === 0 ?  "Type and press Enter or ," : placeholder}
               aria-label="Add a skill"
               className="flex-1 min-w-[120px] text-gray-600 bg-transparent text-sm focus:outline-none px-2"
            />
         </div>
         {filteredSuggestions && filteredSuggestions.length > 0 && (
            <div>
               <p className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  <Sparkle className="size-3 text-gray-400" /> Suggested
               </p>
               <div className="flex flex-wrap gap-1.5">
                  {filteredSuggestions.map((s) => (
                     <button key={s} type="button" onClick={() => commit(s)} className="text-xs px-2.5 py-1 rounded-lg border border-dashed border-gray-200 text-muted-foreground hover:border-gray-300 hover:text-gray-400 hover:bg-gray-50 transition cursor-pointer">
                        + {s}
                     </button>
                  ))}
               </div>
            </div>
         )}
      </div>
   )
}

export default BadgeInput;