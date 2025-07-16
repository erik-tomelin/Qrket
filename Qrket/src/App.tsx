import React, { useState } from 'react';
import { Header } from './components/Header';
import { QRCodeGenerator } from './components/QRCodeGenerator';
import { QRCodeGallery } from './components/QRCodeGallery';
import { LinkTreePage } from './components/LinkTreePage';
import { QRCodeData } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [activeTab, setActiveTab] = useState<'generator' | 'gallery' | 'linktree'>('generator');
  const [qrCodes, setQRCodes] = useLocalStorage<QRCodeData[]>('qr-codes', []);

  const handleSaveQRCode = (qrCode: QRCodeData) => {
    setQRCodes(prev => [qrCode, ...prev]);
    setActiveTab('gallery');
  };

  const handleDeleteQRCode = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este QR Code?')) {
      setQRCodes(prev => prev.filter(qr => qr.id !== id));
    }
  };

  const handleBulkDelete = (ids: string[]) => {
    if (window.confirm(`Tem certeza que deseja excluir ${ids.length} QR Code(s)?`)) {
      setQRCodes(prev => prev.filter(qr => !ids.includes(qr.id)));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {activeTab !== 'linktree' && (
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
      )}
      
      <main className={activeTab !== 'linktree' ? 'py-8' : ''}>
        {activeTab === 'generator' && (
          <QRCodeGenerator onSave={handleSaveQRCode} />
        )}
        
        {activeTab === 'gallery' && (
          <QRCodeGallery
            qrCodes={qrCodes}
            onDelete={handleDeleteQRCode}
            onBulkDelete={handleBulkDelete}
          />
        )}
        
        {activeTab === 'linktree' && (
          <LinkTreePage qrCodes={qrCodes} />
        )}
      </main>
    </div>
  );
}

export default App;