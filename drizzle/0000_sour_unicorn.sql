-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "whatsapp" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"company_id" uuid NOT NULL,
	"session" text,
	"qr_code" text,
	"status" text,
	"battery" text,
	"plugged" boolean,
	"name" text,
	"retries" integer,
	"token" text,
	CONSTRAINT "whatsapp_user_id_key" UNIQUE("company_id")
);
--> statement-breakpoint
ALTER TABLE "whatsapp" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "user_profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"country" text,
	"email" text NOT NULL,
	"first_name" text,
	"user_id" uuid,
	"role" text,
	"company_id" uuid,
	"last_name" text,
	CONSTRAINT "user_profile_email_key" UNIQUE("email"),
	CONSTRAINT "user_profile_user_id_key" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "user_profile" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "kiwify" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"order_status" text,
	"customer_first_name" text,
	"customer_full_name" text,
	"customer_email" text,
	"customer_state" text,
	"customer_city" text,
	"customer_mobile" text,
	"subscription_id" text,
	"subscription_start_date" timestamp with time zone,
	"subscription_next_payment" timestamp with time zone,
	"subscription_status" text,
	"subscription_plan_name" text
);
--> statement-breakpoint
ALTER TABLE "kiwify" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "campaigns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"title" text,
	"start_date" timestamp with time zone,
	"end_date" timestamp with time zone,
	"user_id" uuid,
	"wp_link" text,
	"wp_message" text,
	"wp_numbers" text[],
	"redirect_to" smallint,
	CONSTRAINT "projects_wp_link_key" UNIQUE("wp_link")
);
--> statement-breakpoint
ALTER TABLE "campaigns" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "whatsapp_tracking" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid,
	"number" text,
	"country" text,
	"city" text,
	"device_size" text,
	"device_system" text,
	"link" text,
	"campaign_id" uuid
);
--> statement-breakpoint
ALTER TABLE "whatsapp_tracking" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "whatsapp_duplicate" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"user_id" uuid NOT NULL,
	"numbers" text[],
	"redirect_to" smallint DEFAULT '0',
	"campaign_id" uuid,
	CONSTRAINT "whatsapp_duplicate_user_id_key" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "whatsapp_duplicate" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "company" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"name" text,
	"plan" text,
	"subscription_status" text,
	"kiwify_subscription_id" text
);
--> statement-breakpoint
ALTER TABLE "company" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "whatsapp" ADD CONSTRAINT "whatsapp_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campaigns" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profile"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "whatsapp_tracking" ADD CONSTRAINT "whatsapp_tracking_project_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "whatsapp_tracking" ADD CONSTRAINT "whatsapp_tracking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profile"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "whatsapp_duplicate" ADD CONSTRAINT "whatsapp_duplicate_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "whatsapp_duplicate" ADD CONSTRAINT "whatsapp_duplicate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profile"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_whatsapp_user_id" ON "whatsapp" USING btree ("company_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "idx_whatsapp_tracking_user_id" ON "whatsapp_tracking" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "whatsapp_duplicate_campaign_id_idx" ON "whatsapp_duplicate" USING btree ("campaign_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "whatsapp_duplicate_user_id_idx" ON "whatsapp_duplicate" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE POLICY "ANON - Can Insert" ON "whatsapp" AS PERMISSIVE FOR INSERT TO "anon" WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "ANON - Can Select" ON "whatsapp" AS PERMISSIVE FOR SELECT TO "anon";--> statement-breakpoint
CREATE POLICY "ANON - Can Update" ON "whatsapp" AS PERMISSIVE FOR UPDATE TO "anon";--> statement-breakpoint
CREATE POLICY "User can see their own profile only." ON "whatsapp" AS PERMISSIVE FOR SELECT TO "authenticated";--> statement-breakpoint
CREATE POLICY "User can update their own profile only." ON "whatsapp" AS PERMISSIVE FOR UPDATE TO "authenticated";--> statement-breakpoint
CREATE POLICY "ANON - Can Insert" ON "user_profile" AS PERMISSIVE FOR INSERT TO "anon" WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "ANON - Can Select" ON "user_profile" AS PERMISSIVE FOR SELECT TO "anon";--> statement-breakpoint
CREATE POLICY "ANON - Can Update" ON "user_profile" AS PERMISSIVE FOR UPDATE TO "anon";--> statement-breakpoint
CREATE POLICY "User can see their own profile only." ON "user_profile" AS PERMISSIVE FOR SELECT TO "authenticated";--> statement-breakpoint
CREATE POLICY "User can update their own profile only." ON "user_profile" AS PERMISSIVE FOR UPDATE TO "authenticated";--> statement-breakpoint
CREATE POLICY "ANON - Can Select" ON "campaigns" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "ANON - Can Update" ON "campaigns" AS PERMISSIVE FOR UPDATE TO "anon";--> statement-breakpoint
CREATE POLICY "ANON Can Insert" ON "campaigns" AS PERMISSIVE FOR INSERT TO "anon";--> statement-breakpoint
CREATE POLICY "Auth - Can Insert" ON "campaigns" AS PERMISSIVE FOR INSERT TO "authenticated";--> statement-breakpoint
CREATE POLICY "Auth - Can Update" ON "campaigns" AS PERMISSIVE FOR UPDATE TO "authenticated";--> statement-breakpoint
CREATE POLICY "Auth - Delete" ON "campaigns" AS PERMISSIVE FOR DELETE TO "authenticated";--> statement-breakpoint
CREATE POLICY "Auth - Select" ON "campaigns" AS PERMISSIVE FOR SELECT TO "authenticated";--> statement-breakpoint
CREATE POLICY "ANON - Can Insert" ON "whatsapp_tracking" AS PERMISSIVE FOR INSERT TO "anon" WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "ANON - Can Select" ON "whatsapp_tracking" AS PERMISSIVE FOR SELECT TO "anon";--> statement-breakpoint
CREATE POLICY "ANON - Can Update" ON "whatsapp_tracking" AS PERMISSIVE FOR UPDATE TO "anon";--> statement-breakpoint
CREATE POLICY "Auth - Delete" ON "whatsapp_tracking" AS PERMISSIVE FOR DELETE TO "authenticated";--> statement-breakpoint
CREATE POLICY "User can see their own profile only." ON "whatsapp_tracking" AS PERMISSIVE FOR SELECT TO "authenticated";--> statement-breakpoint
CREATE POLICY "User logged can insert new entries" ON "whatsapp_tracking" AS PERMISSIVE FOR INSERT TO "authenticated";
*/