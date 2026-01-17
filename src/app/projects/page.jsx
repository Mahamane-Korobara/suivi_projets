"use client";

import React, { useState, useEffect } from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import { useProjects } from '@/hooks/useProjects';
import Header from '@/components/layout/Header';

export default function ProjectsPage() {
  const { projects } = useProjects();
  const [mounted, setMounted] = useState(false);

  // On attend que le composant soit monté côté client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Si on est encore sur le serveur, on affiche un squelette ou rien
  if (!mounted) {
    return (
      <div className="space-y-6">
        <Header title="Mes Projets" subtitle="Chargement..." />
        <div className="animate-pulse space-y-4">
          <div className="h-24 bg-gray-800/50 rounded-2xl w-full" />
          <div className="h-24 bg-gray-800/50 rounded-2xl w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header 
        title="Mes Projets" 
        subtitle="Rien de mieux que de faire son propre app de productiviter pour suivre l'evolution de ces projets" 
      />

      <div className="space-y-4">
        {projects && projects.length > 0 ? (
          projects.map(item => (
            <ProjectCard key={item.id} project={item} />
          ))
        ) : (
          <div className="text-center py-20 bg-[#0d0f12] rounded-2xl border border-dashed border-gray-800">
            <p className="text-gray-500">Aucun projet trouvé. Commencez par en créer un !</p>
          </div>
        )}
      </div>
    </div>
  );
}