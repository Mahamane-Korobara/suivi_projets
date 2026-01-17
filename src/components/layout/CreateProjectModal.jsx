"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import ProjectModal from '@/components/projects/ProjectModal';
import Input from '@/components/ui/Input';
import Dropdown from '@/components/ui/Dropdown';
import Button from '@/components/ui/Button';
import { useProjects } from '@/hooks/useProjects';
import { PROJECT_COLORS, PROJECT_ICONS, PRIORITIES } from '@/lib/constants';

const INITIAL_FORM_STATE = {
  name: '',
  description: '',
  colorKey: 'blue',
  iconKey: 'folder',
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  priority: 'moyenne'
};

const CreateProjectModal = ({ isOpen, onClose, projectToEdit = null }) => {
  const { createProject, updateProjectData } = useProjects();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');

  // Remplir le formulaire si on est en mode édition
  useEffect(() => {
    if (projectToEdit && isOpen) {
      setFormData({
        name: projectToEdit.name,
        description: projectToEdit.description,
        colorKey: projectToEdit.color,
        iconKey: projectToEdit.icon,
        startDate: projectToEdit.startDate,
        endDate: projectToEdit.endDate,
        priority: projectToEdit.priority
      });
      setTasks(projectToEdit.tasks || []);
    } else if (!isOpen) {
      handleReset();
    }
  }, [projectToEdit, isOpen]);

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setTasks([]);
    setCurrentTask('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) return alert("Le nom est requis");

    const projectData = {
      name: formData.name,
      description: formData.description,
      color: formData.colorKey,
      icon: formData.iconKey,
      startDate: formData.startDate,
      endDate: formData.endDate,
      priority: formData.priority,
      tasks: tasks,
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.completed).length
    };

    if (projectToEdit) {
      // MODE ÉDITION
      updateProjectData(projectToEdit.id, projectData);
      alert("Projet mis à jour !");
    } else {
      // MODE CRÉATION
      createProject({ ...projectData, initialTasks: tasks });
      alert("Projet créé !");
    }

    handleClose();
    // RECHARGE LA PAGE
    window.location.reload();
  };

  const handleAddTask = () => {
    if (currentTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: currentTask, completed: false }]);
      setCurrentTask('');
    }
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <ProjectModal 
      isOpen={isOpen} 
      onClose={handleClose}
      title={projectToEdit ? "Modifier le Projet" : "Nouveau Projet"}
      subtitle={projectToEdit ? "Mettez à jour les détails de votre projet." : "Définissez les bases de votre nouvelle collaboration."}
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button variant="primary" onClick={handleSubmit}>
            {projectToEdit ? "Enregistrer les modifications" : "Créer le projet"}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <Input 
          label="Nom du projet"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />

        <Input 
          label="Description"
          isTextArea 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />

        {/* Sélecteurs Couleur & Icône (Gardés identiques à ton code) */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-400">Couleur</label>
          <div className="flex flex-wrap gap-3">
            {Object.entries(PROJECT_COLORS).map(([key, colorData]) => (
              <button
                key={key}
                onClick={() => setFormData({...formData, colorKey: key})}
                className={`w-8 h-8 rounded-full transition-all ${formData.colorKey === key ? 'ring-2 ring-white scale-110' : ''}`}
                style={{ backgroundColor: colorData.hex }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2">
            {Object.entries(PROJECT_ICONS).map(([key, item]) => (
              <Button 
                key={key}
                variant={formData.iconKey === key ? "primary" : "secondary"} 
                size="sm" 
                icon={item.icon}
                onClick={() => setFormData({...formData, iconKey: key})}
              />
            ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Début" type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
          <Input label="Fin" type="date" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
        </div>

        <Dropdown 
          label="Priorité"
          options={Object.values(PRIORITIES).map(p => ({ label: p.name, value: p.value }))}
          value={formData.priority}
          onChange={(val) => setFormData({...formData, priority: val})}
        />

        {/* Section Tâches */}
        <div className="space-y-4 pt-4 border-t border-gray-800">
          <div className="flex justify-between items-end">
            <label className="text-sm font-medium text-gray-400">
              Tâches ({tasks.filter(t => t.completed).length}/{tasks.length})
            </label>
          </div>
          
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
              <div 
                key={task.id} 
                className={`bg-[#1a1d23] border transition-all rounded-lg p-3 flex items-center justify-between group 
                  ${task.completed ? 'border-green-500/30 bg-green-500/5' : 'border-gray-800'}`}
              >
                <div className="flex items-center gap-3 flex-1">
                  {/* Checkbox pour marquer comme fait */}
                  <input 
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskComplete(task.id)}
                    className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
                  />
                  <span className={`text-sm transition-all ${task.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                    {task.text}
                  </span>
                </div>

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