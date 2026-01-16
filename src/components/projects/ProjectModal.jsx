import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const ProjectModal = ({ isOpen, onClose, title, subtitle, children, footer }) => {
  // Fermer la modal avec la touche Échap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay / Fond sombre flouté */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Conteneur de la Modal */}
      <div className="relative bg-[#121418] border border-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-8 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
              {subtitle && <p className="text-gray-500 mt-1 text-sm">{subtitle}</p>}
            </div>
            <button 
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Corps (Scrollable si le contenu est long) */}
        <div className="p-8 pt-2 overflow-y-auto custom-scrollbar">
          {children}
        </div>

        {/* Footer (La zone sombre en bas pour les boutons) */}
        {footer && (
          <div className="p-6 bg-[#0d0f12] border-t border-gray-800 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;