import { v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const getNotifications = query({
    args: {
        projectId: v.optional(v.string()),

    },
    async handler(ctx, args) { 

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

        if(!userId) {
            return [];
        }

        return await ctx.db
            .query('notifications')
            .withIndex('by_projectId', (q) => q.eq('projectId', args.projectId))
            .order('desc')
            .collect()
    },
});

export const getLimitedNotifications = query({
    args: {
        projectId: v.optional(v.string()),

    },
    async handler(ctx, args) { 

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

        if(!userId) {
            return [];
        }

        return await ctx.db
            .query('notifications')
            .withIndex('by_projectId', (q) => q.eq('projectId', args.projectId))
            .order('desc')
            .take(10)
    },    
});

// to replace getLimitedNotifications (above) -
export const paginatedNotifications = query({
    args: {
        projectId: v.optional(v.string()),
        paginationOpts: paginationOptsValidator
    },
    handler: async (ctx, args) => {
        const results = await ctx.db
            .query('notifications')
            .withIndex('by_projectId', (q) => q.eq('projectId', args.projectId))
            .order('desc')
            .paginate(args.paginationOpts);

        return results;
    }
})

export const markNotifAsRead = mutation({
    args: {
        id: v.id('notifications')
    },
    handler: async (ctx, args) => {
        const { id } = args;

        await ctx.db.patch(id, { isRead: true });
    }
})

export const markAllNotifsAsRead = mutation({
    args: {
        projectId: v.string(),
    },
    handler: async (ctx, args) => {

        const unreadNotifications = await ctx.db
            .query('notifications')
            .withIndex('by_projectId', (q) => q.eq('projectId', args.projectId))
            .order('desc')
            .collect();

        if (unreadNotifications.length > 0) {
            for (const notifiation of unreadNotifications) {
                await ctx.db.patch(notifiation._id, { isRead: true });
            }
        }
    },
});

export const createNotification = mutation({
    args: {
        tokenIdentifier: v.optional(v.string()),
        projectId: v.optional(v.string()),
        type: v.string(),
        text: v.string(),
    },
    handler: async (ctx, args) => {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

        if(!userId) {
            return;
        }

        return await ctx.db.insert('notifications', {
            tokenIdentifier: args.tokenIdentifier,
            projectId: args.projectId,
            type: args.type,
            text: args.text,
            isRead: false,
        })
    },
});

export const hasOrgAccess = async (
    ctx: MutationCtx | QueryCtx, 
    orgId: string
) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
        return false;
    }

    const membership = await ctx.db
    .query('memberships')
    .withIndex('by_orgId_userId', (q) => 
    q.eq('orgId', orgId).eq('userId', userId))
    .first();

    return !!membership;
};

export const deleteNotification = mutation({
    args: {
        notificationId: v.id('notifications'),
    },
    async handler(ctx, args) {
        await ctx.db.delete(args.notificationId)
    }
})