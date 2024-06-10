import { MutationCtx, QueryCtx, mutation, query } from './_generated/server'
import { ConvexError, v } from 'convex/values'
import { Id } from './_generated/dataModel'

export const createProject = mutation({
    args: {
        title: v.string(),
        orgId: v.optional(v.string()),
        category: v.optional(v.array(v.string())),
    },
    async handler(ctx, args) {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

        if(!userId) {
            throw new ConvexError('Not authenticated!')
        }

        let projectId: Id<"projects">;

        if (args.orgId) {
            const isMember = await hasOrgAccess(ctx, args.orgId);

            if (!isMember) {
                throw new ConvexError(
                    'You do not have permission to create projects for this organization.'
                );
            }

            projectId = await ctx.db.insert('projects', {
                title: args.title,
                orgId: args.orgId,
            });
        } else { 
            projectId = await ctx.db.insert('projects', {
                title: args.title,
                tokenIdentifier: userId,
            })
        }
        
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

            const isMember = await hasOrgAccess(ctx, args.orgId)

            if(!isMember) {
                return null;
            }

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

        if (project.orgId) {
            const isMember = await hasOrgAccess(ctx, project.orgId)

            if (!isMember) {
                return null;
            }
            
        } else {
            if(project?.tokenIdentifier !== userId) {
                return null;
            }
        }

        return project;
    } 
})




export const sendMessage = mutation({
    args: {
        message: v.string(),
        author: v.object({
            sentBy: v.string(),
            image: v.string(),
        }),
        projectId: v.id('projects')
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if(!userId) {
            throw new ConvexError('Not authenticated!')
        }

        const userInfo = await ctx.auth.getUserIdentity();
        
        await ctx.db.insert('messages', {
            message: args.message,
            author: {
                sentBy: userInfo?.name ?? '',
                image: userInfo?.pictureUrl ?? '',
            },
            projectId: args.projectId,
        });
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