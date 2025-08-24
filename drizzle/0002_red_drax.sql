CREATE TYPE "public"."job_status" AS ENUM('draft', 'published');--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "status" "job_status" DEFAULT 'draft' NOT NULL;