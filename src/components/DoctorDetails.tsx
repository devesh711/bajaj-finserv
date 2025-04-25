import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Doctor } from '../types';
import { fetchDoctors } from '../api/doctorsApi';
import { ArrowLeft, User, Video, Building, Award } from 'lucide-react';

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // If the doctor object is passed via route state, use it; otherwise, fetch and find it.
  useEffect(() => {
    if (location.state?.doctor) {
      setDoctor(location.state.doctor);
      setLoading(false);
    } else {
      const loadDoctor = async () => {
        try {
          const doctors = await fetchDoctors();
          const found = doctors.find((d) => String(d.id) === id);
          if (!found) {
            setError('Doctor not found.');
          } else {
            setDoctor(found);
          }
        } catch (err) {
          setError('Failed to load doctor details.');
        } finally {
          setLoading(false);
        }
      };
      loadDoctor();
    }
  }, [id, location.state]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 animate-fadeIn">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 animate-fadeIn">
        <p className="text-red-500 text-lg">{error || 'Doctor not found.'}</p>
        <Link to="/" className="mt-6 text-blue-600 hover:underline flex items-center">
          <ArrowLeft className="mr-1" /> Back to Doctors List
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition transform hover:-translate-y-1 hover:shadow-xl duration-300">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-blue-50 flex items-center justify-center p-6">
            {doctor.photo ? (
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="rounded-full object-cover h-40 w-40"
              />
            ) : (
              <div className="flex flex-col items-center text-blue-500">
                <User className="h-10 w-10 mb-2" />
                <span className="text-lg">No Image</span>
              </div>
            )}
          </div>
          <div className="md:w-2/3 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Dr. {doctor.name}
            </h2>
            <p className="text-gray-600 mb-4">{doctor.doctor_introduction}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="flex items-center">
                  <Award className="h-5 w-5 text-yellow-500 mr-1" />
                  <span>
                    <span className="font-medium">Experience:</span> {doctor.experience} years
                  </span>
                </p>
                <p className="mt-2">
                  <span className="font-medium">Fees:</span> ₹{doctor.fees}
                </p>
                <p className="mt-2 flex items-center">
                  <span className="font-medium mr-1">Consultation Modes:</span>
                  {doctor.consultationMode.map((mode, index) => (
                    <span key={index} className="flex items-center mr-2">
                      {mode === 'Video Consult' && <Video className="h-5 w-5 text-blue-500 mr-1" />}
                      {mode === 'In Clinic' && <Building className="h-5 w-5 text-blue-500 mr-1" />}
                      <span>{mode}</span>
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">Specialties:</span> {doctor.specialties.join(', ')}
                </p>
                {doctor.languages && doctor.languages.length > 0 && (
                  <p className="mt-2">
                    <span className="font-medium">Languages:</span> {doctor.languages.join(', ')}
                  </p>
                )}
                {doctor.clinic && (
                  <div className="mt-4">
                    <p className="flex items-center">
                      <Building className="h-5 w-5 text-blue-500 mr-1" />
                      <span className="font-medium">Clinic Information:</span>
                    </p>
                    <p>{doctor.clinic.name}</p>
                    <p>
                      {doctor.clinic.address.address_line1}, {doctor.clinic.address.locality}, {doctor.clinic.address.city}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6">
              <Link to="/" className="text-blue-600 hover:underline flex items-center text-lg">
                <ArrowLeft className="mr-1" /> Back to Doctors List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;