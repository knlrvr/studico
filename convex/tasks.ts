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
        completeByDate: v.string(),

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
            completeByDate: args.completeByDate,
            priority: args.priority,
            status: args.status,
            createdBy: {
                userId: userInfo?.tokenIdentifier as string,
                userImg: userInfo?.pictureUrl as string,
                userName: userInfo?.name ?? userInfo?.preferredUsername as string,
            },
            assignedTo: {
                userId: args.assignedTo?.userId as string,
                userImg: args.assignedTo?.userImg as string,
                userName: args.assignedTo?.userName as string,
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

export const editTask = mutation({
    args: {
        taskId: v.id('tasks'),
        title: v.string(),
        description: v.optional(v.string()),
        category: v.string(),
        priority: v.string(),
        status: v.string(),
        completeByDate: v.string(),
        assignedTo: v.optional(v.object({
            userId: v.string(),
            userImg: v.string(),
            userName: v.string(),
        })),
    },
    async handler(ctx, args) {
        const { taskId } = args;
        const user = (await ctx.auth.getUserIdentity());

        if(!user) {
            throw new ConvexError(
                'Not authenticated!'
            )
        }

        const newDetails = await ctx.db
            .patch(taskId, {
                title: args.title,
                description: args.description,
                category: args.category,
                priority: args.priority,
                status: args.status,
                completeByDate: args.completeByDate,
                assignedTo: {
                    userId: args.assignedTo?.userId as string,
                    userImg: args.assignedTo?.userImg as string,
                    userName: args.assignedTo?.userName as string,
                }
            })

        return newDetails;
    }
});

export const getIncompletedTasks = query({
    args: {
        projectId: v.id('projects'),
        status: v.string(),
    },
    async handler(ctx, args) {
        const completedTasks = await ctx.db.query('tasks')
        .withIndex('by_projectId_status', (q) => 
                q.eq("projectId", args.projectId).eq("status", args.status)
            )
        .order('desc')
        .collect();

    return completedTasks;
    }
})

export const getCompletedTasks = query({
    args: {
        projectId: v.id('projects'),
        status: v.string(),
    },
    async handler(ctx, args) {
        const completedTasks = await ctx.db.query('tasks')
        .withIndex('by_projectId_status', (q) => 
                q.eq("projectId", args.projectId).eq("status", args.status)
            )
        .order('desc')
        .collect();

    return completedTasks;
    }
})

// export const getTasksByDueDate = query({
//     args: {
//         projectId: v.id('projects'),
//     },
//     async handler(ctx, args) {
//         const user = (await ctx.auth.getUserIdentity());

//         if(!user) {
//             throw new ConvexError(
//                 'Not authenticated!'
//             )
//         }

//         const tasks = await ctx.db.query('tasks')
//         .withIndex('by_projectId_completeByDate', (q) => 
//                 q.eq("projectId", args.projectId)
//             )
//         .order('desc')
//         .collect();

//     return tasks;
//     }
// })

export const orderTasksByDueDate = query({
    args: {
        projectId: v.id('projects'),
        sortOrder: v.union(v.literal("asc"), v.literal("desc")), // Accept sortOrder as an argument
    },
    async handler(ctx, args) {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError('Not authenticated!');
        }

        // Use the database index and sort by completeByDate directly
        const tasks = await ctx.db.query('tasks')
            .withIndex('by_projectId_completeByDate', (q) =>
                q.eq("projectId", args.projectId)
            )
            .order(args.sortOrder === "desc" ? "desc" : "asc")
            .collect();

        return tasks;
    }
});



export const completeTask = mutation({
    args: {
        taskId: v.id('tasks')
    },
    async handler(ctx, args) {
        const { taskId } = args;
        const newStatus = await ctx.db
            .patch(taskId, {
                status: 'Completed'
            })

        return newStatus;
    }
});

export const reactivateTask = mutation({
    args: {
        taskId: v.id('tasks')
    },
    async handler(ctx, args) {
        const { taskId } = args;
        const newStatus = await ctx.db
            .patch(taskId, {
                status: 'Incomplete'
            })

        return newStatus;
    }
});

export const editPriority = mutation({
    args: {
        taskId: v.id('tasks'),
        priority: v.string(),
    },
    async handler(ctx, args) {
        const { taskId } = args;
        const newPriority = await ctx.db
            .patch(taskId, {
                priority: args.priority,
            })

        return newPriority;
    }
});

export const getCurrentTask = query({
    args: {
        taskId: v.id('tasks')
    },
    async handler(ctx, args) {
        const { taskId } = args;
        const currentTask = await ctx.db
            .get(taskId)

        return currentTask;
    }
});

export const getUserTasks = query({
    args: {
        projectId: v.id('projects'),
    },
    async handler(ctx, args) {
        const user = (await ctx.auth.getUserIdentity());

        if(!user) {
            throw new ConvexError(
                'Not authenticated!'
            )
        }

        const tasks = await ctx.db.query('tasks')
        .withIndex('by_projectId_assignedTo', (q) => 
                q.eq("projectId", args.projectId).eq("assignedTo.userId", user.tokenIdentifier)
            )
        .order('desc')
        .collect();

    return tasks;
    }
})

export const deleteTask = mutation({
    args: {
        taskId: v.id('tasks'),
    },
    async handler(ctx, args) {
        await ctx.db.delete(args.taskId);
    }
})