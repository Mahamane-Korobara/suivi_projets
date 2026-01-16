"use client";
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import ProjectModal from '@/components/projects/ProjectModal';
import Input from '@/components/ui/Input';
import Dropdown from '@/components/ui/Dropdown';
import Button from '@/components/ui/Button';
import { useProjects } from '@/hooks/useProjects';
import { PROJECT_COLORS, PROJECT_ICONS, PRIORITIES } from '@/lib/constants';

// État initial pour faciliter la réinitialisation
const INITIAL_FORM_STATE = {
  name: '',
  description: '',
  colorKey: 'blue',
  iconKey: 'folder',
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  priority: 'moyenne'
};

const CreateProjectModal = ({ isOpen, onClose }) => {
  const { createProject } = useProjects();
  
  // États locaux
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');

  // Fonction pour tout réinitialiser
  const handleResetAndClose = () => {
    setFormData(INITIAL_FORM_STATE);
    setTasks([]);
    setCurrentTask('');
    onClose();
  };

  // Transformer les PRIORITIES pour le Dropdown
  const priorityOptions = Object.values(PRIORITIES).map(p => ({
    label: p.name,
    value: p.value
  }));

  const handleAddTask = () => {
    if (currentTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: currentTask, completed: false }]);
      setCurrentTask('');
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleSubmit = () => {
    // Validation simple
    if (!formData.name.trim()) {
      return alert("Le nom du projet est requis");
    }

    const projectToSave = {
      name: formData.name,
      description: formData.description,
      color: formData.colorKey,
      icon: formData.iconKey,
      startDate: formData.startDate,
      endDate: formData.endDate,
      priority: formData.priority,
      initialTasks: tasks 
    };

    // 1. Sauvegarde via le hook (génère l'ID uuid en interne)
    createProject(projectToSave);
    
    // 2. Log de debug
    console.log("Projet enregistré avec succès :", projectToSave);

    // 3. Alerte de confirmation
    alert(`🎉 Le projet "${formData.name}" a été enregistré avec succès !`);

    // 4. Fermeture et réinitialisation
    handleResetAndClose();
  };

  return (
    <ProjectModal 
      isOpen={isOpen} 
      onClose={handleResetAndClose} // On reset aussi si on ferme via la croix
      title="Nouveau Projet"
      subtitle="Définissez les bases de votre nouvelle collaboration."
      footer={
        <>
          <Button variant="secondary" onClick={handleResetAndClose}>Annuler</Button>
          <Button variant="primary" onClick={handleSubmit}>Créer le projet</Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Nom du projet */}
        <Input 
          label="Nom du projet"
          placeholder="Ex: Refonte du site E-commerce"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />

        {/* Description */}
        <Input 
          label="Description"
          isTextArea 
          placeholder="Décrivez l'objectif..."
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />

        {/* Sélecteur de Couleurs */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-400">Couleur du projet</label>
          <div className="flex flex-wrap gap-3">
            {Object.entries(PROJECT_COLORS).map(([key, colorData]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFormData({...formData, colorKey: key})}
                className={`w-8 h-8 rounded-full transition-all flex items-center justify-center
                  ${formData.colorKey === key ? 'ring-2 ring-white scale-110 shadow-lg' : 'hover:scale-105'}`}
                style={{ backgroundColor: colorData.hex }}
              >
                {formData.colorKey === key && <div className="w-2 h-2 bg-white rounded-full" />}
              </button>
            ))}
          </div>
        </div>

        {/* Sélecteur d'Icônes */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-400">Icône</label>
          <div className="grid grid-cols-6 gap-2">
            {Object.entries(PROJECT_ICONS).map(([key, item]) => {
              const IconComp = item.icon;
              return (
                <Button 
                  key={key}
                  variant={formData.iconKey === key ? "primary" : "secondary"} 
                  size="sm" 
                  icon={IconComp}
                  onClick={() => setFormData({...formData, iconKey: key})}
                  className="p-2"
                />
              );
            })}
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Date de début" type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
          />
          <Input 
            label="Date de fin" type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
          />
        </div>

        {/* Priorité */}
        <Dropdown 
          label="Priorité"
          options={priorityOptions}
          value={formData.priority}
          onChange={(val) => setFormData({...formData, priority: val})}
        />

        {/* Section Tâches */}
        <div className="space-y-4 pt-4 border-t border-gray-800">
          <label className="text-sm font-medium text-gray-400">Tâches initiales ({tasks.length})</label>
          <div className="flex gap-2">
            <Input 
              placeholder="Ajouter une tâche et appuyez sur Entrée"
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            />
            <Button variant="secondary" icon={Plus} onClick={handleAddTask} />
          </div>
          
          <div className="max-h-40 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {tasks.map((task) => (
              <div key={task.id} className="bg-[#1a1d23] border border-gray-800 rounded-lg p-3 flex items-center justify-between group">
                <span className="text-sm text-gray-300">{task.text}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={Trash2} 
                  className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 transition-all"
                  onClick={() => removeTask(task.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProjectModal>
  );
};

export default CreateProjectModal;