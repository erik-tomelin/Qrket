import React from 'react';
import { Download, Copy, ExternalLink, Calendar, Trash2 } from 'lucide-react';
import { QRCodeData } from '../types';
import { QRCodePreview } from './QRCodePreview';
import { SocialNetworkIcon } from './SocialNetworkIcon';

interface QRCodeCardProps {
  qrCode: QRCodeData;
  onDelete: (id: string) => void;
}

export const QRCodeCard: React.FC<QRCodeCardProps> = ({ qrCode, onDelete }) => {
  const handleDownload = () => {
    const svg = document.querySelector(`[data-qr-id="${qrCode.id}"] svg`);
    if (!svg) return;

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
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(qrCode.url);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <SocialNetworkIcon
              icon={qrCode.network.icon}
              className="h-6 w-6"
              style={{ color: qrCode.network.color }}
            />
            <div>
              <h3 className="font-semibold text-gray-900">{qrCode.title}</h3>
              <p className="text-sm text-gray-500">{qrCode.network.name}</p>
            </div>
          </div>
          <button
            onClick={() => onDelete(qrCode.id)}
            className="text-gray-400 hover:text-red-600 transition-colors p-1"
            title="Excluir QR Code"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
          <div className="flex-shrink-0" data-qr-id={qrCode.id}>
            <QRCodePreview value={qrCode.url} size={120} />
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">URL:</p>
              <p className="text-sm text-gray-600 break-all">{qrCode.url}</p>
            </div>

            {qrCode.description && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Descrição:</p>
                <p className="text-sm text-gray-600">{qrCode.description}</p>
              </div>
            )}

            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              Criado em {formatDate(qrCode.createdAt)}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={handleDownload}
            className="flex items-center space-x-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
          
          <button
            onClick={handleCopyUrl}
            className="flex items-center space-x-1 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
          >
            <Copy className="h-4 w-4" />
            <span>Copiar URL</span>
          </button>
          
          <a
            href={qrCode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Abrir</span>
          </a>
        </div>
      </div>
    </div>
  );
};