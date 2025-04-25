import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSearchParams } from './hooks/useSearchParams';
import DoctorList from './components/DoctorList';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import DoctorDetails from './components/DoctorDetails';
import { Doctor } from './types';
import { fetchDoctors } from './api/doctorsApi';
import './index.css';
import { Stethoscope } from 'lucide-react';

const Home: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { 
    searchQuery, 
    consultationType, 
    specialties, 
    sortBy, 
    updateSearchParams 
  } = useSearchParams();

  // Fetch doctors data
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        const data = await fetchDoctors();
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (err) {
        setError('Failed to fetch doctors. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDoctors();
  }, []);

  // Apply filters whenever filter state changes
  useEffect(() => {
    if (doctors.length === 0) return;
    let result = [...doctors];

    // Apply name search filter
    if (searchQuery) {
      result = result.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Apply consultation type filter
    if (consultationType) {
      result = result.filter(doctor => {
        if (consultationType === 'Video Consult') {
          return doctor.consultationMode.includes('Video Consult');
        } else if (consultationType === 'In Clinic') {
          return doctor.consultationMode.includes('In Clinic');
        }
        return true;
      });
    }
    // Apply specialty filters
    if (specialties.length > 0) {
      result = result.filter(doctor =>
        doctor.specialties.some(specialty => specialties.includes(specialty))
      );
    }
    // Apply sorting
    if (sortBy) {
      if (sortBy === 'fees') {
        result.sort((a, b) => a.fees - b.fees);
      } else if (sortBy === 'experience') {
        result.sort((a, b) => b.experience - a.experience);
      }
    }
    setFilteredDoctors(result);
  }, [doctors, searchQuery, consultationType, specialties, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Stethoscope className="h-10 w-10 text-white" />
            <h1 className="ml-3 text-3xl font-bold text-white">Doc-Verse</h1>
          </div>
          <div className="w-full md:w-1/2">
            <SearchBar 
              doctors={doctors} 
              searchQuery={searchQuery} 
              onSearch={(query) => updateSearchParams({ searchQuery: query })} 
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <FilterPanel 
              doctors={doctors}
              consultationType={consultationType}
              specialties={specialties}
              sortBy={sortBy}
              updateFilters={updateSearchParams}
            />
          </div>
          <div className="lg:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 p-4">{error}</div>
            ) : (
              <DoctorList doctors={filteredDoctors} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctor/:id" element={<DoctorDetails />} />
    </Routes>
  );
}

export default App;