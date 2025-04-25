import React, { useState } from 'react';
import { Doctor, ConsultationType, SortOption } from '../types';
import { Stethoscope, ArrowUpDown, Users, ChevronUp, ChevronDown } from 'lucide-react';

interface FilterPanelProps {
  doctors: Doctor[];
  consultationType: ConsultationType;
  specialties: string[];
  sortBy: SortOption;
  updateFilters: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  doctors,
  consultationType,
  specialties,
  sortBy,
  updateFilters
}) => {
  // Get all unique specialties from the doctors array
  const uniqueSpecialties = Array.from(
    new Set(doctors.flatMap(doctor => doctor.specialties))
  ).sort();

  // State for collapsing sections
  const [isConsultationOpen, setIsConsultationOpen] = useState(true);
  const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(true);

  const handleConsultationChange = (value: ConsultationType) => {
    updateFilters({ consultationType: value });
  };

  const handleSpecialtyChange = (specialty: string) => {
    const updatedSpecialties = specialties.includes(specialty)
      ? specialties.filter(s => s !== specialty)
      : [...specialties, specialty];
    
    updateFilters({ specialties: updatedSpecialties });
  };

  const handleSortChange = (value: SortOption) => {
    updateFilters({ sortBy: value });
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {/* Consultation Mode Filter */}
      <div className="border-b border-gray-200">
        <button
          className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between focus:outline-none"
          onClick={() => setIsConsultationOpen(!isConsultationOpen)}
        >
          <div className="flex items-center">
            <Users className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-700" data-testid="filter-header-moc">
              Consultation Mode
            </h3>
          </div>
          <div>
            {isConsultationOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </button>
        {isConsultationOpen && (
          <div className="px-4 py-3">
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  data-testid="filter-video-consult"
                  type="radio"
                  name="consultationType"
                  checked={consultationType === 'Video Consult'}
                  onChange={() => handleConsultationChange('Video Consult')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Video Consult</span>
              </label>
              <label className="flex items-center">
                <input
                  data-testid="filter-in-clinic"
                  type="radio"
                  name="consultationType"
                  checked={consultationType === 'In Clinic'}
                  onChange={() => handleConsultationChange('In Clinic')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">In Clinic</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Specialties Filter */}
      <div className="border-b border-gray-200">
        <button
          className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between focus:outline-none"
          onClick={() => setIsSpecialtyOpen(!isSpecialtyOpen)}
        >
          <div className="flex items-center">
            <Stethoscope className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-700" data-testid="filter-header-speciality">
              Speciality
            </h3>
          </div>
          <div>
            {isSpecialtyOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </button>
        {isSpecialtyOpen && (
          <div className="px-4 py-3 max-h-60 overflow-y-auto">
            <div className="space-y-2">
              {uniqueSpecialties.map(specialty => (
                <label key={specialty} className="flex items-center">
                  <input
                    data-testid={`filter-specialty-${specialty ? specialty.replace('/', '-') : 'unknown'}`}
                    type="checkbox"
                    checked={specialties.includes(specialty)}
                    onChange={() => handleSpecialtyChange(specialty)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{specialty}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sort Filter */}
      <div>
        <button
          className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between focus:outline-none"
          onClick={() => setIsSortOpen(!isSortOpen)}
        >
          <div className="flex items-center">
            <ArrowUpDown className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-700" data-testid="filter-header-sort">
              Sort By
            </h3>
          </div>
          <div>
            {isSortOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </button>
        {isSortOpen && (
          <div className="px-4 py-3">
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  data-testid="sort-fees"
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'fees'}
                  onChange={() => handleSortChange('fees')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Fees (Low to High)</span>
              </label>
              <label className="flex items-center">
                <input
                  data-testid="sort-experience"
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'experience'}
                  onChange={() => handleSortChange('experience')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Experience (High to Low)</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;