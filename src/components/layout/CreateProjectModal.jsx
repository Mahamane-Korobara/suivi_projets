"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Clock } from 'lucide-react';
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
  priority: 'moyenne',
  estimatedTime: '2h 00m'
};

const CreateProjectModal = ({ isOpen, onClose, projectToEdit = null }) => {
  const { createProject, updateProjectData } = useProjects();
  
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  const [currentTaskTime, setCurrentTaskTime] = useState('');

  useEffect(() => {
    if (projectToEdit && isOpen) {
      setFormData({
        name: projectToEdit.name,
        description: projectToEdit.description || '',
        colorKey: projectToEdit.color || 'blue',
        iconKey: projectToEdit.icon || 'folder',
        startDate: projectToEdit.startDate,
        endDate: projectToEdit.endDate || '',
        priority: projectToEdit.priority || 'moyenne',
        estimatedTime: projectToEdit.estimatedTime || '2h 00m'
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
    setCurrentTaskTime('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleAddTask = () => {
    if (currentTask.trim()) {
      const newTask = {
        id: Date.now(),
        text: currentTask,
        completed: false,
        estimatedTime: currentTaskTime || "Non défini",
        completedAt: null
      };
      setTasks([...tasks, newTask]);
      setCurrentTask('');
      setCurrentTaskTime('');
    }
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, completedAt: !task.completed ? Date.now() : null } 
        : task
    ));
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const handleSubmit = () => {
    // Vérification du nom
    if (!formData.name.trim()) {
      return alert("Le nom du projet est requis");
    }

    // Vérification de la présence de tâches (Nouveau)
    if (tasks.length === 0) {
      return alert("Vous devez ajouter au moins une tâche pour créer ce projet.");
    }

    const projectData = {
      ...formData,
      color: formData.colorKey,
      icon: formData.iconKey,
      tasks: tasks,
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.completed).length,
      lastModified: Date.now()
    };

    if (projectToEdit) {
      updateProjectData(projectToEdit.id, projectData);
    } else {
      createProject({ ...projectData, initialTasks: tasks });
    }

    handleClose();
    window.location.reload();
  };
  return (
    <ProjectModal 
      isOpen={isOpen} 
      onClose={handleClose}
      title={projectToEdit ? "Modifier le Projet" : "Nouveau Projet"}
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button variant="primary" onClick={handleSubmit}>
            {projectToEdit ? "Enregistrer" : "Créer le projet"}
          </Button>
        </>
      }
    >
      {/* Conteneur avec scrollbar invisible */}
      <div className="space-y-6">
        
        {/* Informations de base */}
        <div className="space-y-4">
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
        </div>

        {/* PROJECT_COLORS : Sélection de la couleur */}
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

        {/* PROJECT_ICONS : Sélection de l'icône */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-400">Icône du projet</label>
          <div className="grid grid-cols-6 gap-2">
            {Object.entries(PROJECT_ICONS).map(([key, item]) => (
              <button 
                key={key}
                type="button"
                onClick={() => setFormData({...formData, iconKey: key})}
                className={`flex items-center justify-center p-2 rounded-lg border transition-all ${formData.iconKey === key ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600'}`}
              >
                <item.icon size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* Dates et Priorité */}
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

        {/* SECTION TACHES */}
        <div className="space-y-4 pt-4 border-t border-gray-800">
          <label className="text-sm font-medium text-gray-400">Gestion des tâches</label>
          <div className="flex flex-col gap-2">
            <Input 
              placeholder="Nom de la tâche..."
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            />
            <div className="flex gap-2">
              <Input 
                placeholder="Durée (ex: 30m, 1h)"
                value={currentTaskTime}
                onChange={(e) => setCurrentTaskTime(e.target.value)}
              />
              <Button variant="secondary" icon={Plus} onClick={handleAddTask}>Ajouter</Button>
            </div>
          </div>
          
          <div className="space-y-2 mt-2">
            {tasks.map((task) => (
              <div key={task.id} className="group flex items-center justify-between bg-[#16191f] p-3 rounded-lg border border-gray-800 hover:border-gray-700 transition-all">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => toggleTaskComplete(task.id)}
                    className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-blue-600"
                  />
                  <div>
                    <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                      {task.text}
                    </p>
                    <div className="text-[10px] text-gray-500 font-mono italic"><Clock size={16} /> {task.estimatedTime}</div>
                  </div>
                </div>
                <button onClick={() => removeTask(task.id)} className="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProjectModal>
  );
};

export default CreateProjectModal;