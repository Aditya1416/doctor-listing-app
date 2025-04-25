import React from 'react';
import { Doctor } from '../types';
import { Clock, DollarSign, Stethoscope } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100"
      data-testid="doctor-card"
    >
      <div className="p-5">
        <h3 
          className="text-xl font-semibold text-gray-800 mb-2" 
          data-testid="doctor-name"
        >
          Dr. {doctor.name}
        </h3>
        
        <div className="flex items-center mb-3">
          <Stethoscope className="w-4 h-4 text-teal-600 mr-2" />
          <span 
            className="text-gray-600 text-sm" 
            data-testid="doctor-specialty"
          >
            {doctor.specialties?.join(', ') || ''}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-blue-500 mr-2" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Experience</span>
              <span 
                className="font-medium text-gray-700" 
                data-testid="doctor-experience"
              >
                {doctor.experience} years
              </span>
            </div>
          </div>
          
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 text-green-500 mr-2" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Consultation Fee</span>
              <span 
                className="font-medium text-gray-700" 
                data-testid="doctor-fee"
              >
                ₹{doctor.fees}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-3 flex justify-between items-center">
        <span className="text-blue-700 text-sm font-medium">Available Today</span>
        <button className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;