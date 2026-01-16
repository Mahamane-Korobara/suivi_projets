import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, // On passe l'icône Lucide ici (ex: icon={Plus})
  isLoading = false,
  className = '',
  ...props 
}) => {
  
  // Styles de base basés sur ton design sombre
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  // Variantes de couleurs (fidèles à tes captures)
  const variants = {
    primary: "bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-lg shadow-blue-900/20",
    secondary: "bg-[#1a1d23] text-gray-300 border border-gray-700 hover:border-gray-500 hover:text-white",
    outline: "bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white",
    ghost: "bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white",
  };

  // Tailles ajustées (padding réduit si c'est un bouton d'icône seule)
  const isIconOnly = !children;
  const sizes = {
    sm: isIconOnly ? "p-1.5" : "px-3 py-1.5 text-xs gap-1.5",
    md: isIconOnly ? "p-2.5" : "px-5 py-2.5 text-sm gap-2",
    lg: isIconOnly ? "p-3.5" : "px-8 py-3 text-base gap-3",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin mr-1">
          {/* Un petit spinner simple en SVG */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </span>
      ) : (
        <>
          {Icon && <Icon size={isIconOnly ? 18 : 16} strokeWidth={2.5} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;