import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';

export const jobTypeEnum = pgEnum('job_type', ['Full-time', 'Part-time', 'Contract', 'Internship']);

// 1. Define the new status enum
export const jobStatusEnum = pgEnum('job_status', ['draft', 'published']);

export const jobs = pgTable('jobs', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  companyName: varchar('company_name', { length: 256 }).notNull(),
  location: varchar('location', { length: 256 }).notNull(),
  jobType: jobTypeEnum('job_type').notNull(),
  minSalary: integer('min_salary'),
  maxSalary: integer('max_salary'),
  description: text('description'),
  requirements: text('requirements'),
  responsibilities: text('responsibilities'),
  applicationDeadline: timestamp('application_deadline').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  // 2. Add the status column to the table
  status: jobStatusEnum('status').default('draft').notNull(),
});