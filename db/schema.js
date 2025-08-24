import {
  pgTable, serial, varchar, text, integer, timestamp, pgEnum, date
} from "drizzle-orm/pg-core";

export const jobTypeEnum = pgEnum("job_type", [
  "Full-time", "Part-time", "Contract", "Internship",
]);

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  company: varchar("company", { length: 200 }).notNull(),
  location: varchar("location", { length: 120 }).notNull(),
  jobType: jobTypeEnum("job_type").notNull(),
  salaryMin: integer("salary_min").notNull().default(0),
  salaryMax: integer("salary_max").notNull().default(0),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  responsibilities: text("responsibilities").notNull(),
  deadline: date("deadline"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
