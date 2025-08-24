import { z } from 'zod';

export const jobSchema = z.object({
  title: z.string().min(3, { message: 'Job title must be at least 3 characters.' }),
  companyName: z.string().min(2, { message: 'Company name is required.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
  jobType: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship']),
  minSalary: z.coerce.number().min(0, 'Minimum salary must be positive.').optional().or(z.literal('')),
  maxSalary: z.coerce.number().min(0, 'Maximum salary must be positive.').optional().or(z.literal('')),
  description: z.string().optional(),
  requirements: z.string().optional(),
  responsibilities: z.string().optional(),
  applicationDeadline: z.coerce.date({ message: 'A valid application deadline is required.' }),
}).refine(data => {
    if (data.minSalary && data.maxSalary) {
        return Number(data.maxSalary) >= Number(data.minSalary);
    }
    return true;
}, {
    message: "Max salary must be greater than or equal to min salary.",
    path: ["maxSalary"],
});