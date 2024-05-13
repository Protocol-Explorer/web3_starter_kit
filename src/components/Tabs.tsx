type CustomTabProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
};

const CustomTab: React.FC<CustomTabProps> = ({
  label,
  isActive,
  onClick,
  icon,
}) => {
  // Constructing class string conditionally
  const baseClasses =
    "py-1.5 px-3 text-2xl rounded-full grid grid-flow-col mr-2";
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
