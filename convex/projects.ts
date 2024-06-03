import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const createProject = mutation({
    args: {
        title: v.string(),
        
    },
    async handler(ctx, args) {
        await ctx.db.insert('projects', {
            title: args.title,
        })
    },
})

export const getProjects = query({
    async handler(ctx) {
        return await ctx.db.query('projects').collect()
    },
});