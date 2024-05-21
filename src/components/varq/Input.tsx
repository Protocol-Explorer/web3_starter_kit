import React, { useState, useEffect } from 'react';

interface InputComponentProps {
  label: string;
  initialValue: number;  
  onValueChange?: (newValue: number) => void;  
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  initialValue,
  onValueChange,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem(label);
      if (savedValue !== null) {
        setValue(parseFloat(savedValue));
      }
    }
    setIsMounted(true);
  }, [label]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(label, value.toString());
      if (onValueChange) {
        onValueChange(value);
      }
    }
  }, [value, label, onValueChange, isMounted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
    } else {
      setValue(0); 
    }
  };

  return (
    <div className="flex bg-[#2b3655] rounded-2xl items-left flex-col flex-grow pt-6 mb-4">
      <div className="mb-6">
        <div className="flex flex-row">
          <h1 className="mb-2 ml-3 text-white">
            {label}
          </h1>
        </div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="0"
          className="ml-3 bg-[#2b3655] input input-ghost text-3xl focus:text-white focus:outline-none focus:bg-transparent h-[2.2rem] min-h-[2.2rem] px-1 font-medium placeholder:text-accent/50 text-gray-400"
        />
      </div>
    </div>
  );
};

export default InputComponent;
