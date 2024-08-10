import { MutationCtx, QueryCtx, mutation, query } from './_generated/server'
import { ConvexError, v } from 'convex/values'
import { Id } from './_generated/dataModel'

// interface Project {
//     _id: string;
//     orgId?: string;
//     tokenIdentifier?: string;
//     members?: Array<{
//         userId: string;
//         userImg: string;
//         userName: string;
//     }>;
// }

export const createProject = mutation({
    args: {
        title: v.string(),
        orgId: v.optional(v.string()),
        category: v.optional(v.array(v.string())),
    },
    async handler(ctx, args) {

        const user = (await ctx.auth.getUserIdentity());

        if(!user) {
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
                members: [
                    {
                        userId: user?.tokenIdentifier as string,
                        userImg: user?.pictureUrl as string,
                        userName: user?.name as string,
                    }
                ],
            });
        } else { 
            projectId = await ctx.db.insert('projects', {
                title: args.title,
                tokenIdentifier: user?.tokenIdentifier,
                members: [
                    {
                        userId: user?.tokenIdentifier as string,
                        userImg: user?.pictureUrl as string,
                        userName: user?.name as string,
                    }
                ],
            })
        }
        
    },
});

export const getProjects = query({
    args: {
        orgId: v.optional(v.string()),
        members: v.optional(
            v.array(v.object({
                userId: v.string(),
                userImg: v.string(),
                userName: v.string(),
            }))
        ),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if (!userId) {
            return []; 
        }

        const allProjects = await ctx.db.query('projects').order('desc').collect();

        if (args.orgId) {
            return allProjects.filter(project => project.orgId === args.orgId);
        } else {
            const userProjects = allProjects.filter(project =>
                (project.members?.some(member => member.userId === userId) ||
                project.tokenIdentifier === userId) &&
                !project.orgId
            );

            return userProjects;
        }
    },
});


export const getProject = query({
    args: {
        projectId: v.id('projects'),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if (!userId) {
            return null;
        }

        const project = await ctx.db.get(args.projectId);

        if (!project) {
            return null; 
        }

        if (project.orgId) {
            const isMember = await hasOrgAccess(ctx, project.orgId);
            if (!isMember) {
                return null; 
            }
        } else {
            if (project.tokenIdentifier !== userId) {
                const isMember = project.members?.some(member => member.userId === userId);
                if (!isMember) {
                    return null; 
                }
            }
        }

        return project; 
    }
});


export const sendMessage = mutation({
    args: {
        message: v.string(),
        author: v.object({
            sentBy: v.string(),
            image: v.string(),
            tokenIdentifier: v.string(),
        }),
        isEdited: v.boolean(),
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
            isEdited: false,
            author: {
                sentBy: userInfo?.name ?? '',
                image: userInfo?.pictureUrl ?? '',
                tokenIdentifier: userId,
            },
            projectId: args.projectId,
        });
    },
});

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
});

export const editMessage = mutation({
    args: {
        messageId: v.id('messages'),
        message: v.string(),
        isEdited: v.boolean(),
    },
    async handler(ctx, args) {
        const { messageId } = args;

        const editedMessage = await ctx.db
            .patch(messageId, {
                message: args.message,
                isEdited: true,
            })

        return editedMessage;
    }
})

export const deleteMessage = mutation({
    args: {
        messageId: v.id('messages'),
    },
    async handler(ctx, args) {
        await ctx.db.delete(args.messageId)
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

export const isMemberOfProject = async (
    ctx: MutationCtx | QueryCtx,
    projectId: Id<"projects">
) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
        return false;
    }

    const project = await ctx.db.get(projectId);

    if (!project || !project.members) {
        return false;
    }

    return project.members.some(member => member.userId === userId);
}

export const deleteProject = mutation({
    args: {
        projectId: v.id('projects'),
    },
    async handler(ctx, args) {
        await ctx.db.delete(args.projectId)
    },
});