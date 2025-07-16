import React from 'react';
import QRCode from 'react-qr-code';

interface QRCodePreviewProps {
  value: string;
  size?: number;
  className?: string;
}

export const QRCodePreview: React.FC<QRCodePreviewProps> = ({ 
  value, 
  size = 256, 
  className = '' 
}) => {
  return (
    <div className={`bg-white p-4 rounded-lg inline-block shadow-sm ${className}`}>
      <QRCode
        value={value}
        size={size}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
};