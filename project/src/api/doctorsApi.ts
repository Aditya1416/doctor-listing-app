import { Doctor } from '../types';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
};

export const getAllSpecialties = (doctors: Doctor[]): string[] => {
  if (!Array.isArray(doctors) || !doctors.length) {
    return [];
  }
  
  const specialtiesSet = new Set<string>();
  
  doctors.forEach(doctor => {
    if (Array.isArray(doctor.specialties)) {
      doctor.specialties.forEach(specialty => {
        specialtiesSet.add(specialty);
      });
    }
  });
  
  return Array.from(specialtiesSet).sort();
};