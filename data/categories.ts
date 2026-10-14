import type { Category } from '@/types';

export const categories: { slug: Category; name: string; description: string; count: number }[] = [
  { slug: 'gaming', name: 'Gaming', description: 'High-refresh displays, discrete GPUs, tuned thermals.', count: 8 },
  { slug: 'business', name: 'Business', description: 'All-day battery, secure platforms, enterprise-ready.', count: 6 },
  { slug: 'student', name: 'Student', description: 'Light, portable, built for study and streaming.', count: 5 },
  { slug: 'creator', name: 'Creator', description: 'Color-accurate displays for design, photo, and video.', count: 5 },
  { slug: 'workstation', name: 'Workstation', description: 'ISV-certified machines for CAD, 3D, and data.', count: 4 },
  { slug: 'accessories', name: 'Accessories', description: 'Docks, mice, bags, and essentials.', count: 6 },
];