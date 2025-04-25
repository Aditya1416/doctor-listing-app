export interface Doctor {
  id: number;
  name: string;
  specialties: string[];
  experience: number;
  fees: number;
  image?: string;
}

export type ConsultationMode = 'Video Consult' | 'In Clinic';

export type SortOption = 'fees' | 'experience';

export interface FilterState {
  search: string;
  consultationMode: ConsultationMode | null;
  specialties: string[];
  sortBy: SortOption | null;
}