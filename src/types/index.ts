export interface ClinicAddress {
  locality: string;
  city: string;
  address_line1: string;
  location: string;
  logo_url: string;
}

export interface Clinic {
  name: string;
  address: ClinicAddress;
}

export interface Doctor {
  id: number;
  name: string;
  name_initials: string;
  photo: string;
  doctor_introduction: string;
  specialties: string[]; // transformed list of specialty names
  fees: number;
  experience: number;
  languages?: string[];
  clinic?: Clinic | null;
  consultationMode: string[]; // will contain values like 'Video Consult' and/or 'In Clinic'
}

export type ConsultationType = 'Video Consult' | 'In Clinic' | '';
export type SortOption = 'fees' | 'experience' | '';

export interface FilterState {
  searchQuery: string;
  consultationType: ConsultationType;
  specialties: string[];
  sortBy: SortOption;
}