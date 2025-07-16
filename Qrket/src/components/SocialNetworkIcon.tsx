import React from 'react';
import { Instagram, Facebook, Twitter, Linkedin, MessageCircle, Youtube, Music, Globe, DivideIcon as LucideIcon } from 'lucide-react';

interface SocialNetworkIconProps {
  icon: string;
  className?: string;
  style?: React.CSSProperties;
}

const iconMap: Record<string, LucideIcon> = {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Youtube,
  Music,
  Globe
};

export const SocialNetworkIcon: React.FC<SocialNetworkIconProps> = ({
  icon,
  className = '',
  style
}) => {
  const IconComponent = iconMap[icon] || Globe;
  
  return <IconComponent className={className} style={style} />;
};