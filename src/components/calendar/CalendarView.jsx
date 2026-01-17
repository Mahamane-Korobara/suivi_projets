"use client";
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useProjects } from '@/hooks/useProjects';
import { PROJECT_COLORS } from '@/lib/constants';

const CalendarView = () => {
  const { projects } = useProjects();

  // 1. Transformation des données JSON en événements FullCalendar
  const events = projects.map(project => {
    // FullCalendar exclut le jour de fin (exclusive), donc pour un projet
    // finissant le 17, il faut dire au calendrier de s'arrêter le 18 
    // pour que la case du 17 soit colorée.
    const endDate = new Date(project.endDate);
    endDate.setDate(endDate.getDate() + 1);

    return {
      id: project.id,
      title: project.name,
      start: project.startDate,
      end: endDate.toISOString().split('T')[0],
      backgroundColor: 'transparent', 
      borderColor: 'transparent',
      allDay: true,
      extendedProps: {
        colorKey: project.color
      }
    };
  });

  return (
    <div className="calendar-container bg-[#0d0f14] p-6 rounded-2xl border border-gray-800 h-full no-scrollbar">
      <style jsx global>{`
        /* --- Style Global du Calendrier --- */
        .fc { 
          --fc-border-color: #1f2937; 
          --fc-page-bg-color: transparent; 
          color: #9ca3af; 
          font-family: inherit;
        }
        
        /* Suppression des bordures extérieures doubles */
        .fc-theme-standard td, .fc-theme-standard th { border: 1px solid #1f2937; }
        .fc-theme-standard .fc-scrollgrid { border: none; }

        /* Header (Mois, Année) */
        .fc-toolbar-title { font-size: 1.25rem !important; font-weight: 700; color: white; text-transform: capitalize; }
        
        /* Boutons de navigation */
        .fc-button-primary {
          background-color: #1f2937 !important;
          border: none !important;
          font-size: 0.8rem !important;
          text-transform: capitalize !important;
        }
        .fc-button-primary:hover { background-color: #374151 !important; }
        .fc-button-active { background-color: #2563eb !important; }

        /* En-tête des jours (SUN, MON...) */
        .fc-col-header-cell { padding: 12px 0 !important; background: #111827; }
        .fc-col-header-cell-cushion { 
          font-size: 10px; 
          font-weight: 800; 
          letter-spacing: 0.1em; 
          color: #4b5563; 
          text-transform: uppercase; 
        }

        /* Numéros de jours */
        .fc-daygrid-day-number { font-size: 12px; padding: 8px !important; color: #6b7280; }

        /* --- BORDURE BLEUE SUR AUJOURD'HUI --- */
        .fc .fc-day-today { 
          background: rgba(37, 99, 235, 0.05) !important; 
          outline: 2px solid #2563eb !important;
          outline-offset: -2px;
          z-index: 2;
        }
        .fc .fc-day-today .fc-daygrid-day-number { color: #2563eb; font-weight: 800; }

        /* --- STYLE DES PROJETS (BADGES) --- */
        .fc-event {
          border: none !important;
          background: transparent !important;
          padding: 1px 4px !important;
          cursor: pointer;
        }
        
        .fc-event-main {
          padding: 4px 10px !important;
          border-radius: 4px !important;
          font-size: 11px !important;
          font-weight: 700 !important;
        }

        /* Couleurs dynamiques basées sur PROJECT_COLORS */
        ${Object.entries(PROJECT_COLORS).map(([key, val]) => `
          .project-event-${key} .fc-event-main {
            background-color: ${val.hex}25 !important; /* Fond avec opacité */
            color: ${val.hex} !important;
            border-left: 4px solid ${val.hex} !important; /* Bordure gauche épaisse */
          }
        `).join('')}

        /* Cacher la scrollbar interne si nécessaire */
        .fc-scroller { overflow: hidden !important; }
      `}</style>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="fr"
        headerToolbar={{
          left: 'title',
          center: '',
          right: 'prev,next today'
        }}
        events={events}
        eventClassNames={(arg) => [`project-event-${arg.event.extendedProps.colorKey}`]}
        height="auto"
        firstDay={0} // Dimanche comme premier jour
        eventClick={(info) => {
          console.log("ID du projet cliqué :", info.event.id);
          // Ici tu pourras ouvrir ta modal d'édition
        }}
      />
    </div>
  );
};

export default CalendarView;