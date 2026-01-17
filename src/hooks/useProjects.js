// hooks/useProjects.js
"use client";

import { useCallback, useMemo } from 'react';
import { useLocalStorageArray } from './useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import { getTodayString } from '@/lib/dateUtils';

/**
 * Hook personnalisé pour gérer les projets
 */
export function useProjects() {
    const {
        array: projects,
        setArray: setProjects,
        addItem: addProject,
        removeItem: removeProject,
        updateItem: updateProject,
        findItem: findProject
    } = useLocalStorageArray('productivity_projects', []);

    // Créer un nouveau projet
    // hooks/useProjects.js - Extrait de la fonction createProject
    const createProject = useCallback((projectData) => {
        const newProject = {
            id: uuidv4(),
            name: projectData.name || 'Nouveau Projet',
            description: projectData.description || '',
            color: projectData.color || 'blue', // On stocke la clé (ex: 'blue')
            icon: projectData.icon || 'folder',   // On stocke la clé (ex: 'folder')
            startDate: projectData.startDate || getTodayString(),
            endDate: projectData.endDate || '',
            priority: projectData.priority || 'moyenne',
            status: projectData.status || 'ACTIF',
            // --- MISE À JOUR ICI ---
            tasks: projectData.initialTasks || [],
            completedTasks: 0,
            totalTasks: projectData.initialTasks ? projectData.initialTasks.length : 0,
            // -----------------------
            lastModified: Date.now(),
            createdAt: Date.now()
        };

        addProject(newProject);
        return newProject;
    }, [addProject]);

    // Mettre à jour un projet
    const updateProjectData = useCallback((projectId, updates) => {
        updateProject(projectId, {
            ...updates,
            lastModified: Date.now()
        });
    }, [updateProject]);

    // Supprimer un projet
    const deleteProject = useCallback((projectId) => {
        removeProject(projectId);
    }, [removeProject]);

    // Obtenir un projet par ID
    const getProjectById = useCallback((projectId) => {
        return findProject(projectId);
    }, [findProject]);

    // Ajouter une tâche à un projet
    const addTaskToProject = useCallback((projectId, taskId) => {
        const project = findProject(projectId);
        if (!project) return;

        const updatedTasks = [...project.tasks, taskId];
        updateProject(projectId, {
            tasks: updatedTasks,
            totalTasks: updatedTasks.length,
            lastModified: Date.now()
        });
    }, [findProject, updateProject]);

    // Retirer une tâche d'un projet
    const removeTaskFromProject = useCallback((projectId, taskId) => {
        const project = findProject(projectId);
        if (!project) return;

        const updatedTasks = project.tasks.filter(id => id !== taskId);
        updateProject(projectId, {
            tasks: updatedTasks,
            totalTasks: updatedTasks.length,
            lastModified: Date.now()
        });
    }, [findProject, updateProject]);

    // Mettre à jour le compteur de tâches complétées
    const updateProjectTasksCount = useCallback((projectId, completedCount, totalCount) => {
        updateProject(projectId, {
            completedTasks: completedCount,
            totalTasks: totalCount,
            lastModified: Date.now()
        });
    }, [updateProject]);

    // Calculer la progression d'un projet
    const getProjectProgress = useCallback((projectId) => {
        const project = findProject(projectId);
        if (!project || project.totalTasks === 0) return 0;

        return Math.round((project.completedTasks / project.totalTasks) * 100);
    }, [findProject]);

    // Filtrer les projets par statut
    const getProjectsByStatus = useCallback((status) => {
        return projects.filter(project => project.status === status);
    }, [projects]);

    // Filtrer les projets par priorité
    const getProjectsByPriority = useCallback((priority) => {
        return projects.filter(project => project.priority === priority);
    }, [projects]);

    // Obtenir les projets actifs
    const activeProjects = useMemo(() => {
        return projects.filter(project =>
            project.status === 'ACTIF' || project.status === 'URGENT'
        );
    }, [projects]);

    // Obtenir les projets terminés
    const completedProjects = useMemo(() => {
        return projects.filter(project => project.status === 'TERMINÉ');
    }, [projects]);

    // Obtenir les projets urgents
    const urgentProjects = useMemo(() => {
        return projects.filter(project => project.status === 'URGENT');
    }, [projects]);

    // Trier les projets
    const sortProjects = useCallback((sortBy = 'lastModified', order = 'desc') => {
        return [...projects].sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case 'name':
                    comparison = a.name.localeCompare(b.name);
                    break;
                case 'progress':
                    const progressA = a.totalTasks > 0 ? (a.completedTasks / a.totalTasks) : 0;
                    const progressB = b.totalTasks > 0 ? (b.completedTasks / b.totalTasks) : 0;
                    comparison = progressA - progressB;
                    break;
                case 'priority':
                    const priorityOrder = { basse: 1, moyenne: 2, haute: 3, urgente: 4 };
                    comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
                    break;
                case 'lastModified':
                default:
                    comparison = a.lastModified - b.lastModified;
                    break;
            }

            return order === 'desc' ? -comparison : comparison;
        });
    }, [projects]);

    // Rechercher des projets
    const searchProjects = useCallback((query) => {
        const lowerQuery = query.toLowerCase();
        return projects.filter(project =>
            project.name.toLowerCase().includes(lowerQuery) ||
            project.description.toLowerCase().includes(lowerQuery)
        );
    }, [projects]);

    // Obtenir les statistiques des projets
    const projectStats = useMemo(() => {
        return {
            total: projects.length,
            active: activeProjects.length,
            completed: completedProjects.length,
            urgent: urgentProjects.length,
            totalTasks: projects.reduce((sum, p) => sum + p.totalTasks, 0),
            completedTasks: projects.reduce((sum, p) => sum + p.completedTasks, 0)
        };
    }, [projects, activeProjects, completedProjects, urgentProjects]);

    return {
        projects,
        setProjects,
        createProject,
        updateProjectData,
        deleteProject,
        getProjectById,
        addTaskToProject,
        removeTaskFromProject,
        updateProjectTasksCount,
        getProjectProgress,
        getProjectsByStatus,
        getProjectsByPriority,
        activeProjects,
        completedProjects,
        urgentProjects,
        sortProjects,
        searchProjects,
        projectStats
    };
}

export default useProjects;