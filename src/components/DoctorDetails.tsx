import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Doctor } from '../types';
import { fetchDoctors } from '../api/doctorsApi';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500">{error || 'Doctor not found.'}</p>
        <Link to="/" className="mt-4 text-blue-500 underline">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 flex justify-center mb-4 md:mb-0">
            <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
              {doctor.photo ? (
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="h-32 w-32 object-cover"
                />
              ) : (
                <div className="text-blue-500">No Image</div>
              )}
            </div>
          </div>
          <div className="md:ml-6 flex-1">
            <h2 className="text-2xl font-bold text-gray-900">Dr. {doctor.name}</h2>
            <p className="mt-2 text-gray-600">{doctor.doctor_introduction}</p>
            <div className="mt-4 space-y-1">
              <p>
                <span className="font-semibold">Experience:</span> {doctor.experience} years
              </p>
              <p>
                <span className="font-semibold">Fees:</span> ₹{doctor.fees}
              </p>
              <p>
                <span className="font-semibold">Specialties:</span> {doctor.specialties.join(', ')}
              </p>
              <p>
                <span className="font-semibold">Consultation Modes:</span> {doctor.consultationMode.join(', ')}
              </p>
              {doctor.languages && doctor.languages.length > 0 && (
                <p>
                  <span className="font-semibold">Languages:</span> {doctor.languages.join(', ')}
                </p>
              )}
              {doctor.clinic && (
                <div className="mt-2">
                  <p className="font-semibold">Clinic Information:</p>
                  <p>{doctor.clinic.name}</p>
                  <p>
                    {doctor.clinic.address.address_line1}, {doctor.clinic.address.locality}, {doctor.clinic.address.city}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Link to="/" className="text-blue-600 hover:underline">
            ← Back to Doctors List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;