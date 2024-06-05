import { mutation, query } from './_generated/server'
import { ConvexError, v } from 'convex/values'

export const createProject = mutation({
    args: {
        title: v.string(),
    },
    async handler(ctx, args) {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

        if(!userId) {
            throw new ConvexError('Not authenticated!')
        }
        
        await ctx.db.insert('projects', {
            title: args.title,
            tokenIdentifier: userId,
        })
    },
})

export const getProjects = query({
    args: {
        orgId: v.optional(v.string()),
    },
    async handler(ctx, args) { 

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

        if(!userId) {
            return [];
        }

        if(args.orgId) {
            return await ctx.db.query('projects')
            .withIndex('by_orgId', (q) => q.eq('orgId', args.orgId
            )).order('desc').collect()
        } else {
            return await ctx.db.query('projects')
            .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', userId
            )).order('desc').collect()
        }
        
    },
});

export const getProject = query({
    args: {
        projectId: v.id('projects'),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

        if(!userId) {
            return null;
        }

        const project = await ctx.db.get(args.projectId)

        if(!project) {
            return null;
        }

        if(project?.tokenIdentifier !== userId) {
            return null;
        }

        return project;
    } 
})

export const sendMessage = mutation({
    args: {
        message: v.string(),
        projectId: v.id('projects')
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

        if(!userId) {
            throw new ConvexError('Not authenticated!')
        }
        
        await ctx.db.insert('messages', {
            message: args.message,
            tokenIdentifier: userId,
            projectId: args.projectId,
        })
    },
})

export const getMessagesForProject = query({
    args: {
        projectId: v.id('projects')
    },
    async handler(ctx, args) {
        const project = await ctx.db.query('projects');

        if (!project) {
            return [];
        }

        return await ctx.db
        .query('messages')
        .withIndex('by_projectId', (q) => 
            q.eq('projectId', args.projectId)
        )
        .collect();
    }
})