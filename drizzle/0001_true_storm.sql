ALTER TABLE "jobs" ALTER COLUMN "title" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "location" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "requirements" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "responsibilities" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "company_name" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "min_salary" integer;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "max_salary" integer;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "application_deadline" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "company";--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "salary_min";--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "salary_max";--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "deadline";