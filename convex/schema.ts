import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    memberships: defineTable({
        orgId: v.string(),
        userId: v.string(),
    }).index('by_orgId_userId', ['orgId', "userId"]) ,
    projects: defineTable({ 
        title: v.string(),
        tokenIdentifier: v.optional(v.string()),
        orgId: v.optional(v.string()),
    }).index('by_tokenIdentifier', ['tokenIdentifier'])
      .index('by_orgId', ['orgId']),
    messages: defineTable({
        message: v.string(),
        tokenIdentifier: v.string(),
        projectId: v.id('projects'),
    }).index('by_projectId', ['projectId'])
});

// TO DO: Add vector search on all fields