'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { jobSchema } from '@/lib/validations';
import { and, gte, lte, ilike, eq, or, isNull } from 'drizzle-orm';

export async function createJob(prevState, formData) {
  const intent = formData.get('intent');
  const validatedFields = jobSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check the fields.',
    };
  }

  try {
    const { minSalary, maxSalary, ...data } = validatedFields.data;
    await db.insert(jobs).values({
        ...data,
        minSalary: minSalary ? Number(minSalary) : null,
        maxSalary: maxSalary ? Number(maxSalary) : null,
        status: intent === 'publish' ? 'published' : 'draft',
    });

    revalidatePath('/');
    const message = intent === 'publish' ? 'Job published successfully!' : 'Draft saved successfully!';
    return { message, errors: {} };
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Failed to create job.', errors: {} };
  }
}

export async function getJobs(filters = {}) {
  const { title, location, jobType, minSalary, maxSalary } = filters;
  
  try {
    const conditions = [];

    // Always filter for published jobs
    conditions.push(eq(jobs.status, 'published'));

    // Text-based filters
    if (title && title.trim()) {
      conditions.push(ilike(jobs.title, `%${title.trim()}%`));
    }
    
    if (location && location.trim()) {
      conditions.push(ilike(jobs.location, `%${location.trim()}%`));
    }
    
    if (jobType && jobType.trim()) {
      conditions.push(eq(jobs.jobType, jobType.trim()));
    }
    
    // Salary filtering - properly handle the conversion and comparison
    if (minSalary && !isNaN(Number(minSalary)) && Number(minSalary) > 0) {
      const minSal = Number(minSalary);
      // Jobs where the maximum salary is at least the user's minimum requirement
      // OR jobs with no salary specified (null values)
      conditions.push(
        or(
          gte(jobs.maxSalary, minSal),
          isNull(jobs.maxSalary),
          isNull(jobs.minSalary)
        )
      );
    }
    
    if (maxSalary && !isNaN(Number(maxSalary)) && Number(maxSalary) > 0) {
      const maxSal = Number(maxSalary);
      // Jobs where the minimum salary is at most the user's maximum budget
      // OR jobs with no salary specified (null values)
      conditions.push(
        or(
          lte(jobs.minSalary, maxSal),
          isNull(jobs.minSalary),
          isNull(jobs.maxSalary)
        )
      );
    }

    const result = await db.select().from(jobs).where(
      conditions.length > 1 ? and(...conditions) : conditions[0]
    ).orderBy(jobs.createdAt);

    console.log('Applied filters:', filters);
    console.log('Found jobs:', result.length);
    
    return result;
  } catch (error) {
    console.error('Database Error:', error);
    // Return all published jobs as fallback
    try {
      return await db.select().from(jobs).where(eq(jobs.status, 'published')).orderBy(jobs.createdAt);
    } catch (fallbackError) {
      console.error('Fallback failed:', fallbackError);
      return [];
    }
  }
}