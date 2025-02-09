export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
    points: number;
    profilePhoto: string;
  }
  
  export interface DonationItem {
    id: string;
    title: string;
    description: string;
    category: 'food' | 'clothes' | 'accessories' | 'others';
    donorId: string;
    donorName: string;
    imageUrl: string;
    status: 'available' | 'claimed';
    createdAt: Date;
  }