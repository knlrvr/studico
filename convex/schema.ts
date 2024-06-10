import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
      name: v.string(),
      img: v.string(),
      email: v.string(),
      tokenIdentifier: v.string(),
      joinedCamps: v.array(v.string()),
      ownedCamps: v.array(v.string())
    })
    .index('by_tokenIdentifier', ['tokenIdentifier']),
    memberships: defineTable({
      orgId: v.string(),
      userId: v.string(),
    }).index('by_orgId_userId', ['orgId', "userId"]),
    projects: defineTable({ 
      title: v.string(),
      tokenIdentifier: v.optional(v.string()),
      orgId: v.optional(v.string()),
      category: v.optional(v.array(v.string())),
      members: v.optional(
        v.array(v.object({
          userId: v.string(),
          userImg: v.string(),
          userName: v.string(),
        }))
      )
    }).index('by_tokenIdentifier', ['tokenIdentifier'])
      .index('by_orgId', ['orgId'])
      .index('by_members', ['members']),
    files: defineTable({
      name: v.string(),
      type: v.string(),
      storageId: v.id('_storage'),
      tokenIdentifier: v.optional(v.string()),
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
    }).index("by_projectId", ["projectId"])
      // index by token for user messages (soon)
});

// TO DO: Add vector search on all fields