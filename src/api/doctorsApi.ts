import { Doctor } from '../types';

export async function fetchDoctors(): Promise<Doctor[]> {
  try {
    const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Map the new schema to your Doctor type
    return data.map((doctor: any) => {
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
        // Transform the specialities array of objects to an array of strings
        specialties: Array.isArray(doctor.specialities)
          ? doctor.specialities.map((sp: any) => sp.name)
          : [],
        fees,
        experience,
        languages: doctor.languages || [],
        clinic: doctor.clinic || null,
        consultationMode,
      };
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
}