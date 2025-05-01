import { pgTable, index, foreignKey, unique, pgPolicy, uuid, timestamp, text, boolean, integer, smallint } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const whatsapp = pgTable("whatsapp", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	created_at: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp({ withTimezone: true, mode: 'string' }),
	company_id: uuid().notNull(),
	session: text(),
	qr_code: text(),
	status: text(),
	battery: text(),
	plugged: boolean(),
	name: text(),
	retries: integer(),
	token: text(),
}, (table) => [
	index("idx_whatsapp_user_id").using("btree", table.company_id.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.company_id],
			foreignColumns: [company.id],
			name: "whatsapp_company_id_fkey"
		}),
	unique("whatsapp_user_id_key").on(table.company_id),
	pgPolicy("ANON - Can Insert", { as: "permissive", for: "insert", to: ["anon"], withCheck: sql`true`  }),
	pgPolicy("ANON - Can Select", { as: "permissive", for: "select", to: ["anon"] }),
	pgPolicy("ANON - Can Update", { as: "permissive", for: "update", to: ["anon"] }),
	pgPolicy("User can see their own profile only.", { as: "permissive", for: "select", to: ["authenticated"] }),
	pgPolicy("User can update their own profile only.", { as: "permissive", for: "update", to: ["authenticated"] }),
]);

export const user_profile = pgTable("user_profile", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	created_at: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp({ withTimezone: true, mode: 'string' }),
	country: text(),
	email: text().notNull(),
	first_name: text(),
	user_id: uuid(),
	role: text(),
	company_id: uuid(),
	last_name: text(),
}, (table) => [
	foreignKey({
			columns: [table.company_id],
			foreignColumns: [company.id],
			name: "user_profile_company_id_fkey"
		}),
	foreignKey({
			columns: [table.user_id],
			foreignColumns: [users.id],
			name: "user_profile_user_id_fkey"
		}),
	unique("user_profile_email_key").on(table.email),
	unique("user_profile_user_id_key").on(table.user_id),
	pgPolicy("ANON - Can Insert", { as: "permissive", for: "insert", to: ["anon"], withCheck: sql`true`  }),
	pgPolicy("ANON - Can Select", { as: "permissive", for: "select", to: ["anon"] }),
	pgPolicy("ANON - Can Update", { as: "permissive", for: "update", to: ["anon"] }),
	pgPolicy("User can see their own profile only.", { as: "permissive", for: "select", to: ["authenticated"] }),
	pgPolicy("User can update their own profile only.", { as: "permissive", for: "update", to: ["authenticated"] }),
]);

export const kiwify = pgTable("kiwify", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	created_at: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp({ withTimezone: true, mode: 'string' }),
	order_status: text(),
	customer_first_name: text(),
	customer_full_name: text(),
	customer_email: text(),
	customer_state: text(),
	customer_city: text(),
	customer_mobile: text(),
	subscription_id: text(),
	subscription_start_date: timestamp({ withTimezone: true, mode: 'string' }),
	subscription_next_payment: timestamp({ withTimezone: true, mode: 'string' }),
	subscription_status: text(),
	subscription_plan_name: text(),
});

export const campaigns = pgTable("campaigns", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	created_at: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp({ withTimezone: true, mode: 'string' }),
	title: text(),
	start_date: timestamp({ withTimezone: true, mode: 'string' }),
	end_date: timestamp({ withTimezone: true, mode: 'string' }),
	user_id: uuid(),
	wp_link: text(),
	wp_message: text(),
	wp_numbers: text().array(),
	redirect_to: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.user_id],
			foreignColumns: [user_profile.user_id],
			name: "projects_user_id_fkey"
		}),
	unique("projects_wp_link_key").on(table.wp_link),
	pgPolicy("ANON - Can Select", { as: "permissive", for: "select", to: ["anon"], using: sql`true` }),
	pgPolicy("ANON - Can Update", { as: "permissive", for: "update", to: ["anon"] }),
	pgPolicy("ANON Can Insert", { as: "permissive", for: "insert", to: ["anon"] }),
	pgPolicy("Auth - Can Insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Auth - Can Update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Auth - Delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
	pgPolicy("Auth - Select", { as: "permissive", for: "select", to: ["authenticated"] }),
]);

export const whatsapp_tracking = pgTable("whatsapp_tracking", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	created_at: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	user_id: uuid(),
	number: text(),
	country: text(),
	city: text(),
	device_size: text(),
	device_system: text(),
	link: text(),
	campaign_id: uuid(),
}, (table) => [
	index("idx_whatsapp_tracking_user_id").using("btree", table.user_id.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.campaign_id],
			foreignColumns: [campaigns.id],
			name: "whatsapp_tracking_project_id_fkey"
		}),
	foreignKey({
			columns: [table.user_id],
			foreignColumns: [user_profile.user_id],
			name: "whatsapp_tracking_user_id_fkey"
		}),
	pgPolicy("ANON - Can Insert", { as: "permissive", for: "insert", to: ["anon"], withCheck: sql`true`  }),
	pgPolicy("ANON - Can Select", { as: "permissive", for: "select", to: ["anon"] }),
	pgPolicy("ANON - Can Update", { as: "permissive", for: "update", to: ["anon"] }),
	pgPolicy("Auth - Delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
	pgPolicy("User can see their own profile only.", { as: "permissive", for: "select", to: ["authenticated"] }),
	pgPolicy("User logged can insert new entries", { as: "permissive", for: "insert", to: ["authenticated"] }),
]);

export const whatsapp_duplicate = pgTable("whatsapp_duplicate", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	created_at: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp({ withTimezone: true, mode: 'string' }),
	user_id: uuid().notNull(),
	numbers: text(),
	redirect_to: smallint().default(sql`'0'`),
	campaign_id: uuid(),
}, (table) => [
	index("whatsapp_duplicate_campaign_id_idx").using("btree", table.campaign_id.asc().nullsLast().op("uuid_ops")),
	index("whatsapp_duplicate_user_id_idx").using("btree", table.user_id.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.campaign_id],
			foreignColumns: [campaigns.id],
			name: "whatsapp_duplicate_campaign_id_fkey"
		}),
	foreignKey({
			columns: [table.user_id],
			foreignColumns: [user_profile.user_id],
			name: "whatsapp_duplicate_user_id_fkey"
		}),
	unique("whatsapp_duplicate_user_id_key").on(table.user_id),
]);

export const company = pgTable("company", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	created_at: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp({ withTimezone: true, mode: 'string' }),
	name: text(),
	plan: text(),
	subscription_status: text(),
	kiwify_subscription_id: text(),
});
