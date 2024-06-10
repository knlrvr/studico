import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createTask = mutation({
    args: {
        projectId: v.id('projects'),
        title: v.string(),
        description: v.optional(v.string()),
        category: v.string(),
        priority: v.string(),
        status: v.string(),
        // cannot change
        createdBy: v.object({
            userId: v.string(),
            userImg: v.string(),
            userName: v.string(),
        }),
        // user can change
        assignedTo: v.optional(v.object({
            userId: v.string(),
            userImg: v.string(),
            userName: v.string(),
        })),
        // cannot change
        completedBy: v.optional(v.object({
            userId: v.string(),
            userImg: v.string(),
            userName: v.string(),
        }))
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if(!userId) {
            throw new ConvexError(
                'Not authenticated!'
            )
        }

        const userInfo = await ctx.auth.getUserIdentity();

        await ctx.db.insert('tasks', {
            projectId: args.projectId,
            title: args.title,
            description: args.description as string,
            category: args.category,
            priority: args.priority,
            status: args.status,
            createdBy: {
                userId: userInfo?.tokenIdentifier as string,
                userImg: userInfo?.pictureUrl as string,
                userName: userInfo?.name ?? userInfo?.preferredUsername as string,
            }
        })
    }
});

export const getTasks = query({
    args: {
        projectId: v.id('projects')
    },
    async handler(ctx, args) {
        const tasks = await ctx.db.query('tasks')
        .withIndex('by_projectId', (q) => 
            q.eq('projectId', args.projectId)    
        )
        .order('desc')
        .collect();

        return tasks;
    }
});

export const orderTasksByAge = query({
    args: {
        projectId: v.id('projects')
    },
    async handler(ctx, args) {
        await ctx.db.query('tasks')
        .withIndex('by_projectId', (q) => 
            q.eq('projectId', args.projectId)    
        )
        .order('asc')
        .collect();
    }
});

// possible other mutations ?? we'll see

// export const editTask = mutation({

// });

// export const assignTask = mutation({

// });

// export const completeTask = mutation({

// });

// export const deleteTask = mutation({

// });