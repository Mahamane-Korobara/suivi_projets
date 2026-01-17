"use client";
import React, { useMemo, useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import CircularProgress from '@/components/ui/CircularProgress';
import ProductivityChart from '@/components/dashboard/ProductivityChart';
import FocusCard from '@/components/ui/FocusCard';
import { useProjects } from '@/hooks/useProjects';

export default function DashboardPage() {
  const { projects } = useProjects();
  const [mounted, setMounted] = useState(false);

  // Éviter les erreurs d'hydratation (SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Calcul des statistiques globales pour les cercles de progression
  const stats = useMemo(() => {
    const allTasks = projects.flatMap(p => p.tasks || []);
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(t => t.completed).length;

    // Taux de complétion des tâches (Objectifs du jour)
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Santé des projets (Projets actifs vs Total)
    const activeProjects = projects.filter(p => p.status === 'ACTIF').length;
    const totalProjects = projects.length;
    const projectHealth = totalProjects > 0 ? Math.round((activeProjects / totalProjects) * 100) : 0;

    return {
      completionRate,
      completedTasks,
      totalTasks,
      activeProjects,
      totalProjects,
      projectHealth
    };
  }, [projects]);

  // 2. Calcul de la tâche prioritaire pour la FocusCard
  const nextTaskFocus = useMemo(() => {
    // On cherche le premier projet qui n'est pas terminé et qui a des tâches restantes
    const focusProject = projects.find(p =>
      p.status !== 'TERMINÉ' &&
      p.tasks?.some(t => !t.completed)
    );

    if (!focusProject) return null;

    // On récupère la première tâche non complétée de ce projet
    const nextTask = focusProject.tasks.find(t => !t.completed);

    if (!nextTask) return null;

    return {
      title: nextTask.text,
      project: focusProject.name,
      // Ici, on utilise le temps estimé de la TÂCHE et non du projet
      estimatedTime: nextTask.estimatedTime || "Non défini",
    };
  }, [projects]);

  // Ne rien afficher tant que le client n'a pas monté le composant
  if (!mounted) return null;

  return (
    <div className="space-y-8">
      <Header
        title="Bonsoir, Mahamane 👋"
        subtitle="Voici le résumé de votre productivité pour aujourd'hui."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Colonne de gauche (Stats + Graphique) : occupe 3/4 de l'écran sur desktop */}
        <div className="lg:col-span-3 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Objectifs basés sur les tâches terminées */}
            <CircularProgress
              value={stats.completionRate}
              label="Objectifs du jour"
              subtext={`${stats.completedTasks}/${stats.totalTasks} tâches terminées`}
              color="#2563eb"
            />

            {/* 2. Focus hebdomadaire (Progression globale) */}
            <CircularProgress
              value={stats.completionRate}
              label="Focus hebdomadaire"
              subtext="Progression globale"
              color="#10b981"
            />

            {/* 3. Santé des projets (Projets actifs) */}
            <CircularProgress
              value={stats.projectHealth}
              label="Santé des projets"
              subtext={`${stats.activeProjects} projets en cours`}
              color="#f59e0b"
            />
          </div>


        </div>

        {/* Colonne de droite (FocusCard) : occupe 1/4 de l'écran */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-white font-medium text-sm uppercase tracking-wider opacity-50">
            En cours
          </h3>

          {nextTaskFocus ? (
            <FocusCard
              title={nextTaskFocus.title}
              project={nextTaskFocus.project}
              estimatedTime={nextTaskFocus.estimatedTime}
              onStart={() => alert(`Démarrage du chrono pour : ${nextTaskFocus.title}`)}
            />
          ) : (
            <div className="bg-[#121418] border border-gray-800 rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
              <div className="text-3xl mb-4">☕</div>
              <p className="text-gray-400 text-sm">Bravo ! Toutes vos tâches sont terminées pour le moment.</p>
            </div>
          )}
        </div>
        {/* Graphique de tendance de productivité */}
        <div className="w-full lg:col-span-4">
          <ProductivityChart />
        </div>
      </div >
    </div >
  );
}