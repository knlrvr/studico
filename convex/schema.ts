import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
      name: v.string(),
      img: v.string(),
      email: v.string(),
      tokenIdentifier: v.string(),
      // notifcations: v.optional(v.number()),
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
      // notifications: v.optional(v.number()),
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
          tokenIdentifier: v.string(),
        }),
        message: v.string(),
        isEdited: v.boolean(),
        projectId: v.optional(v.id("projects")),
        tokenIdentifier: v.optional(v.string()),
    }).index("by_projectId", ["projectId"]),
      // index by token for user messages (soon)
    tasks: defineTable({
      projectId: v.id('projects'),
      title: v.string(),
      description: v.optional(v.string()),
      category: v.string(),
      priority: v.string(),
      status: v.string(),
      createdBy: v.object({
          userId: v.string(),
          userImg: v.string(),
          userName: v.string(),
      }),
      assignedTo: v.optional(v.object({
          userId: v.string(),
          userImg: v.string(),
          userName: v.string(),
      })),
      completedBy: v.optional(v.object({
          userId: v.string(),
          userImg: v.string(),
          userName: v.string(),
      }))
    }).index('by_projectId', ['projectId'])
      .index('by_projectId_status', ['projectId', 'status']),
    notifications: defineTable({
      tokenIdentifier: v.optional(v.string()),
      orgId: v.optional(v.string()),
      projectId: v.optional(v.string()),
      type: v.string(),
      text: v.string(),
      isRead: v.boolean(),
    }).index('by_projectId', ['projectId'])
});