import React from 'react';

// --- SVG Icon Components ---
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const SalaryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2m6-6H6" /></svg>;

// --- Helper function for time ---
function timeAgo(date) {
    if (!date) return '';
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 3600) return "Just now";
    const hours = Math.floor(seconds / 3600);
    if (hours < 24) return `${hours}h Ago`;
    const days = Math.floor(hours / 24);
    return `${days}d Ago`;
}

export default function JobCard({ job }) {
  // Format the salary display string
  const salaryDisplay = job.minSalary && job.maxSalary
    ? `₹${job.minSalary} - ${job.maxSalary} LPA`
    : job.minSalary ? `From ₹${job.minSalary} LPA`
    : job.maxSalary ? `Up to ₹${job.maxSalary} LPA`
    : 'Not Disclosed';
    
  // --- DYNAMIC DESCRIPTION LOGIC ---
  // Split the description by periods, filter out empty strings, and take the first two.
  const descriptionPoints = job.description
    ? job.description
        .split('.')
        .filter(sentence => sentence.trim() !== '')
        .slice(0, 2)
    : []; // If no description, use an empty array.

  return (
    // Card Container
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
      
      {/* Header Section */}
      <div className="flex justify-between items-start mb-3">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-xl text-gray-600 shrink-0">
            {job.companyName.charAt(0)}
        </div>
        <span className="text-xs text-blue-700 bg-blue-100 px-3 py-1 rounded-full font-medium">{timeAgo(job.createdAt)}</span>
      </div>

      <div className="flex flex-col flex-grow">
        {/* Job Title */}
        <h3 className="text-lg font-semibold text-gray-900 mt-2">{job.title}</h3>
        
        {/* Job Meta Information */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 my-4">
            <div className="flex items-center gap-1.5"><UserIcon /> 1-3 yr Exp</div>
            <div className="flex items-center gap-1.5"><LocationIcon /> {job.location}</div>
            <div className="flex items-center gap-1.5"><SalaryIcon /> {salaryDisplay}</div>
        </div>

        {/* Job Description */}
        <div className="text-sm text-gray-600 space-y-1 mb-4">
            {descriptionPoints.length > 0 ? (
                descriptionPoints.map((point, index) => (
                    <p key={index} className="flex items-start">
                        <span className="mr-2 mt-1.5 block w-1 h-1 bg-gray-400 rounded-full"></span>
                        {/* Add the period back for display */}
                        <span>{point.trim()}.</span>
                    </p>
                ))
            ) : (
                <p className="text-gray-400 italic">No description provided.</p>
            )}
        </div>
      </div>

      {/* Call to Action (CTA) Button */}
      <button className="w-full mt-auto bg-blue-500 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
        Apply Now
      </button>
    </div>
  );
}