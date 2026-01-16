// lib/constants.js
import { Palette, Megaphone, Code, Shield, FileText, Rocket, Users, Settings, Calendar, LayoutDashboard, FolderKanban, CheckSquare } from 'lucide-react';

// Couleurs disponibles pour les projets
export const PROJECT_COLORS = {
    blue: {
        name: 'Bleu',
        bg: 'bg-blue-500',
        text: 'text-blue-500',
        hover: 'hover:bg-blue-600',
        ring: 'ring-blue-500',
        hex: '#3b82f6',
        light: '#60a5fa',
        dark: '#2563eb'
    },
    pink: {
        name: 'Rose',
        bg: 'bg-pink-500',
        text: 'text-pink-500',
        hover: 'hover:bg-pink-600',
        ring: 'ring-pink-500',
        hex: '#ec4899',
        light: '#f472b6',
        dark: '#db2777'
    },
    green: {
        name: 'Vert',
        bg: 'bg-green-500',
        text: 'text-green-500',
        hover: 'hover:bg-green-600',
        ring: 'ring-green-500',
        hex: '#10b981',
        light: '#34d399',
        dark: '#059669'
    },
    yellow: {
        name: 'Jaune',
        bg: 'bg-yellow-500',
        text: 'text-yellow-500',
        hover: 'hover:bg-yellow-600',
        ring: 'ring-yellow-500',
        hex: '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706'
    },
    purple: {
        name: 'Violet',
        bg: 'bg-purple-500',
        text: 'text-purple-500',
        hover: 'hover:bg-purple-600',
        ring: 'ring-purple-500',
        hex: '#8b5cf6',
        light: '#a78bfa',
        dark: '#7c3aed'
    },
    orange: {
        name: 'Orange',
        bg: 'bg-orange-500',
        text: 'text-orange-500',
        hover: 'hover:bg-orange-600',
        ring: 'ring-orange-500',
        hex: '#f97316',
        light: '#fb923c',
        dark: '#ea580c'
    }
};

// Icônes disponibles pour les projets
export const PROJECT_ICONS = {
    palette: { icon: Palette, name: 'Palette' },
    megaphone: { icon: Megaphone, name: 'Mégaphone' },
    code: { icon: Code, name: 'Code' },
    shield: { icon: Shield, name: 'Bouclier' },
    file: { icon: FileText, name: 'Document' },
    rocket: { icon: Rocket, name: 'Fusée' },
    users: { icon: Users, name: 'Utilisateurs' },
    settings: { icon: Settings, name: 'Paramètres' },
    calendar: { icon: Calendar, name: 'Calendrier' },
    dashboard: { icon: LayoutDashboard, name: 'Dashboard' },
    folder: { icon: FolderKanban, name: 'Dossier' },
    check: { icon: CheckSquare, name: 'Check' }
};

// Niveaux de priorité
export const PRIORITIES = {
    basse: {
        name: 'Basse',
        value: 'basse',
        color: 'text-gray-400',
        bg: 'bg-gray-500/10',
        order: 1
    },
    moyenne: {
        name: 'Moyenne',
        value: 'moyenne',
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        order: 2
    },
    haute: {
        name: 'Haute',
        value: 'haute',
        color: 'text-orange-400',
        bg: 'bg-orange-500/10',
        order: 3
    },
    urgente: {
        name: 'Urgente',
        value: 'urgente',
        color: 'text-red-400',
        bg: 'bg-red-500/10',
        order: 4
    }
};

// Statuts de projet
export const PROJECT_STATUS = {
    ACTIF: {
        name: 'Actif',
        value: 'ACTIF',
        color: 'text-green-400',
        bg: 'bg-green-500/20',
        badge: 'bg-green-500/10 text-green-400'
    },
    PLANIFICATION: {
        name: 'Planification',
        value: 'PLANIFICATION',
        color: 'text-blue-400',
        bg: 'bg-blue-500/20',
        badge: 'bg-blue-500/10 text-blue-400'
    },
    TERMINÉ: {
        name: 'Terminé',
        value: 'TERMINÉ',
        color: 'text-gray-400',
        bg: 'bg-gray-500/20',
        badge: 'bg-gray-500/10 text-gray-400'
    },
    URGENT: {
        name: 'Urgent',
        value: 'URGENT',
        color: 'text-red-400',
        bg: 'bg-red-500/20',
        badge: 'bg-red-500/10 text-red-400'
    }
};

// Navigation de la sidebar
export const SIDEBAR_NAVIGATION = [
    {
        name: 'Tableau de bord',
        href: '/',
        icon: LayoutDashboard,
        active: true
    },
    {
        name: 'Projets',
        href: '/projects',
        icon: FolderKanban,
        active: false
    },
    {
        name: 'Calendrier',
        href: '/calendar',
        icon: Calendar,
        active: false
    },
    {
        name: 'Équipe',
        href: '/team',
        icon: Users,
        active: false
    },
    {
        name: 'Paramètres',
        href: '/settings',
        icon: Settings,
        active: false
    }
];

// Options pour le dropdown de priorité
export const PRIORITY_OPTIONS = [
    { label: 'Basse', value: 'basse' },
    { label: 'Moyenne', value: 'moyenne' },
    { label: 'Haute', value: 'haute' },
    { label: 'Urgente', value: 'urgente' }
];

// Options pour le dropdown de statut
export const STATUS_OPTIONS = [
    { label: 'Actif', value: 'ACTIF' },
    { label: 'Planification', value: 'PLANIFICATION' },
    { label: 'Terminé', value: 'TERMINÉ' },
    { label: 'Urgent', value: 'URGENT' }
];

// Durées de focus par défaut (en minutes)
export const FOCUS_DURATIONS = {
    short: { label: '25 min', value: 25 },
    medium: { label: '45 min', value: 45 },
    long: { label: '1h 30', value: 90 },
    veryLong: { label: '2h 30', value: 150 }
};

// Messages de motivation
export const MOTIVATION_MESSAGES = [
    "Excellent travail ! 🎉",
    "Continue comme ça ! 💪",
    "Tu es sur la bonne voie ! 🚀",
    "Impressionnant ! ⭐",
    "Bravo pour ta productivité ! 🏆"
];

// Couleurs pour le graphique de productivité
export const CHART_COLORS = {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    grid: '#1e293b'
};

// Limites et valeurs par défaut
export const DEFAULTS = {
    tasksPerPage: 20,
    projectsPerPage: 12,
    maxTaskNameLength: 100,
    maxProjectNameLength: 50,
    maxDescriptionLength: 500,
    focusTimeDefault: 25, // minutes
    productivityThreshold: 70, // pourcentage
    weeklyGoal: 40 // tâches par semaine
};

// Filtres de projets
export const PROJECT_FILTERS = {
    all: { label: 'Tous', value: 'all' },
    active: { label: 'Actifs', value: 'ACTIF' },
    planning: { label: 'Planification', value: 'PLANIFICATION' },
    completed: { label: 'Terminés', value: 'TERMINÉ' },
    urgent: { label: 'Urgents', value: 'URGENT' }
};

// Tris disponibles
export const SORT_OPTIONS = {
    date: { label: 'Date de modification', value: 'lastModified' },
    name: { label: 'Nom', value: 'name' },
    progress: { label: 'Progression', value: 'progress' },
    priority: { label: 'Priorité', value: 'priority' }
};