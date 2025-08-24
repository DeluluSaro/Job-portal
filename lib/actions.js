'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { jobSchema } from '@/lib/validations';
import { and, lte, ilike, eq } from 'drizzle-orm';

export async function createJob(prevState, formData) {
  // Read the submission intent from the button that was clicked
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
        // Set the status based on which button was clicked
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
  const { title, location, jobType, salary } = filters;
  const conditions = [];

  // Important: Only fetch jobs that are 'published'
  conditions.push(eq(jobs.status, 'published'));

  if (title) conditions.push(ilike(jobs.title, `%${title}%`));
  if (location) conditions.push(ilike(jobs.location, `%${location}%`));
  if (jobType) conditions.push(eq(jobs.jobType, jobType));
  if (salary) conditions.push(lte(jobs.minSalary, Number(salary)));

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