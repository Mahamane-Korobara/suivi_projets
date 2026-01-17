// src/app/calendrier/page.js
import CalendarView from '@/components/calendar/CalendarView';
import Header from '@/components/layout/Header';

export default function CalendarPage() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <Header 
        title="Calendrier" 
        subtitle="Visualisez la chronologie de vos projets et échéances."
      />
      
      <div className="flex-1 min-h-[600px]">
        <CalendarView />
      </div>
    </div>
  );
}