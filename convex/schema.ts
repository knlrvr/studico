import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
      name: v.string(),
      img: v.string(),
      email: v.string(),
      tokenIdentifier: v.string(),
    })
    .index('by_tokenIdentifier', ['tokenIdentifier'])
    .index('by_email', ['email']),
    posts: defineTable({
      author: v.object({
        userId: v.string(),
        userImg: v.string(),
        userName: v.string(),
      }),
      picture: v.optional(v.string()),
      body: v.string(),
      likes: v.optional(
        v.array(v.object({
          userId: v.string(),
          userImg: v.string(),
          userName: v.string(),
        })
      )),
      userImg: v.optional(v.string()),
      userName: v.optional(v.string()),
      commentsCount: v.number(),
      bookmarksCount: v.number(),
    }),
    comments: defineTable({
      postId: v.id('posts'),
      author: v.object({
        userId: v.string(),
        userImg: v.string(),
        userName: v.string(),
      }),
      comment: v.string(),
    })
    .index('by_postId', ['postId'])
    .index('by_author', ['author.userId']),
    bookmarks: defineTable({
      userId: v.string(),
      postId: v.id('posts'),
    })
    .index('by_userId', ['userId'])
    .index('by_userId_postId', ['userId', 'postId']),
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
      ),
    }).index('by_tokenIdentifier', ['tokenIdentifier'])
      .index('by_orgId', ['orgId'])
      .index('by_members', ['members']),
    invites: defineTable({
      projectId: v.id('projects'),
      projectName: v.string(),
      inviteeEmail: v.string(),
      inviterId: v.string(),
      inviterName: v.string(),
      status: v.string(),
    }).index('by_inviteeEmail', ['inviteeEmail']),
    files: defineTable({
      name: v.string(),
      type: v.string(),
      storageId: v.id('_storage'),
      tokenIdentifier: v.optional(v.string()),
      projectId: v.optional(v.string()),
      postId: v.optional(v.id('posts')),
    }).index('by_tokenIdentifier', ['tokenIdentifier'])
      .index('by_projectId', ['projectId'])
      .index('by_postId', ['postId']),
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
    tasks: defineTable({
      projectId: v.id('projects'),
      title: v.string(),
      description: v.optional(v.string()),
      category: v.string(),
      priority: v.string(),
      status: v.string(),
      completeByDate: v.optional(v.string()),
      createdBy: v.object({
          userId: v.string(),
          userImg: v.string(),
          userName: v.string(),
      }),
      assignedTo: v.object({
          userId: v.string(),
          userImg: v.string(),
          userName: v.string(),
      }),
      completedBy: v.optional(v.object({
          userId: v.string(),
          userImg: v.string(),
          userName: v.string(),
      }))
    }).index('by_projectId', ['projectId'])
      .index('by_projectId_status', ['projectId', 'status'])
      .index('by_projectId_assignedTo', ['projectId', 'assignedTo.userId'])
      .index('by_projectId_completeByDate', ['projectId', 'completeByDate']),
    notifications: defineTable({
      tokenIdentifier: v.optional(v.string()),
      orgId: v.optional(v.string()),
      projectId: v.optional(v.string()),
      type: v.string(),
      text: v.string(),
      isRead: v.boolean(),
    }).index('by_projectId', ['projectId'])
});