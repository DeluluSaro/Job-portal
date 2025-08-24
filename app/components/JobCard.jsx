import React from 'react';
import Image from 'next/image'; // Import the Next.js Image component

// --- Updated SVG Icon Components to match the new design ---
const ExperienceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const OnsiteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m2-8h2m-2 4h2m-2 4h2M9 3v2m6-2v2" /></svg>;
const SalaryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;

// --- Helper function to calculate posting time ---
function timeAgo(date) {
    if (!date) return '';
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 3600) return "Just now";
    const hours = Math.floor(seconds / 3600);
    if (hours < 24) return `${hours}h Ago`;
    return `24h Ago`; // Cap at 24h as per the design
}

export default function JobCard({ job }) {
  // Format the salary display string - handle the large numbers properly
  const salaryDisplay = (() => {
    if (job.minSalary && job.maxSalary) {
      // Handle large numbers like 90000-230000 and convert to LPA format
      if (job.minSalary > 1000) {
        const minLPA = (job.minSalary / 100000).toFixed(1);
        const maxLPA = (job.maxSalary / 100000).toFixed(1);
        return `${minLPA}-${maxLPA} LPA`;
      }
      return `${job.minSalary}-${job.maxSalary} LPA`;
    } else if (job.minSalary) {
      if (job.minSalary > 1000) {
        const minLPA = (job.minSalary / 100000).toFixed(1);
        return `${minLPA}+ LPA`;
      }
      return `${job.minSalary}+ LPA`;
    } else if (job.maxSalary) {
      if (job.maxSalary > 1000) {
        const maxLPA = (job.maxSalary / 100000).toFixed(1);
        return `Up to ${maxLPA} LPA`;
      }
      return `Up to ${job.maxSalary} LPA`;
    }
    return 'Not Disclosed';
  })();
  
  // Dynamically generate the first two bullet points from the job description
  const descriptionPoints = job.description
    ? job.description
        .split('.')
        .filter(sentence => sentence.trim() !== '')
        .slice(0, 2)
    : [];

  return (
    // 1. Card Container with new styling
    <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 flex flex-col h-full text-left">
      
      {/* 2. Header Section: Logo and Badge */}
      <div className="flex justify-between items-start mb-4">
        {/* Company Logo with fallback */}
        <div className="w-14 h-14 bg-white p-1 rounded-lg shadow-md border border-gray-100 flex items-center justify-center">
          {job.companyLogoUrl ? (
            <Image src={job.companyLogoUrl} alt={`${job.companyName} logo`} width={48} height={48} className="object-contain" />
          ) : (
            <span className="font-bold text-2xl text-gray-700">{job.companyName.charAt(0)}</span>
          )}
        </div>
        {/* Recency Badge */}
        <span className="text-sm text-blue-700 bg-blue-100 px-3 py-1 rounded-md font-medium">{timeAgo(job.createdAt)}</span>
      </div>

      <div className="flex flex-col flex-grow">
        {/* 3. Job Title */}
        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
        
        {/* 4. Job Meta Information */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 my-4">
            <div className="flex items-center gap-1.5"><ExperienceIcon /> 1-3 yr Exp</div>
            <div className="flex items-center gap-1.5"><OnsiteIcon /> Onsite</div>
            <div className="flex items-center gap-1.5"><SalaryIcon /> {salaryDisplay}</div>
        </div>

        {/* 5. Job Description */}
        <div className="text-sm text-gray-500 space-y-2 mb-5">
            {descriptionPoints.length > 0 ? (
                descriptionPoints.map((point, index) => (
                    <p key={index} className="flex items-start">
                        <span className="mr-3 mt-1.5 block w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                        <span>{point.trim()}</span>
                    </p>
                ))
            ) : (
                <p className="italic">No description provided.</p>
            )}
        </div>
      </div>

      {/* 6. Call to Action (CTA) Button */}
      <button className="w-full mt-auto bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-base">
        Apply Now
      </button>
    </div>
  );
}