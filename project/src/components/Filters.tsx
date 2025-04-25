import React from 'react';
import { FilterState, ConsultationMode, SortOption } from '../types';

interface FiltersProps {
  filterState: FilterState;
  specialties: string[];
  updateFilter: (key: keyof FilterState, value: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ 
  filterState, 
  specialties, 
  updateFilter 
}) => {
  const handleConsultationChange = (mode: ConsultationMode) => {
    updateFilter('consultationMode', mode);
  };

  const handleSpecialtyChange = (specialty: string) => {
    const updatedSpecialties = filterState.specialties.includes(specialty)
      ? filterState.specialties.filter(item => item !== specialty)
      : [...filterState.specialties, specialty];
    
    updateFilter('specialties', updatedSpecialties);
  };

  const handleSortChange = (sortOption: SortOption) => {
    updateFilter('sortBy', sortOption);
  };

  return (
    <div className="bg-white rounded-lg shadow p-5 sticky top-4">
      <h2 className="text-xl font-semibold mb-5 text-gray-800">Filters</h2>
      
      {/* Mode of Consultation */}
      <div className="mb-6">
        <h3 
          className="text-md font-medium mb-3 text-gray-700" 
          data-testid="filter-header-moc"
        >
          Mode of Consultation
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="consultationMode"
              checked={filterState.consultationMode === 'Video Consult'}
              onChange={() => handleConsultationChange('Video Consult')}
              className="w-4 h-4 text-blue-500"
              data-testid="filter-video-consult"
            />
            <span className="text-gray-700">Video Consult</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="consultationMode"
              checked={filterState.consultationMode === 'In Clinic'}
              onChange={() => handleConsultationChange('In Clinic')}
              className="w-4 h-4 text-blue-500"
              data-testid="filter-in-clinic"
            />
            <span className="text-gray-700">In Clinic</span>
          </label>
        </div>
      </div>
      
      {/* Specialties */}
      <div className="mb-6">
        <h3 
          className="text-md font-medium mb-3 text-gray-700" 
          data-testid="filter-header-speciality"
        >
          Specialties
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {specialties.map(specialty => (
            <label 
              key={specialty} 
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filterState.specialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                className="w-4 h-4 text-blue-500 rounded"
                data-testid={`filter-specialty-${specialty}`}
              />
              <span className="text-gray-700">{specialty}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Sort Options */}
      <div>
        <h3 
          className="text-md font-medium mb-3 text-gray-700" 
          data-testid="filter-header-sort"
        >
          Sort By
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="sortBy"
              checked={filterState.sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
              className="w-4 h-4 text-blue-500"
              data-testid="sort-fees"
            />
            <span className="text-gray-700">Fees (lowest first)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="sortBy"
              checked={filterState.sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
              className="w-4 h-4 text-blue-500"
              data-testid="sort-experience"
            />
            <span className="text-gray-700">Experience (highest first)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;