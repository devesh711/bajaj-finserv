import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams as useRouterSearchParams } from 'react-router-dom';
import { ConsultationType, FilterState, SortOption } from '../types';

export function useSearchParams() {
  const [searchParams, setSearchParams] = useRouterSearchParams();
  const navigate = useNavigate();
  
  // Initialize filter state from URL params
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: searchParams.get('search') || '',
    consultationType: (searchParams.get('consultation') as ConsultationType) || '',
    specialties: searchParams.getAll('specialty') || [],
    sortBy: (searchParams.get('sort') as SortOption) || '',
  });

  // Update URL whenever filter state changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    
    if (filterState.searchQuery) {
      newSearchParams.set('search', filterState.searchQuery);
    }
    
    if (filterState.consultationType) {
      newSearchParams.set('consultation', filterState.consultationType);
    }
    
    filterState.specialties.forEach(specialty => {
      newSearchParams.append('specialty', specialty);
    });
    
    if (filterState.sortBy) {
      newSearchParams.set('sort', filterState.sortBy);
    }
    
    setSearchParams(newSearchParams, { replace: true });
  }, [filterState, setSearchParams]);

  // Update filter state when URL changes (e.g., browser back button)
  useEffect(() => {
    setFilterState({
      searchQuery: searchParams.get('search') || '',
      consultationType: (searchParams.get('consultation') as ConsultationType) || '',
      specialties: searchParams.getAll('specialty') || [],
      sortBy: (searchParams.get('sort') as SortOption) || '',
    });
  }, [searchParams]);

  const updateSearchParams = (updates: Partial<FilterState>) => {
    setFilterState(prev => ({
      ...prev,
      ...updates
    }));
  };

  return {
    ...filterState,
    updateSearchParams
  };
}