import { relations } from "drizzle-orm/relations";
import { company, whatsapp, user_profile, usersInAuth, campaigns, whatsapp_tracking, whatsapp_duplicate } from "./schema";

export const whatsappRelations = relations(whatsapp, ({one}) => ({
	company: one(company, {
		fields: [whatsapp.company_id],
		references: [company.id]
	}),
}));

export const companyRelations = relations(company, ({many}) => ({
	whatsapps: many(whatsapp),
	user_profiles: many(user_profile),
}));

export const user_profileRelations = relations(user_profile, ({one, many}) => ({
	company: one(company, {
		fields: [user_profile.company_id],
		references: [company.id]
	}),
	usersInAuth: one(usersInAuth, {
		fields: [user_profile.user_id],
		references: [usersInAuth.id]
	}),
	campaigns: many(campaigns),
	whatsapp_trackings: many(whatsapp_tracking),
	whatsapp_duplicates: many(whatsapp_duplicate),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	user_profiles: many(user_profile),
}));

export const campaignsRelations = relations(campaigns, ({one, many}) => ({
	user_profile: one(user_profile, {
		fields: [campaigns.user_id],
		references: [user_profile.user_id]
	}),
	whatsapp_trackings: many(whatsapp_tracking),
	whatsapp_duplicates: many(whatsapp_duplicate),
}));

export const whatsapp_trackingRelations = relations(whatsapp_tracking, ({one}) => ({
	campaign: one(campaigns, {
		fields: [whatsapp_tracking.campaign_id],
		references: [campaigns.id]
	}),
	user_profile: one(user_profile, {
		fields: [whatsapp_tracking.user_id],
		references: [user_profile.user_id]
	}),
}));

export const whatsapp_duplicateRelations = relations(whatsapp_duplicate, ({one}) => ({
	campaign: one(campaigns, {
		fields: [whatsapp_duplicate.campaign_id],
		references: [campaigns.id]
	}),
	user_profile: one(user_profile, {
		fields: [whatsapp_duplicate.user_id],
		references: [user_profile.user_id]
	}),
}));