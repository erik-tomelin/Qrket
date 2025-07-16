import React, { useState } from 'react';
import { Search, Filter, Download, Trash2 } from 'lucide-react';
import { QRCodeData, SOCIAL_NETWORKS } from '../types';
import { QRCodeCard } from './QRCodeCard';

interface QRCodeGalleryProps {
  qrCodes: QRCodeData[];
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
}

export const QRCodeGallery: React.FC<QRCodeGalleryProps> = ({
  qrCodes,
  onDelete,
  onBulkDelete
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('all');
  const [selectedQRCodes, setSelectedQRCodes] = useState<string[]>([]);

  const filteredQRCodes = qrCodes.filter(qr => {
    const matchesSearch = qr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (qr.description && qr.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesNetwork = selectedNetwork === 'all' || 
                          qr.network.name === SOCIAL_NETWORKS[selectedNetwork]?.name;
    
    return matchesSearch && matchesNetwork;
  });

  const handleSelectAll = () => {
    if (selectedQRCodes.length === filteredQRCodes.length) {
      setSelectedQRCodes([]);
    } else {
      setSelectedQRCodes(filteredQRCodes.map(qr => qr.id));
    }
  };

  const handleBulkDownload = () => {
    selectedQRCodes.forEach(id => {
      const qrCode = qrCodes.find(qr => qr.id === id);
      if (qrCode) {
        const svg = document.querySelector(`[data-qr-id="${id}"] svg`);
        if (svg) {
          const svgData = new XMLSerializer().serializeToString(svg);
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const img = new Image();

          canvas.width = 512;
          canvas.height = 512;

          img.onload = () => {
            if (ctx) {
              ctx.fillStyle = "white";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              
              const link = document.createElement("a");
              link.download = `qr-${qrCode.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
              link.href = canvas.toDataURL();
              link.click();
            }
          };

          img.src = "data:image/svg+xml;base64," + btoa(svgData);
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Galeria de QR Codes</h2>
              <p className="text-gray-600 mt-1">
                {qrCodes.length} QR codes criados • {filteredQRCodes.length} exibidos
              </p>
            </div>

            <div className="flex items-center space-x-2">
              {selectedQRCodes.length > 0 && (
                <div className="flex items-center space-x-2 mr-4">
                  <button
                    onClick={handleBulkDownload}
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download ({selectedQRCodes.length})</span>
                  </button>
                  <button
                    onClick={() => onBulkDelete(selectedQRCodes)}
                    className="flex items-center space-x-1 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Excluir ({selectedQRCodes.length})</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por título, URL ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[160px]"
              >
                <option value="all">Todas as redes</option>
                {Object.entries(SOCIAL_NETWORKS).map(([key, network]) => (
                  <option key={key} value={key}>
                    {network.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk selection */}
          {filteredQRCodes.length > 0 && (
            <div className="flex items-center mt-4">
              <label className="flex items-center space-x-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={selectedQRCodes.length === filteredQRCodes.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>
                  {selectedQRCodes.length === filteredQRCodes.length
                    ? 'Desselecionar todos'
                    : 'Selecionar todos'
                  }
                </span>
              </label>
            </div>
          )}
        </div>

        <div className="p-6">
          {filteredQRCodes.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredQRCodes.map(qrCode => (
                <div key={qrCode.id} className="relative">
                  <label className="absolute top-4 left-4 z-10">
                    <input
                      type="checkbox"
                      checked={selectedQRCodes.includes(qrCode.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedQRCodes([...selectedQRCodes, qrCode.id]);
                        } else {
                          setSelectedQRCodes(selectedQRCodes.filter(id => id !== qrCode.id));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <QRCodeCard
                    qrCode={qrCode}
                    onDelete={onDelete}
                  />
                </div>
              ))}
            </div>
          ) : qrCodes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Filter className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum QR Code encontrado
              </h3>
              <p className="text-gray-600 mb-6">
                Comece criando seu primeiro QR code personalizado
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum resultado encontrado
              </h3>
              <p className="text-gray-600">
                Tente ajustar os filtros ou termos de busca
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};