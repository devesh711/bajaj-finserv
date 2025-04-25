import React from 'react';
import { Doctor } from '../types';
import { User, Video, Building, Award, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div 
      data-testid="doctor-card"
      className="bg-white shadow rounded-lg overflow-hidden transition hover:shadow-md"
    >
      <div className="p-6">
        <div className="flex flex-col sm:flex-row">
          <div className="flex-shrink-0 flex justify-center mb-4 sm:mb-0">
            <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
              {doctor.photo ? (
                <img 
                  src={doctor.photo} 
                  alt={doctor.name} 
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <User size={40} className="text-blue-500" />
              )}
            </div>
          </div>
          
          <div className="sm:ml-6 flex-1">
            <h3 
              data-testid="doctor-name"
              className="text-lg font-medium text-gray-900"
            >
              {doctor.name}
            </h3>
            
            <p 
              data-testid="doctor-specialty"
              className="mt-1 text-sm text-gray-500"
            >
              {doctor.specialties.join(', ')}
            </p>
            
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div 
                data-testid="doctor-experience"
                className="flex items-center text-sm text-gray-700"
              >
                <Award className="h-4 w-4 text-blue-500 mr-1" />
                <span>{doctor.experience} years experience</span>
              </div>
              
              <div 
                data-testid="doctor-fee"
                className="flex items-center text-sm text-gray-700"
              >
                <span>₹{doctor.fees} consultation fee</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-700">
                {doctor.consultationMode.includes('Video Consult') && (
                  <div className="mr-2 flex items-center">
                    <Video className="h-4 w-4 text-blue-500 mr-1" />
                    <span>Video</span>
                  </div>
                )}
                {doctor.consultationMode.includes('In Clinic') && (
                  <div className="flex items-center">
                    <Building className="h-4 w-4 text-blue-500 mr-1" />
                    <span>Clinic</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 flex-shrink-0 sm:flex sm:flex-col sm:items-end">
            <Link 
              to={`/doctor/${doctor.id}`}
              state={{ doctor }}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;