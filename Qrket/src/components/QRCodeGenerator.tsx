import React, { useState } from 'react';
import { Plus, ExternalLink } from 'lucide-react';
import { QRCodeData, SOCIAL_NETWORKS } from '../types';
import { QRCodePreview } from './QRCodePreview';
import { SocialNetworkIcon } from './SocialNetworkIcon';

interface QRCodeGeneratorProps {
  onSave: (qrCode: QRCodeData) => void;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    network: 'website',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.url) return;

    const qrCode: QRCodeData = {
      id: crypto.randomUUID(),
      title: formData.title,
      url: formData.url,
      network: SOCIAL_NETWORKS[formData.network],
      createdAt: new Date().toISOString(),
      description: formData.description
    };

    onSave(qrCode);
    
    // Reset form
    setFormData({
      title: '',
      url: '',
      network: 'website',
      description: ''
    });
  };

  const selectedNetwork = SOCIAL_NETWORKS[formData.network];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Criar Novo QR Code</h2>
          <p className="text-gray-600">Gere QR codes personalizados para suas redes sociais e links</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título do QR Code
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Ex: Instagram da Empresa"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rede Social
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(SOCIAL_NETWORKS).map(([key, network]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFormData({ ...formData, network: key })}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        formData.network === key
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <SocialNetworkIcon
                        icon={network.icon}
                        className={`h-6 w-6 mx-auto mb-1 ${
                          formData.network === key ? 'text-blue-600' : 'text-gray-600'
                        }`}
                      />
                      <div className="text-xs font-medium text-gray-700">
                        {network.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL da Rede Social
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder={selectedNetwork.placeholder}
                    required
                  />
                  <ExternalLink className="absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição (opcional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  rows={3}
                  placeholder="Adicione uma descrição para este QR code..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Plus className="h-5 w-5 inline mr-2" />
                Gerar QR Code
              </button>
            </form>
          </div>

          {/* Preview */}
          <div className="lg:pl-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              {formData.url ? (
                <div className="space-y-4">
                  <QRCodePreview
                    value={formData.url}
                    size={200}
                    className="mx-auto"
                  />
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <SocialNetworkIcon
                        icon={selectedNetwork.icon}
                        className="h-5 w-5"
                        style={{ color: selectedNetwork.color }}
                      />
                      <span className="font-medium text-gray-900">
                        {formData.title || 'Título do QR Code'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {selectedNetwork.name}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400">
                  <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-sm">Preencha a URL para ver o preview</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};