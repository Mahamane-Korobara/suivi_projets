const ProgressBar = ({ value, max = 100, color = "bg-blue-600", label }) => {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        {label && <span className="text-xs font-medium text-gray-400">{label}</span>}
        <span className="text-xs font-medium text-gray-400">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1.5">
        <div 
          className={`h-1.5 rounded-full ${color}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;