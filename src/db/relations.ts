import { relations } from "drizzle-orm/relations";
import {
  campaigns,
  campaign_messages,
  company,
  whatsapp,
  user_profile,
  usersInAuth,
  whatsapp_tracking,
} from "./schema";

export const campaign_messagesRelations = relations(
  campaign_messages,
  ({ one }) => ({
    campaign: one(campaigns, {
      fields: [campaign_messages.campaign_id],
      references: [campaigns.id],
    }),
    company: one(company, {
      fields: [campaign_messages.company_id],
      references: [company.id],
    }),
  })
);

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  campaign_messages: many(campaign_messages),
  whatsapps: many(whatsapp),
  whatsapp_trackings: many(whatsapp_tracking),
  company: one(company, {
    fields: [campaigns.company_id],
    references: [company.id],
  }),
}));

export const companyRelations = relations(company, ({ many }) => ({
  campaign_messages: many(campaign_messages),
  whatsapps: many(whatsapp),
  user_profiles: many(user_profile),
  campaigns: many(campaigns),
}));

export const whatsappRelations = relations(whatsapp, ({ one }) => ({
  campaign: one(campaigns, {
    fields: [whatsapp.campaign_id],
    references: [campaigns.id],
  }),
  company: one(company, {
    fields: [whatsapp.company_id],
    references: [company.id],
  }),
}));

export const user_profileRelations = relations(
  user_profile,
  ({ one, many }) => ({
    company: one(company, {
      fields: [user_profile.company_id],
      references: [company.id],
    }),
    usersInAuth: one(usersInAuth, {
      fields: [user_profile.user_id],
      references: [usersInAuth.id],
    }),
    whatsapp_trackings: many(whatsapp_tracking),
  })
);

export const usersInAuthRelations = relations(usersInAuth, ({ many }) => ({
  user_profiles: many(user_profile),
}));

export const whatsapp_trackingRelations = relations(
  whatsapp_tracking,
  ({ one }) => ({
    campaign: one(campaigns, {
      fields: [whatsapp_tracking.campaign_id],
      references: [campaigns.id],
    }),
    user_profile: one(user_profile, {
      fields: [whatsapp_tracking.user_id],
      references: [user_profile.user_id],
    }),
  })
);
