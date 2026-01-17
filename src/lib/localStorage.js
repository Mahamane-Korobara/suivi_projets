// lib/localStorage.js

const STORAGE_KEYS = {
    PROJECTS: 'productivity_projects',
    TASKS: 'productivity_tasks',
    STATS: 'productivity_stats',
    CURRENT_TASK: 'productivity_current_task',
    SETTINGS: 'productivity_settings'
};

// Fonction générique pour sauvegarder dans localStorage
export const saveToStorage = (key, data) => {
    try {
        const serialized = JSON.stringify(data);
        localStorage.setItem(key, serialized);
        return true;
    } catch (error) {
        console.error(`Erreur lors de la sauvegarde dans localStorage (${key}):`, error);
        return false;
    }
};

// Fonction générique pour récupérer depuis localStorage
export const getFromStorage = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Erreur lors de la récupération depuis localStorage (${key}):`, error);
        return defaultValue;
    }
};

// Fonction pour supprimer une clé
export const removeFromStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Erreur lors de la suppression de localStorage (${key}):`, error);
        return false;
    }
};

// Fonction pour vider tout le storage
export const clearStorage = () => {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        return true;
    } catch (error) {
        console.error('Erreur lors du nettoyage de localStorage:', error);
        return false;
    }
};

// === PROJETS ===
export const saveProjects = (projects) => {
    return saveToStorage(STORAGE_KEYS.PROJECTS, projects);
};

export const getProjects = () => {
    return getFromStorage(STORAGE_KEYS.PROJECTS, []);
};

export const saveProject = (project) => {
    const projects = getProjects();
    const existingIndex = projects.findIndex(p => p.id === project.id);

    if (existingIndex >= 0) {
        projects[existingIndex] = { ...project, lastModified: Date.now() };
    } else {
        projects.push({ ...project, lastModified: Date.now() });
    }

    return saveProjects(projects);
};

export const deleteProject = (projectId) => {
    const projects = getProjects();
    const filtered = projects.filter(p => p.id !== projectId);
    return saveProjects(filtered);
};

export const getProjectById = (projectId) => {
    const projects = getProjects();
    return projects.find(p => p.id === projectId) || null;
};

// === TÂCHES ===
export const saveTasks = (tasks) => {
    return saveToStorage(STORAGE_KEYS.TASKS, tasks);
};

export const getTasks = () => {
    return getFromStorage(STORAGE_KEYS.TASKS, []);
};

export const saveTask = (task) => {
    const tasks = getTasks();
    const existingIndex = tasks.findIndex(t => t.id === task.id);

    if (existingIndex >= 0) {
        tasks[existingIndex] = task;
    } else {
        tasks.push(task);
    }

    return saveTasks(tasks);
};

export const deleteTask = (taskId) => {
    const tasks = getTasks();
    const filtered = tasks.filter(t => t.id !== taskId);
    return saveTasks(filtered);
};

export const getTaskById = (taskId) => {
    const tasks = getTasks();
    return tasks.find(t => t.id === taskId) || null;
};

export const getTasksByProject = (projectId) => {
    const tasks = getTasks();
    return tasks.filter(t => t.projectId === projectId);
};

export const toggleTaskCompletion = (taskId) => {
    const task = getTaskById(taskId);
    if (!task) return false;

    task.completed = !task.completed;
    task.completedAt = task.completed ? Date.now() : null;

    return saveTask(task);
};

// === STATISTIQUES ===
// export const saveStats = (stats) => {
//     return saveToStorage(STORAGE_KEYS.STATS, stats);
// };

// export const getStats = () => {
//     return getFromStorage(STORAGE_KEYS.STATS, []);
// };

// export const getStatsByDate = (date) => {
//     const stats = getStats();
//     return stats.find(s => s.date === date) || null;
// };

// export const saveDailyStat = (stat) => {
//     const stats = getStats();
//     const existingIndex = stats.findIndex(s => s.date === stat.date);

//     if (existingIndex >= 0) {
//         stats[existingIndex] = stat;
//     } else {
//         stats.push(stat);
//     }

//     // Garder seulement les 30 derniers jours
//     const sorted = stats.sort((a, b) => new Date(b.date) - new Date(a.date));
//     const limited = sorted.slice(0, 30);

//     return saveStats(limited);
// };

// // === TÂCHE EN COURS ===
// export const saveCurrentTask = (task) => {
//     return saveToStorage(STORAGE_KEYS.CURRENT_TASK, task);
// };

// export const getCurrentTask = () => {
//     return getFromStorage(STORAGE_KEYS.CURRENT_TASK, null);
// };

// export const clearCurrentTask = () => {
//     return removeFromStorage(STORAGE_KEYS.CURRENT_TASK);
// };

// // === PARAMÈTRES ===
// export const saveSettings = (settings) => {
//     return saveToStorage(STORAGE_KEYS.SETTINGS, settings);
// };

// export const getSettings = () => {
//     return getFromStorage(STORAGE_KEYS.SETTINGS, {
//         theme: 'dark',
//         notifications: true,
//         language: 'fr'
//     });
// };

export { STORAGE_KEYS };