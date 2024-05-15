type CustomTabProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
};

const CustomTab: React.FC<CustomTabProps> = ({
  label,
  isActive,
  onClick,
  icon,
}) => {
  // Constructing class string conditionally
  const baseClasses =
    "p-2 px-4 text-lg rounded-2xl grid grid-flow-col mr-2 border border-grey-300";
  const activeClasses = isActive
    ? "bg-secondary shadow-md"
    : "hover:bg-secondary hover:shadow-md";

  return (
    <button onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
      {icon}
      {label}
    </button>
  );
};

// Default export
export default CustomTab;
