import React from 'react';
import { QrCode, Building2, Link } from 'lucide-react';

interface HeaderProps {
  activeTab: 'generator' | 'gallery' | 'linktree';
  onTabChange: (tab: 'generator' | 'gallery' | 'linktree') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">QR Code Generator</h1>
              <p className="text-sm text-gray-500">Sistema Empresarial</p>
            </div>
          </div>
          
          <nav className="flex space-x-1">
            <button
              onClick={() => onTabChange('generator')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'generator'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <QrCode className="h-4 w-4 inline mr-2" />
              Gerar QR Code
            </button>
            <button
              onClick={() => onTabChange('gallery')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'gallery'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Galeria
            </button>
            <button
              onClick={() => onTabChange('linktree')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'linktree'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Link className="h-4 w-4 inline mr-2" />
              Linktree
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};