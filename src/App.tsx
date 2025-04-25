import React, { useEffect, useState } from 'react';
import { useSearchParams } from './hooks/useSearchParams';
import DoctorList from './components/DoctorList';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import { Doctor } from './types';
import { fetchDoctors } from './api/doctorsApi';
import './index.css';
import { Stethoscope } from 'lucide-react';

function App() {
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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Doc-Verse</h1>
            </div>
            <div className="w-full max-w-xl ml-8">
              <SearchBar 
                doctors={doctors} 
                searchQuery={searchQuery} 
                onSearch={(query) => updateSearchParams({ searchQuery: query })} 
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 flex-shrink-0">
            <FilterPanel 
              doctors={doctors}
              consultationType={consultationType}
              specialties={specialties}
              sortBy={sortBy}
              updateFilters={updateSearchParams}
            />
          </div>
          <div className="flex-grow">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
}

export default App;