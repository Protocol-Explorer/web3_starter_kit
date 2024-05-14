import React, { useState, useEffect } from 'react';

interface InputComponentProps {
  label: string;
  initialValue: number;  // Changed from `value` to `initialValue` to avoid prop conflicts
  onValueChange?: (newValue: number) => void;  // Optional callback for external updates
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  initialValue,
  onValueChange,
}) => {
  
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(label);
    return savedValue !== null ? parseFloat(savedValue) : initialValue;
  });

  
  useEffect(() => {
    localStorage.setItem(label, value.toString()); 
    if (onValueChange) {
      onValueChange(value);
    }
  }, [value, label, onValueChange]);

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
