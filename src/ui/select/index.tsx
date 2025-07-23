import React, { useState, useEffect, useRef } from 'react';
import {ArrowDropDown} from "@mui/icons-material";

interface Option {
   id: number;
   label: string;
}

interface SelectProps {
   options: Option[];
   value: number | null;
   placeholder?: string;
   onChange: (selected: Option | null) => void;
   className?: string;
   label?: string;
   error?: string;
   required?: boolean;
   defaultId?: number;
}

export const UiSelect: React.FC<SelectProps> = (props) => {
   const [isOpen, setIsOpen] = useState(false);
   const [selectedOption, setSelectedOption] = useState<Option | null>(null);
   const selectRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (props.defaultId !== undefined) {
         const newSelected = props.options.find((option) => option.id === props.defaultId) || null;
         setSelectedOption(newSelected);
      }
   }, [props.defaultId, props.options]);

   const handleOptionClick = (option: Option) => {
      setSelectedOption(option);
      props.onChange(option);
      setIsOpen(false);
   };

   return (
      <div ref={selectRef} className={`w-full flex flex-col gap-[8px] ${props.className}`}>
         {props.label && <label
             className={`text-black text-[14px] font-medium text-[12px] ${props.error ? 'text-red' : ''}`}>{props.label}{props.required ?
            <span className={'text-red'}>*</span> : ''}</label>
         }
         <div className={'relative'}>
            <button
               className="outline-brown4 select-none flex items-center gap-[15px] justify-between cursor-pointer bg-brown1 border border-brown3 rounded-md px-[12px] py-[8px] text-[14px] text-black font-normal w-full"
               onClick={() => setIsOpen(!isOpen)}
            >
               <div className={`flex w-full item-center justify-between text-black`}>
                  {selectedOption ? selectedOption.label : props.placeholder}
                  <span className={`${isOpen ? 'rotate-[180deg]' : ''} transition`}><ArrowDropDown/></span>
               </div>
            </button>
            {isOpen && (
               <ul className="z-10 absolute top-[100%] right-0 w-full flex flex-col bg-brown1 border border-brown3 rounded-md shadow-lg max-h-[200px] overflow-y-auto">
                  {props.options.map((option) => (
                     <button
                        key={option.id}
                        className="outline-brown4 z-20 cursor-pointer py-3 hover:bg-brown2 transition px-[12px] text-[14px] text-left"
                        onClick={() => handleOptionClick(option)}
                     >
                        {option.label}
                     </button>
                  ))}
               </ul>
            )}
         </div>
      </div>
   );
};
