// lib/dateUtils.js
import { format, parseISO, isToday, isTomorrow, isYesterday, differenceInDays, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { fr } from 'date-fns/locale';

// Formater une date au format lisible
export const formatDate = (date, formatString = 'dd MMM yyyy') => {
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        return format(dateObj, formatString, { locale: fr });
    } catch (error) {
        console.error('Erreur de formatage de date:', error);
        return '';
    }
};

// Formater une date avec le jour de la semaine
export const formatDateWithDay = (date) => {
    return formatDate(date, 'EEEE dd MMMM yyyy');
};

// Formater seulement l'heure
export const formatTime = (time) => {
    if (!time) return '';
    return time;
};

// Obtenir la date du jour au format YYYY-MM-DD
export const getTodayString = () => {
    return format(new Date(), 'yyyy-MM-dd');
};

// Vérifier si une date est aujourd'hui
export const isDateToday = (date) => {
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        return isToday(dateObj);
    } catch (error) {
        return false;
    }
};

// Vérifier si une date est demain
export const isDateTomorrow = (date) => {
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        return isTomorrow(dateObj);
    } catch (error) {
        return false;
    }
};

// Vérifier si une date est hier
export const isDateYesterday = (date) => {
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        return isYesterday(dateObj);
    } catch (error) {
        return false;
    }
};

// Obtenir un texte relatif pour une date (Aujourd'hui, Demain, etc.)
export const getRelativeDateText = (date) => {
    if (!date) return '';

    if (isDateToday(date)) return "Aujourd'hui";
    if (isDateTomorrow(date)) return "Demain";
    if (isDateYesterday(date)) return "Hier";

    return formatDate(date, 'dd MMM');
};

// Calculer le nombre de jours restants
export const getDaysRemaining = (dueDate) => {
    try {
        const dateObj = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
        const today = new Date();
        const days = differenceInDays(dateObj, today);
        return days;
    } catch (error) {
        return 0;
    }
};

// Obtenir le texte des jours restants
export const getDaysRemainingText = (dueDate) => {
    const days = getDaysRemaining(dueDate);

    if (days < 0) return `En retard de ${Math.abs(days)} jour${Math.abs(days) > 1 ? 's' : ''}`;
    if (days === 0) return "Aujourd'hui";
    if (days === 1) return "Demain";
    return `Dans ${days} jours`;
};

// Vérifier si une date est passée
export const isPastDate = (date) => {
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return dateObj < today;
    } catch (error) {
        return false;
    }
};

// Vérifier si une tâche est en retard
export const isOverdue = (dueDate, completed = false) => {
    if (completed) return false;
    return isPastDate(dueDate);
};

// Obtenir les dates de la semaine en cours
export const getCurrentWeekDates = () => {
    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn: 1 }); // Lundi
    const end = endOfWeek(today, { weekStartsOn: 1 }); // Dimanche

    return eachDayOfInterval({ start, end });
};

// Obtenir le nom du jour
export const getDayName = (date) => {
    return formatDate(date, 'EEEE');
};

// Obtenir le nom du jour court
export const getShortDayName = (date) => {
    return formatDate(date, 'EEE');
};

// Ajouter des jours à une date
export const addDaysToDate = (date, days) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(addDays(dateObj, days), 'yyyy-MM-dd');
};

// Convertir une date en timestamp
export const dateToTimestamp = (date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return dateObj.getTime();
};

// Convertir un timestamp en date
export const timestampToDate = (timestamp) => {
    return format(new Date(timestamp), 'yyyy-MM-dd');
};

// Obtenir la date et l'heure actuelles formatées
export const getCurrentDateTime = () => {
    return {
        date: getTodayString(),
        time: format(new Date(), 'HH:mm'),
        timestamp: Date.now()
    };
};

// Calculer le pourcentage de temps écoulé pour un projet
export const getProjectProgress = (startDate, endDate) => {
    try {
        const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
        const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
        const today = new Date();

        const totalDays = differenceInDays(end, start);
        const elapsedDays = differenceInDays(today, start);

        if (elapsedDays < 0) return 0;
        if (elapsedDays > totalDays) return 100;

        return Math.round((elapsedDays / totalDays) * 100);
    } catch (error) {
        return 0;
    }
};

// Obtenir les jours de la semaine pour un graphique
export const getWeekDaysForChart = () => {
    const days = getCurrentWeekDates();
    return days.map(day => ({
        date: format(day, 'yyyy-MM-dd'),
        dayName: getShortDayName(day),
        isToday: isToday(day)
    }));
};