import { Currency } from "lucide-react";
import React, { useState, useEffect } from "react";

interface DisabledInputComponentProps {
  type: string;
  label: string;
  initialValue: number;
  currency: string;
}

const DisabledInputComponent: React.FC<DisabledInputComponentProps> = ({
  type,
  label,
  initialValue,
  currency,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
    } else {
      setValue(0);
    }
  };
  const formattedValue = `${value} ${currency}`;

  return (
    <div className="flex bg-[#2b3655] rounded-2xl items-left flex-col flex-grow pt-6 mb-4">
      <div className="mb-6">
      <h1 className="mb-2 ml-3 text-white">{type === 'pay' ? 'You pay' : 'You receive'}</h1>
        <input
          disabled
          type="text"
          value={formattedValue}
          onChange={handleChange}
          placeholder="0"
          className="ml-3 bg-[#2b3655] input input-ghost text-3xl focus:text-white focus:outline-none focus:bg-transparent h-[2.2rem] min-h-[2.2rem] px-1 font-medium placeholder:text-accent/50 text-gray-400"
        />
      </div>
    </div>
  );
};

export default DisabledInputComponent;
