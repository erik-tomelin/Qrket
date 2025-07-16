export interface QRCodeData {
  id: string;
  title: string;
  url: string;
  network: SocialNetwork;
  createdAt: string;
  description?: string;
}

export interface SocialNetwork {
  name: string;
  icon: string;
  color: string;
  placeholder: string;
}

export const SOCIAL_NETWORKS: Record<string, SocialNetwork> = {
  instagram: {
    name: 'Instagram',
    icon: 'Instagram',
    color: '#E4405F',
    placeholder: 'https://instagram.com/usuario'
  },
  facebook: {
    name: 'Facebook',
    icon: 'Facebook',
    color: '#1877F2',
    placeholder: 'https://facebook.com/pagina'
  },
  twitter: {
    name: 'Twitter/X',
    icon: 'Twitter',
    color: '#1DA1F2',
    placeholder: 'https://twitter.com/usuario'
  },
  linkedin: {
    name: 'LinkedIn',
    icon: 'Linkedin',
    color: '#0A66C2',
    placeholder: 'https://linkedin.com/in/usuario'
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: 'MessageCircle',
    color: '#25D366',
    placeholder: 'https://wa.me/5511999999999'
  },
  youtube: {
    name: 'YouTube',
    icon: 'Youtube',
    color: '#FF0000',
    placeholder: 'https://youtube.com/c/canal'
  },
  tiktok: {
    name: 'TikTok',
    icon: 'Music',
    color: '#000000',
    placeholder: 'https://tiktok.com/@usuario'
  },
  website: {
    name: 'Website',
    icon: 'Globe',
    color: '#6B7280',
    placeholder: 'https://meusite.com.br'
  }
};