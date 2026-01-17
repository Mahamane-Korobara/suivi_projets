"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  Calendar, 
  Users, 
  Settings, 
  Zap,
  Plus
} from 'lucide-react';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';

// Ajout de la prop onOpenModal
const Sidebar = ({ onOpenModal }) => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Tableau de bord', icon: LayoutDashboard, path: '/' },
    { name: 'Projets', icon: Briefcase, path: '/projects' },
    { name: 'Calendrier', icon: Calendar, path: '/calendar' },
    // { name: 'Équipe', icon: Users, path: '/team' },
    // { name: 'Paramètres', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-[#0d0f12] border-r border-gray-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Zap size={18} className="text-white fill-current" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-white leading-none">Productivité Pro</h1>
          <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Espace de travail</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
              `}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 space-y-4">

        {/* Action au clic pour ouvrir la modal */}
        <Button 
          variant="primary" 
          icon={Plus} 
          className="w-full py-3"
          onClick={onOpenModal}
        >
          Nouvelle tâche
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;