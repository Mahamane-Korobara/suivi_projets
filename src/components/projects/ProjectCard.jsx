"use client";
import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Trash2, Edit3, CheckCircle, Clock } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
import { PROJECT_COLORS, PROJECT_ICONS, PROJECT_STATUS } from '@/lib/constants';
import { formatLastModified } from '@/lib/dateUtils';
import { useProjects } from '@/hooks/useProjects';
// Import important pour la modification
import CreateProjectModal from '@/components/layout/CreateProjectModal'; 

const ProjectCard = ({ project }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Ajout de l'état
  const menuRef = useRef(null);
  const { deleteProject, updateProjectData } = useProjects();

  const statusData = PROJECT_STATUS[project.status] || PROJECT_STATUS.ACTIF;
  const iconData = PROJECT_ICONS[project.icon] || PROJECT_ICONS.folder;
  const IconComponent = iconData.icon;
  const colorData = PROJECT_COLORS[project.color] || PROJECT_COLORS.blue;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = () => {
    if (confirm(`Supprimer le projet "${project.name}" ?`)) {
      deleteProject(project.id);
      window.location.reload(); 
    }
  };

  const handleChangeStatus = (newStatus) => {
    updateProjectData(project.id, { status: newStatus });
    setShowMenu(false);
    // Optionnel : reload ici aussi si tu veux rafraîchir les stats
    window.location.reload(); 
  };

  return (
    <>
      <div className="bg-[#0d0f12] border border-gray-800 rounded-2xl p-4 hover:border-gray-700 transition-all group relative">
        <div className="flex items-center gap-6">
          
          {/* Icône */}
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-900/50 border border-gray-800">
            <IconComponent size={24} className={colorData.text} />
          </div>

          {/* Titre et Date */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold truncate text-lg">{project.name}</h3>
            <p className="text-gray-500 text-sm">{formatLastModified(project.lastModified)}</p>
          </div>

          {/* Barre de progression */}
          <div className="hidden md:block w-1/3">
            <ProgressBar 
              value={project.completedTasks || 0} 
              max={project.totalTasks || 0} 
              color={colorData.bg}
              label={`${project.completedTasks || 0}/${project.totalTasks || 0} tâches`}
            />
          </div>

          {/* Badge & Menu */}
          <div className="flex items-center gap-4 relative" ref={menuRef}>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusData.badge} border border-white/5`}>
              {statusData.name}
            </span>
            
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
            >
              <MoreVertical size={20} />
            </button>

            {/* Menu Déroulant */}
            {showMenu && (
              <div className="absolute right-0 top-10 w-52 bg-[#16191f] border border-gray-800 rounded-xl shadow-2xl z-50 py-2 animate-in fade-in zoom-in duration-200">
                <button 
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setShowMenu(false);
                  }} 
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  <Edit3 size={16} /> Modifier le projet
                </button>

                <div className="border-t border-gray-800 my-1" />
                
                {project.status !== 'TERMINÉ' ? (
                  <button 
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-green-400 hover:bg-green-500/10 transition-colors"
                    onClick={() => handleChangeStatus('TERMINÉ')}
                  >
                    <CheckCircle size={16} /> Marquer comme terminé
                  </button>
                ) : (
                  <button 
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-blue-400 hover:bg-blue-500/10 transition-colors"
                    onClick={() => handleChangeStatus('ACTIF')}
                  >
                    <Clock size={16} /> Remettre en actif
                  </button>
                )}

                <div className="border-t border-gray-800 my-1" />

                <button 
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  onClick={handleDelete}
                >
                  <Trash2 size={16} /> Supprimer le projet
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE MODIFICATION APPELÉE ICI */}
      <CreateProjectModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        projectToEdit={project} 
      />
    </>
  );
};

export default ProjectCard;