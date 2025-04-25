import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { fetchDoctors, getAllSpecialties } from './api/doctorsApi';
import { Doctor, FilterState, ConsultationMode, SortOption } from './types';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import DoctorList from './components/DoctorList';
import Pagination from './components/Pagination';
import { Filter, MenuIcon, X } from 'lucide-react';

const DOCTORS_PER_PAGE = 25;

const DoctorListingPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Initialize filter state from URL
  const [filterState, setFilterState] = useState<FilterState>({
    search: searchParams.get('search') || '',
    consultationMode: (searchParams.get('mode') as ConsultationMode) || null,
    specialties: searchParams.get('specialties') ? searchParams.get('specialties')!.split(',') : [],
    sortBy: (searchParams.get('sort') as SortOption) || null,
  });

  // Extract all unique specialties from doctors
  const specialties = useMemo(() => {
    return doctors.length > 0 ? getAllSpecialties(doctors) : [];
  }, [doctors]);

  // Get search suggestions based on doctor names
  const searchSuggestions = useMemo(() => {
    if (!filterState.search) return [];
    
    const searchTerm = filterState.search.toLowerCase();
    return doctors
      .map(doctor => doctor.name)
      .filter(name => name.toLowerCase().includes(searchTerm));
  }, [doctors, filterState.search]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredDoctors.length / DOCTORS_PER_PAGE);
  const paginatedDoctors = useMemo(() => {
    const startIndex = (currentPage - 1) * DOCTORS_PER_PAGE;
    return filteredDoctors.slice(startIndex, startIndex + DOCTORS_PER_PAGE);
  }, [filteredDoctors, currentPage]);

  // Fetch doctors data
  useEffect(() => {
    const getDoctors = async () => {
      setLoading(true);
      const data = await fetchDoctors();
      setDoctors(data);
      setLoading(false);
    };
    
    getDoctors();
  }, []);

  // Update URL when filter state changes
  useEffect(() => {
    const params: { [key: string]: string } = {};
    
    if (filterState.search) params.search = filterState.search;
    if (filterState.consultationMode) params.mode = filterState.consultationMode;
    if (filterState.specialties.length > 0) params.specialties = filterState.specialties.join(',');
    if (filterState.sortBy) params.sort = filterState.sortBy;
    if (currentPage > 1) params.page = currentPage.toString();
    
    setSearchParams(params);
  }, [filterState, currentPage, setSearchParams]);

  // Apply filters to doctors
  useEffect(() => {
    if (loading) return;
    
    let result = [...doctors];
    
    // Apply search filter
    if (filterState.search) {
      const searchTerm = filterState.search.toLowerCase();
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply specialty filter
    if (filterState.specialties.length > 0) {
      result = result.filter(doctor => 
        doctor.specialties.some(specialty => 
          filterState.specialties.includes(specialty)
        )
      );
    }
    
    // Apply consultation mode filter
    if (filterState.consultationMode) {
      // This is a mock filter since the API doesn't provide consultation mode
      // In a real app, this would filter based on the doctor's available modes
    }
    
    // Apply sorting
    if (filterState.sortBy === 'fees') {
      result.sort((a, b) => a.fees - b.fees);
    } else if (filterState.sortBy === 'experience') {
      result.sort((a, b) => b.experience - a.experience);
    }
    
    setFilteredDoctors(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [doctors, filterState, loading]);

  // Update a specific filter
  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilterState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSearchChange = (value: string) => {
    updateFilter('search', value);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    updateFilter('search', suggestion);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">DoctorFinder</h1>
            
            <button 
              className="md:hidden flex items-center space-x-1 text-gray-600"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
          
          <div className="mt-4">
            <SearchBar 
              value={filterState.search}
              onChange={handleSearchChange}
              suggestions={searchSuggestions}
              onSelectSuggestion={handleSuggestionSelect}
            />
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filters */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 md:hidden">
              <div className="h-full max-w-xs w-full bg-white p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button 
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <Filters 
                  filterState={filterState}
                  specialties={specialties}
                  updateFilter={updateFilter}
                />
              </div>
            </div>
          )}
          
          {/* Desktop Filters */}
          <aside className="hidden md:block md:w-1/4 lg:w-1/5">
            <Filters 
              filterState={filterState}
              specialties={specialties}
              updateFilter={updateFilter}
            />
          </aside>
          
          {/* Doctor Listing */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {loading ? 'Loading doctors...' : `${filteredDoctors.length} Doctors Available`}
              </h2>
              {!loading && filteredDoctors.length > 0 && (
                <p className="text-gray-600">
                  Showing {((currentPage - 1) * DOCTORS_PER_PAGE) + 1} - {Math.min(currentPage * DOCTORS_PER_PAGE, filteredDoctors.length)} of {filteredDoctors.length}
                </p>
              )}
            </div>
            
            <DoctorList doctors={paginatedDoctors} loading={loading} />
            
            {!loading && filteredDoctors.length > DOCTORS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Wrap with BrowserRouter
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DoctorListingPage />
    </BrowserRouter>
  );
};

export default App;