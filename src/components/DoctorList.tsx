import React from 'react';
import { Doctor } from '../types';
import DoctorCard from './DoctorCard';

interface DoctorListProps {
  doctors: Doctor[];
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
  if (doctors.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium text-gray-700">No doctors found</h3>
        <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {doctors.map(doctor => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;