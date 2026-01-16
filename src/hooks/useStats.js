// hooks/useStats.js
import { useCallback, useMemo } from 'react';
import { useLocalStorageArray } from './useLocalStorage';
import { getTodayString, addDaysToDate, getWeekDaysForChart } from '@/lib/dateUtils';

/**
 * Hook personnalisé pour gérer les statistiques de productivité
 */
export function useStats() {
    const {
        array: stats,
        setArray: setStats,
        addItem: addStat,
        updateItem: updateStat,
        findItem: findStat
    } = useLocalStorageArray('productivity_stats', []);

    // Obtenir les statistiques d'une date
    const getStatsByDate = useCallback((date) => {
        return stats.find(stat => stat.date === date) || null;
    }, [stats]);

    // Obtenir ou créer les statistiques d'aujourd'hui
    const getTodayStats = useCallback(() => {
        const today = getTodayString();
        let todayStats = getStatsByDate(today);

        if (!todayStats) {
            todayStats = {
                date: today,
                tasksCompleted: 0,
                tasksTotal: 0,
                focusTime: 0, // en minutes
                productivity: 0 // pourcentage
            };
            addStat(todayStats);
        }

        return todayStats;
    }, [getStatsByDate, addStat]);

    // Mettre à jour les statistiques du jour
    const updateTodayStats = useCallback((updates) => {
        const today = getTodayString();
        const todayStats = getStatsByDate(today);

        if (todayStats) {
            updateStat(today, updates, 'date');
        } else {
            addStat({
                date: today,
                tasksCompleted: 0,
                tasksTotal: 0,
                focusTime: 0,
                productivity: 0,
                ...updates
            });
        }
    }, [getStatsByDate, updateStat, addStat]);

    // Incrémenter le nombre de tâches complétées aujourd'hui
    const incrementTodayTasksCompleted = useCallback(() => {
        const todayStats = getTodayStats();
        const newCompleted = todayStats.tasksCompleted + 1;
        const productivity = todayStats.tasksTotal > 0
            ? Math.round((newCompleted / todayStats.tasksTotal) * 100)
            : 0;

        updateTodayStats({
            ...todayStats,
            tasksCompleted: newCompleted,
            productivity
        });
    }, [getTodayStats, updateTodayStats]);

    // Décrémenter le nombre de tâches complétées aujourd'hui
    const decrementTodayTasksCompleted = useCallback(() => {
        const todayStats = getTodayStats();
        const newCompleted = Math.max(0, todayStats.tasksCompleted - 1);
        const productivity = todayStats.tasksTotal > 0
            ? Math.round((newCompleted / todayStats.tasksTotal) * 100)
            : 0;

        updateTodayStats({
            ...todayStats,
            tasksCompleted: newCompleted,
            productivity
        });
    }, [getTodayStats, updateTodayStats]);

    // Mettre à jour le total de tâches du jour
    const updateTodayTasksTotal = useCallback((total) => {
        const todayStats = getTodayStats();
        const productivity = total > 0
            ? Math.round((todayStats.tasksCompleted / total) * 100)
            : 0;

        updateTodayStats({
            ...todayStats,
            tasksTotal: total,
            productivity
        });
    }, [getTodayStats, updateTodayStats]);

    // Ajouter du temps de focus (en minutes)
    const addFocusTime = useCallback((minutes) => {
        const todayStats = getTodayStats();
        const newFocusTime = Math.min(todayStats.focusTime + minutes, 1440); // Max 24h

        updateTodayStats({
            ...todayStats,
            focusTime: newFocusTime
        });
    }, [getTodayStats, updateTodayStats]);

    // Obtenir les statistiques de la semaine
    const getWeekStats = useCallback(() => {
        const weekDays = getWeekDaysForChart();

        return weekDays.map(day => {
            const dayStat = getStatsByDate(day.date);
            return {
                ...day,
                tasksCompleted: dayStat?.tasksCompleted || 0,
                tasksTotal: dayStat?.tasksTotal || 0,
                focusTime: dayStat?.focusTime || 0,
                productivity: dayStat?.productivity || 0
            };
        });
    }, [getStatsByDate]);

    // Obtenir les statistiques des N derniers jours
    const getLastDaysStats = useCallback((days = 7) => {
        const result = [];
        const today = getTodayString();

        for (let i = days - 1; i >= 0; i--) {
            const date = addDaysToDate(today, -i);
            const dayStat = getStatsByDate(date);

            result.push({
                date,
                tasksCompleted: dayStat?.tasksCompleted || 0,
                tasksTotal: dayStat?.tasksTotal || 0,
                focusTime: dayStat?.focusTime || 0,
                productivity: dayStat?.productivity || 0
            });
        }

        return result;
    }, [getStatsByDate]);

    // Calculer la moyenne de productivité sur N jours
    const getAverageProductivity = useCallback((days = 7) => {
        const lastDaysStats = getLastDaysStats(days);
        const validStats = lastDaysStats.filter(s => s.tasksTotal > 0);

        if (validStats.length === 0) return 0;

        const total = validStats.reduce((sum, stat) => sum + stat.productivity, 0);
        return Math.round(total / validStats.length);
    }, [getLastDaysStats]);

    // Calculer le total de tâches complétées sur N jours
    const getTotalTasksCompleted = useCallback((days = 7) => {
        const lastDaysStats = getLastDaysStats(days);
        return lastDaysStats.reduce((sum, stat) => sum + stat.tasksCompleted, 0);
    }, [getLastDaysStats]);

    // Calculer le temps de focus total sur N jours
    const getTotalFocusTime = useCallback((days = 7) => {
        const lastDaysStats = getLastDaysStats(days);
        return lastDaysStats.reduce((sum, stat) => sum + stat.focusTime, 0);
    }, [getLastDaysStats]);

    // Obtenir la tendance de productivité (en hausse/baisse)
    const getProductivityTrend = useCallback(() => {
        const lastWeek = getLastDaysStats(7);
        if (lastWeek.length < 2) return 0;

        const firstHalf = lastWeek.slice(0, 3);
        const secondHalf = lastWeek.slice(-3);

        const avgFirst = firstHalf.reduce((sum, s) => sum + s.productivity, 0) / firstHalf.length;
        const avgSecond = secondHalf.reduce((sum, s) => sum + s.productivity, 0) / secondHalf.length;

        return avgSecond - avgFirst;
    }, [getLastDaysStats]);

    // Statistiques globales calculées
    const globalStats = useMemo(() => {
        const weekStats = getWeekStats();
        const totalCompleted = weekStats.reduce((sum, s) => sum + s.tasksCompleted, 0);
        const totalTasks = weekStats.reduce((sum, s) => sum + s.tasksTotal, 0);
        const avgProductivity = getAverageProductivity(7);
        const trend = getProductivityTrend();

        return {
            weeklyTasksCompleted: totalCompleted,
            weeklyTasksTotal: totalTasks,
            weeklyProductivity: avgProductivity,
            trend: trend,
            trendDirection: trend > 5 ? 'up' : trend < -5 ? 'down' : 'stable'
        };
    }, [getWeekStats, getAverageProductivity, getProductivityTrend]);

    // Nettoyer les anciennes statistiques (garder 30 jours)
    const cleanOldStats = useCallback(() => {
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        const filtered = stats.filter(stat => {
            const statDate = new Date(stat.date);
            return statDate >= thirtyDaysAgo;
        });

        setStats(filtered);
    }, [stats, setStats]);

    return {
        stats,
        setStats,
        getStatsByDate,
        getTodayStats,
        updateTodayStats,
        incrementTodayTasksCompleted,
        decrementTodayTasksCompleted,
        updateTodayTasksTotal,
        addFocusTime,
        getWeekStats,
        getLastDaysStats,
        getAverageProductivity,
        getTotalTasksCompleted,
        getTotalFocusTime,
        getProductivityTrend,
        globalStats,
        cleanOldStats
    };
}

export default useStats;