import { getJobs } from '@/lib/actions';
import JobCard from '@/app/components/JobCard';
import Filters from '@/app/components/Filters';

export default async function JobListings({ searchParams }) {
  // THE FIX: Read minSalary and maxSalary from the searchParams
  const { title, location, jobType, minSalary, maxSalary } = searchParams;
  const filters = { title, location, jobType, minSalary, maxSalary };

  const jobs = await getJobs(filters);

  return (
    <>
      <Filters />
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600">No jobs found matching your criteria.</p>
        </div>
      )}
    </>
  );
}