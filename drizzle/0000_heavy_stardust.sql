CREATE TYPE "public"."job_type" AS ENUM('Full-time', 'Part-time', 'Contract', 'Internship');--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"company" varchar(200) NOT NULL,
	"location" varchar(120) NOT NULL,
	"job_type" "job_type" NOT NULL,
	"salary_min" integer DEFAULT 0 NOT NULL,
	"salary_max" integer DEFAULT 0 NOT NULL,
	"description" text NOT NULL,
	"requirements" text NOT NULL,
	"responsibilities" text NOT NULL,
	"deadline" date,
	"created_at" timestamp DEFAULT now() NOT NULL
);
