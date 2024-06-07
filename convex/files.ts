import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
})

export const getFiles = query({ 
    async handler(ctx) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if(!userId) {
            return [];
        }

        return await ctx.db.query('files')
        .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', userId )) 
        .collect()
    },
})

export const uploadFile = mutation({
    args: {
        storageId: v.string(),
        name: v.string(),
        type: v.string(),
        projectId: v.optional(v.string()),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if (!userId) {
            throw new ConvexError('Not authenticated!')
        }

        await ctx.db.insert('files', {
            storageId: args.storageId,
            name: args.name,
            type: args.type,
            tokenIdentifier: userId,
        })
    }
})