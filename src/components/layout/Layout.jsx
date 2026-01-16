"use client"; // Obligatoire pour utiliser useState
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import CreateProjectModal from '@/components/layout/CreateProjectModal';

const Layout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0a0b0d]">
      {/* On passe la fonction d'ouverture à la Sidebar */}
      <Sidebar onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Rendu de la Modal */}
      <CreateProjectModal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Layout;