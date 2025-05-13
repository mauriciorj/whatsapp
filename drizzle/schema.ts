import { pgTable, foreignKey, pgPolicy, bigint, timestamp, uuid, integer, text, index, boolean, unique, smallint } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const campaign_messages = pgTable("campaign_messages", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "campaign_messages_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	created_at: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp({ withTimezone: true, mode: 'string' }),
	campaign_id: uuid().defaultRandom(),
	order_index: integer(),
	type: text(),
	content: text(),
	file_url: text(),
	company_id: uuid().defaultRandom(),
}, (table) => [
	foreignKey({
			columns: [table.campaign_id],
			foreignColumns: [campaigns.id],
			name: "campaign_messages_campaign_id_fkey"
		}),
	foreignKey({
			columns: [table.company_id],
			foreignColumns: [company.id],
			name: "campaign_messages_company_id_fkey"
		}),
	pgPolicy("[ANON] - INSERT", { as: "permissive", for: "insert", to: ["anon"], withCheck: sql`true`  }),
	pgPolicy("[AUTH] - DELETE", { as: "permissive", for: "delete", to: ["authenticated"] }),
	pgPolicy("[ANON] - DELETE", { as: "permissive", for: "delete", to: ["anon"] }),
	pgPolicy("[ANON] - SELECT", { as: "permissive", for: "select", to: ["anon"] }),
	pgPolicy("[ANON] - UPDATE", { as: "permissive", for: "update", to: ["anon"] }),
	pgPolicy("[AUTH] - SELECT", { as: "permissive", for: "select", to: ["authenticated"] }),
	pgPolicy("[AUTH] - INSERT", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("[AUTH] - UPDATE", { as: "permissive", for: "update", to: ["authenticated"] }),
]);

export const whatsapp = pgTable("whatsapp", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	created_at: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp({ withTimezone: true, mode: 'string' }),
	company_id: uuid(),
	session: text(),
	qr_code: text(),
	status: text(),
	battery: text(),
	plugged: boolean(),
	name: text(),
	retries: integer(),
	token: text(),
	campaign_id: uuid(),
}, (table) => [
	index("idx_whatsapp_user_id").using("btree", table.company_id.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.campaign_id],
			foreignColumns: [campaigns.id],
			name: "whatsapp_campaign_id_fkey"
		}),
	foreignKey({
			columns: [table.company_id],
			foreignColumns: [company.id],
			name: "whatsapp_company_id_fkey"
		}),
	pgPolicy("[ANON] - INSERT", { as: "permissive", for: "insert", to: ["anon"], withCheck: sql`true`  }),
	pgPolicy("[ANON] - SELECT", { as: "permissive", for: "select", to: ["anon"] }),
	pgPolicy("[ANON] - UPDATE", { as: "permissive", for: "update", to: ["anon"] }),
	pgPolicy("[AUTH] - SELECT", { as: "permissive", for: "select", to: ["authenticated"] }),
	pgPolicy("[AUTH] - UPDATE", { as: "permissive", for: "update", to: ["authenticated"] }),
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
	pgPolicy("[ANON] - INSERT", { as: "permissive", for: "insert", to: ["anon"], withCheck: sql`true`  }),
	pgPolicy("[ANON] - SELECT", { as: "permissive", for: "select", to: ["anon"] }),
	pgPolicy("[ANON] - UPDATE", { as: "permissive", for: "update", to: ["anon"] }),
	pgPolicy("[AUTH] - UPDATE", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("[AUTH] - SELECT", { as: "permissive", for: "select", to: ["authenticated"] }),
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
	pgPolicy("[ANON] - INSERT", { as: "permissive", for: "insert", to: ["anon"], withCheck: sql`true`  }),
	pgPolicy("[ANON] - SELECT", { as: "permissive", for: "select", to: ["anon"] }),
	pgPolicy("[ANON] - UPDATE", { as: "permissive", for: "update", to: ["anon"] }),
	pgPolicy("[AUTH] - SELECT", { as: "permissive", for: "select", to: ["authenticated"] }),
	pgPolicy("[AUTH] - INSERT", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("[AUTH] - DELETE", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const campaigns = pgTable("campaigns", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	created_at: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp({ withTimezone: true, mode: 'string' }),
	title: text(),
	start_date: timestamp({ withTimezone: true, mode: 'string' }),
	end_date: timestamp({ withTimezone: true, mode: 'string' }),
	company_id: uuid(),
	wp_link: text(),
	wp_message: text(),
	wp_numbers: text().array(),
	redirect_to: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.company_id],
			foreignColumns: [company.id],
			name: "campaigns_company_id_fkey"
		}),
	unique("projects_wp_link_key").on(table.wp_link),
	pgPolicy("[ANON] - SELECT", { as: "permissive", for: "select", to: ["anon"], using: sql`true` }),
	pgPolicy("[ANON] - UPDATE", { as: "permissive", for: "update", to: ["anon"] }),
	pgPolicy("[ANON] - INSERT", { as: "permissive", for: "insert", to: ["anon"] }),
	pgPolicy("[AUTH] - INSERT", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("[AUTH] - SELECT", { as: "permissive", for: "select", to: ["authenticated"] }),
	pgPolicy("[AUTH] - UPDATE", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("[AUTH] - DELETE", { as: "permissive", for: "delete", to: ["authenticated"] }),
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
