import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  doctorId: text("doctor_id").notNull(),
  consentArtefactId: text("consent_artefact_id").notNull(),
  accessToken: text("access_token").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  appVersion: text("app_version").notNull().default("v1.0.0"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  createdAt: true,
});

export const loginSchema = z.object({
  credential: z.string()
    .min(1, "Please enter a valid credential")
    .refine((val) => {
      const isABHA = /^\d{14}$/.test(val);
      const isPhone = /^[+]?[\d\s\-\(\)]{10,}$/.test(val);
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      return isABHA || isPhone || isEmail;
    }, "Please enter a valid ABHA number, phone, or email"),
});

export const otpSchema = z.object({
  otp: z.string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;
export type LoginForm = z.infer<typeof loginSchema>;
export type OTPForm = z.infer<typeof otpSchema>;
