'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { jobSchema } from '@/lib/validations';
import { and, gte, lte, ilike, eq } from 'drizzle-orm';

export async function createJob(prevState, formData) {
  // This function remains the same
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
        minSalary: minSalary || null,
        maxSalary: maxSalary || null,
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

export async function getJobs(filters) {
  // THE FIX: Destructure minSalary and maxSalary from filters
  const { title, location, jobType, minSalary, maxSalary } = filters;
  const conditions = [];

  conditions.push(eq(jobs.status, 'published'));

  if (title) conditions.push(ilike(jobs.title, `%${title}%`));
  if (location) conditions.push(ilike(jobs.location, `%${location}%`));
  if (jobType) conditions.push(eq(jobs.jobType, jobType));
  
  // THE FIX: Add correct range filtering logic
  if (minSalary) {
    // Find jobs where the job's max salary is greater than or equal to the user's min preference
    conditions.push(gte(jobs.maxSalary, Number(minSalary)));
  }
  if (maxSalary) {
    // Find jobs where the job's min salary is less than or equal to the user's max preference
    conditions.push(lte(jobs.minSalary, Number(maxSalary)));
  }

  try {
    const allJobs = await db.query.jobs.findMany({
      where: and(...conditions),
      orderBy: (jobs, { desc }) => [desc(jobs.createdAt)],
    });
    return allJobs;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}