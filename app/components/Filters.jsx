'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

// Import the slider component and its CSS
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// --- SVG Icon Components for the exact UI ---
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 21h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;


export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [salaryRange, setSalaryRange] = useState([
    Number(searchParams.get('minSalary')) || 50,
    Number(searchParams.get('maxSalary')) || 80
  ]);

  const handleFilterChange = useDebouncedCallback((key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSalaryChange = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);
    params.set('minSalary', value[0]);
    params.set('maxSalary', value[1]);
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const FilterItem = ({ children }) => (
    <div className="relative w-full flex items-center border-r border-gray-200">
      {children}
    </div>
  );

  return (
    <div className="bg-white border-y border-gray-200 mb-8 flex flex-col md:flex-row items-center text-sm">
      
      <FilterItem>
        <div className="absolute left-4 pointer-events-none"><SearchIcon /></div>
        <input
          type="text"
          placeholder="Search By Job Title, Role"
          className="w-full pl-12 pr-4 py-4 border-0 focus:ring-purple-500 focus:ring-1"
          onChange={(e) => handleFilterChange('title', e.target.value)}
          defaultValue={searchParams.get('title') || ''}
        />
      </FilterItem>

      <FilterItem>
        <div className="absolute left-4 pointer-events-none"><LocationIcon /></div>
        <select
          className="w-full pl-12 pr-10 py-4 border-0 appearance-none bg-transparent focus:ring-purple-500 focus:ring-1"
          onChange={(e) => handleFilterChange('location', e.target.value)}
          defaultValue={searchParams.get('location') || ''}
        >
          <option value="">Preferred Location</option>
          <option>Chennai</option>
          <option>Bangalore</option>
          <option>Mumbai</option>
          <option>Remote</option>
        </select>
        <div className="absolute right-4 pointer-events-none"><ChevronDownIcon /></div>
      </FilterItem>

      <FilterItem>
        <div className="absolute left-4 pointer-events-none"><BriefcaseIcon /></div>
        <select
          className="w-full pl-12 pr-10 py-4 border-0 appearance-none bg-transparent focus:ring-purple-500 focus:ring-1"
          onChange={(e) => handleFilterChange('jobType', e.target.value)}
          defaultValue={searchParams.get('jobType') || ''}
        >
          <option value="">Job type</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>
        <div className="absolute right-4 pointer-events-none"><ChevronDownIcon /></div>
      </FilterItem>
      
      <div className="w-full md:w-[350px] p-4 shrink-0">
          <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500">Salary Per Month</span>
              <span className="font-semibold text-gray-800">₹{salaryRange[0]}k - ₹{salaryRange[1]}k</span>
          </div>
          <Slider
              range
              min={0}
              max={500}
              step={10}
              value={salaryRange}
              onChange={(value) => setSalaryRange(value)}
              onAfterChange={(value) => handleSalaryChange(value)}
              trackStyle={[{ backgroundColor: '#212121' }]}
              // --- THIS IS THE STYLE CHANGE ---
              handleStyle={[
                  { borderColor: '#212121', backgroundColor: 'white', borderWidth: 2, opacity: 1 },
                  { borderColor: '#212121', backgroundColor: 'white', borderWidth: 2, opacity: 1 }
              ]}
              railStyle={{ backgroundColor: '#e0e0e0' }}
          />
      </div>
    </div>
  );
}