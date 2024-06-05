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
    async handler(ctx) { 

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

        if(!userId) {
            return [];
        }
        
        return await ctx.db.query('projects')
            .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', userId
            )).collect()
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