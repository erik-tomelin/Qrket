import React, { useState } from 'react';
import { ExternalLink, Copy, Share2, Eye, Building2, MapPin, Mail, Phone, Globe } from 'lucide-react';
import { QRCodeData } from '../types';
import { SocialNetworkIcon } from './SocialNetworkIcon';

interface LinkTreePageProps {
  qrCodes: QRCodeData[];
}

export const LinkTreePage: React.FC<LinkTreePageProps> = ({ qrCodes }) => {
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Minha Empresa',
    description: 'Conecte-se conosco através de nossas redes sociais',
    avatar: '',
    location: 'São Paulo, Brasil',
    email: 'contato@minhaempresa.com.br',
    phone: '+55 11 99999-9999',
    website: 'https://minhaempresa.com.br'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [viewCount, setViewCount] = useState(1247);

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: companyInfo.name,
          text: companyInfo.description,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
      }
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  const handleLinkClick = (url: string) => {
    setViewCount(prev => prev + 1);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Eye className="h-4 w-4" />
            <span>{viewCount.toLocaleString()} visualizações</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleShare}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              title="Compartilhar"
            >
              <Share2 className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              {isEditing ? 'Salvar' : 'Editar'}
            </button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center">
              <Building2 className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                className="w-full text-center text-xl font-bold border-b-2 border-gray-200 focus:border-blue-500 outline-none bg-transparent"
              />
              <textarea
                value={companyInfo.description}
                onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
                className="w-full text-center text-gray-600 border-b-2 border-gray-200 focus:border-blue-500 outline-none bg-transparent resize-none"
                rows={2}
              />
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{companyInfo.name}</h1>
              <p className="text-gray-600 mb-4">{companyInfo.description}</p>
            </>
          )}

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{companyInfo.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail className="h-4 w-4" />
              <span className="truncate">{companyInfo.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{companyInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Globe className="h-4 w-4" />
              <span className="truncate">{companyInfo.website}</span>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="space-y-4">
          {qrCodes.length > 0 ? (
            qrCodes.map((qrCode) => (
              <div
                key={qrCode.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${qrCode.network.color}15` }}
                    >
                      <SocialNetworkIcon
                        icon={qrCode.network.icon}
                        className="h-6 w-6"
                        style={{ color: qrCode.network.color }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{qrCode.title}</h3>
                      <p className="text-sm text-gray-500">{qrCode.network.name}</p>
                      {qrCode.description && (
                        <p className="text-xs text-gray-400 mt-1 truncate">{qrCode.description}</p>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCopyLink(qrCode.url)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copiar link"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleLinkClick(qrCode.url)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Abrir link"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Click area */}
                <button
                  onClick={() => handleLinkClick(qrCode.url)}
                  className="w-full p-4 bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-200 border-t border-gray-100"
                >
                  <div className="flex items-center justify-center space-x-2 text-sm font-medium text-gray-700">
                    <span>Acessar {qrCode.network.name}</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <ExternalLink className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum link cadastrado
              </h3>
              <p className="text-gray-600 mb-4">
                Comece criando QR codes para suas redes sociais
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Criado com QR Code Generator
          </p>
        </div>
      </div>
    </div>
  );
};