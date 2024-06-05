import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    projects: defineTable({ 
        title: v.string(),
        tokenIdentifier: v.string(),
    }).index('by_tokenIdentifier', ['tokenIdentifier']),
    messages: defineTable({
        message: v.string(),
        tokenIdentifier: v.string(),
        projectId: v.id('projects'),
    }).index('by_projectId', ['projectId'])
});