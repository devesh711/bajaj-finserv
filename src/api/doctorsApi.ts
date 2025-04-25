import { Doctor } from '../types';
import dumpedData from '../data/data.json';

function mapDoctor(doctor: any): Doctor {
  const fees =
    doctor.fees && typeof doctor.fees === 'string'
      ? parseInt(doctor.fees.replace(/[^0-9]/g, ''), 10)
      : 0;
  const experience =
    doctor.experience && typeof doctor.experience === 'string'
      ? parseInt(doctor.experience.replace(/\D/g, ''), 10)
      : 0;
  
  const consultationMode: string[] = [];
  if (doctor.video_consult) consultationMode.push('Video Consult');
  if (doctor.in_clinic) consultationMode.push('In Clinic');

  return {
    id: doctor.id,
    name: doctor.name || '',
    name_initials: doctor.name_initials || '',
    photo: doctor.photo || '',
    doctor_introduction: doctor.doctor_introduction || '',
    specialties: Array.isArray(doctor.specialities)
      ? doctor.specialities.map((sp: any) => sp.name)
      : [],
    fees,
    experience,
    languages: doctor.languages || [],
    clinic: doctor.clinic || null,
    consultationMode,
  };
}

export async function fetchDoctors(): Promise<Doctor[]> {
  try {
    const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.map((doctor: any) => mapDoctor(doctor));
  } catch (error) {
    console.error('Error fetching remote data, falling back to dumped data:', error);
    // Fallback to locally dumped data
    return dumpedData.map((doctor: any) => mapDoctor(doctor));
  }
}