interface ReceiveComponentProps {
    label: string;
    value: number;
    setValue: (value: number) => void;
}

const ReceiveComponent: React.FC<ReceiveComponentProps> = ({
    label,
    value,
    setValue,
  }) => (
    <div className="flex bg-[#2b3655] rounded-2xl items-left flex-col flex-grow pt-6 mb-4">
      <div className="mb-6">
        <h1 className="mb-2 ml-3">You receive</h1>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const newValue = parseFloat(e.target.value);
            if (!isNaN(newValue)) { 
              setValue(newValue);
            } else {
              setValue(0); 
            }
          }}
          placeholder="0"
          className="ml-3 bg-[#2b3655] input input-ghost text-3xl focus:text-white focus:outline-none focus:bg-transparent h-[2.2rem] min-h-[2.2rem] px-1 font-medium placeholder:text-accent/50 text-gray-400"
        />
      </div>
    </div>
  );

export default ReceiveComponent;