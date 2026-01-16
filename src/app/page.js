"use client";
import React from 'react';
import Header from '@/components/layout/Header';
import CircularProgress from '@/components/ui/CircularProgress';
import ProductivityChart from '@/components/dashboard/ProductivityChart';
import FocusCard from '@/components/ui/FocusCard';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* 1. Header personnalisé avec le message de bienvenue */}
      <Header
        title="Bonsoir, Mahamane 👋"
        subtitle="Voici le résumé de votre productivité pour aujourd'hui."
      />

      {/* 2. Grille principale du Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Colonne de gauche : Stats et Graphique (3/4 de la largeur) */}
        <div className="lg:col-span-3 space-y-6">

          {/* Section des cercles de progression (StatsCard) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CircularProgress
              value={80}
              label="Objectifs du jour"
              subtext="12/15 tâches complétées"
              color="#2563eb"
            />
            <CircularProgress
              value={65}
              label="Focus hebdomadaire"
              subtext="19h sur 35h prévues"
              color="#10b981"
            />
            <CircularProgress
              value={45}
              label="Projets actifs"
              subtext="Étape 3 sur 7"
              color="#f59e0b"
            />
          </div>

          {/* Graphique de tendance de productivité */}

        </div>

        {/* Colonne de droite : Tâche actuelle et Échéances (1/4 de la largeur) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Composant de la tâche en cours (Bleu) */}
          <FocusCard
            title="Finaliser le projet d'examen"
            project="les pages publiques"
            estimatedTime="3h 30m"
          />
        </div>
      </div>
      <ProductivityChart />
    </div>
  );
}