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
        category: v.optional(v.array(v.string())),
    }).index('by_tokenIdentifier', ['tokenIdentifier'])
      .index('by_orgId', ['orgId']),
    files: defineTable({
      tokenIdentifier: v.optional(v.string()),
      name: v.string(),
      type: v.string(),
      storageId: v.string(),
      projectId: v.optional(v.string()),
    }).index('by_tokenIdentifier', ['tokenIdentifier'])
      .index('by_projectId', ['projectId']),
    messages: defineTable({
        author: v.object({
          sentBy: v.string(),
          image: v.string(),
        }),
        message: v.string(),
        projectId: v.id("projects"),
    }).index("by_projectId", ["projectId"]),
});

// TO DO: Add vector search on all fields