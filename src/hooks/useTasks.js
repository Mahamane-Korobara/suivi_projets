// hooks/useTasks.js
import { useCallback, useMemo } from 'react';
import { useLocalStorageArray } from './useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import { getTodayString, isOverdue, getDaysRemaining } from '@/lib/dateUtils';

/**
 * Hook personnalisé pour gérer les tâches
 */
export function useTasks() {
    const {
        array: tasks,
        setArray: setTasks,
        addItem: addTask,
        removeItem: removeTask,
        updateItem: updateTask,
        findItem: findTask
    } = useLocalStorageArray('productivity_tasks', []);

    // Créer une nouvelle tâche
    const createTask = useCallback((taskData) => {
        const newTask = {
            id: uuidv4(),
            title: taskData.title || 'Nouvelle tâche',
            description: taskData.description || '',
            projectId: taskData.projectId || null,
            completed: false,
            dueDate: taskData.dueDate || '',
            dueTime: taskData.dueTime || '',
            priority: taskData.priority || 'moyenne',
            createdAt: Date.now(),
            completedAt: null
        };

        addTask(newTask);
        return newTask;
    }, [addTask]);

    // Mettre à jour une tâche
    const updateTaskData = useCallback((taskId, updates) => {
        updateTask(taskId, updates);
    }, [updateTask]);

    // Supprimer une tâche
    const deleteTask = useCallback((taskId) => {
        removeTask(taskId);
    }, [removeTask]);

    // Obtenir une tâche par ID
    const getTaskById = useCallback((taskId) => {
        return findTask(taskId);
    }, [findTask]);

    // Marquer une tâche comme complétée/non complétée
    const toggleTaskCompletion = useCallback((taskId) => {
        const task = findTask(taskId);
        if (!task) return;

        updateTask(taskId, {
            completed: !task.completed,
            completedAt: !task.completed ? Date.now() : null
        });
    }, [findTask, updateTask]);

    // Obtenir les tâches d'un projet
    const getTasksByProject = useCallback((projectId) => {
        return tasks.filter(task => task.projectId === projectId);
    }, [tasks]);

    // Obtenir les tâches complétées d'un projet
    const getCompletedTasksByProject = useCallback((projectId) => {
        return tasks.filter(task =>
            task.projectId === projectId && task.completed
        );
    }, [tasks]);

    // Obtenir les tâches non complétées d'un projet
    const getPendingTasksByProject = useCallback((projectId) => {
        return tasks.filter(task =>
            task.projectId === projectId && !task.completed
        );
    }, [tasks]);

    // Obtenir les tâches par priorité
    const getTasksByPriority = useCallback((priority) => {
        return tasks.filter(task => task.priority === priority && !task.completed);
    }, [tasks]);

    // Obtenir les tâches pour aujourd'hui
    const getTodayTasks = useCallback(() => {
        const today = getTodayString();
        return tasks.filter(task =>
            task.dueDate === today && !task.completed
        );
    }, [tasks]);

    // Obtenir les tâches en retard
    const getOverdueTasks = useCallback(() => {
        return tasks.filter(task =>
            task.dueDate && isOverdue(task.dueDate, task.completed)
        );
    }, [tasks]);

    // Obtenir les prochaines échéances (7 jours)
    const getUpcomingTasks = useCallback((days = 7) => {
        return tasks
            .filter(task => {
                if (!task.dueDate || task.completed) return false;
                const remaining = getDaysRemaining(task.dueDate);
                return remaining >= 0 && remaining <= days;
            })
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }, [tasks]);

    // Tâches complétées
    const completedTasks = useMemo(() => {
        return tasks.filter(task => task.completed);
    }, [tasks]);

    // Tâches en attente
    const pendingTasks = useMemo(() => {
        return tasks.filter(task => !task.completed);
    }, [tasks]);

    // Tâches urgentes (priorité urgente et non complétées)
    const urgentTasks = useMemo(() => {
        return tasks.filter(task =>
            task.priority === 'urgente' && !task.completed
        );
    }, [tasks]);

    // Trier les tâches
    const sortTasks = useCallback((sortBy = 'createdAt', order = 'desc') => {
        return [...tasks].sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case 'title':
                    comparison = a.title.localeCompare(b.title);
                    break;
                case 'dueDate':
                    if (!a.dueDate) return 1;
                    if (!b.dueDate) return -1;
                    comparison = new Date(a.dueDate) - new Date(b.dueDate);
                    break;
                case 'priority':
                    const priorityOrder = { basse: 1, moyenne: 2, haute: 3, urgente: 4 };
                    comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
                    break;
                case 'createdAt':
                default:
                    comparison = a.createdAt - b.createdAt;
                    break;
            }

            return order === 'desc' ? -comparison : comparison;
        });
    }, [tasks]);

    // Rechercher des tâches
    const searchTasks = useCallback((query) => {
        const lowerQuery = query.toLowerCase();
        return tasks.filter(task =>
            task.title.toLowerCase().includes(lowerQuery) ||
            task.description.toLowerCase().includes(lowerQuery)
        );
    }, [tasks]);

    // Filtrer les tâches
    const filterTasks = useCallback((filters) => {
        return tasks.filter(task => {
            // Filtre par projet
            if (filters.projectId && task.projectId !== filters.projectId) {
                return false;
            }

            // Filtre par statut complété
            if (filters.completed !== undefined && task.completed !== filters.completed) {
                return false;
            }

            // Filtre par priorité
            if (filters.priority && task.priority !== filters.priority) {
                return false;
            }

            // Filtre par date
            if (filters.dueDate && task.dueDate !== filters.dueDate) {
                return false;
            }

            return true;
        });
    }, [tasks]);

    // Obtenir les statistiques des tâches
    const taskStats = useMemo(() => {
        const today = getTodayString();
        const todayTasks = tasks.filter(t => t.dueDate === today);

        return {
            total: tasks.length,
            completed: completedTasks.length,
            pending: pendingTasks.length,
            urgent: urgentTasks.length,
            overdue: getOverdueTasks().length,
            today: todayTasks.length,
            todayCompleted: todayTasks.filter(t => t.completed).length,
            completionRate: tasks.length > 0
                ? Math.round((completedTasks.length / tasks.length) * 100)
                : 0
        };
    }, [tasks, completedTasks, pendingTasks, urgentTasks, getOverdueTasks]);

    return {
        tasks,
        setTasks,
        createTask,
        updateTaskData,
        deleteTask,
        getTaskById,
        toggleTaskCompletion,
        getTasksByProject,
        getCompletedTasksByProject,
        getPendingTasksByProject,
        getTasksByPriority,
        getTodayTasks,
        getOverdueTasks,
        getUpcomingTasks,
        completedTasks,
        pendingTasks,
        urgentTasks,
        sortTasks,
        searchTasks,
        filterTasks,
        taskStats
    };
}

export default useTasks;