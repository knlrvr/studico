import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
})

export const uploadFile = mutation({
    args: {
        storageId: v.id('_storage'),
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

export const uploadFileToProject = mutation({
    args: {
        name: v.string(),
        type: v.string(),
        storageId: v.id('_storage'),
        projectId: v.optional(v.id('projects')),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

        if(!userId) {
            throw new ConvexError('Not authenticated!')
        }

        let file: Id<"files">;

        if (args.projectId) {

            file = await ctx.db.insert('files', {
                name: args.name,
                type: args.type,
                storageId: args.storageId as Id<"_storage">,
                projectId: args.projectId,
            });
        } else { 
            file = await ctx.db.insert('files', {
                name: args.name,
                type: args.type,
                storageId: args.storageId as Id<"_storage">,
                tokenIdentifier: userId,
            })
        }
        
    },
});

export const uploadFileToUser = mutation({
    args: {
        name: v.string(),
        type: v.string(),
        storageId: v.id('_storage'),
        projectId: v.optional(v.id('projects')),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

        if(!userId) {
            throw new ConvexError('Not authenticated!')
        }

        let file: Id<"files">;

        if (args.projectId) {

            file = await ctx.db.insert('files', {
                name: args.name,
                type: args.type,
                storageId: args.storageId as Id<"_storage">,
                projectId: args.projectId,
            });
        } else { 
            file = await ctx.db.insert('files', {
                name: args.name,
                type: args.type,
                storageId: args.storageId as Id<"_storage">,
                tokenIdentifier: userId,
            })
        }
        
    },
});

export const getFilesForUser = query({ 
    args: {
        query: v.optional(v.string()),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if(!userId) {
            return [];
        }
        
        const files = await ctx.db
            .query('files')
            .withIndex('by_tokenIdentifier', (q) => q
                .eq('tokenIdentifier', userId )
            )
            .order('desc') 
            .collect();

            const query = args.query;

            if (query) {
                const filteredFiles = files.filter(file => file.name.includes(query as string));
            
                return Promise.all(
                    filteredFiles.map(async (file) => ({
                        ...file,
                        fileUrl: await ctx.storage.getUrl(file.storageId)
                    }))
                );
            }

            return Promise.all(
                files.map(async (file) => ({
                    ...file,
                    fileUrl: await ctx.storage.getUrl(file.storageId)
                }))
            );
    }
})


export const getRecentFilesForUser = query({
    args: {},
    async handler(ctx) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if(!userId) {
            return [];
        }
        
        const recentFiles = await ctx.db
            .query('files')
            .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', userId ))
            .order('desc') 
            .take(3);

        return Promise.all(
            recentFiles.map(async (file) => ({
                ...file,
                fileUrl: await ctx.storage.getUrl(file.storageId)
            }))
        );
    }
});

export const getFilesForProject = query({ 
    args: {
        projectId: v.id('projects'),
        query: v.optional(v.string()),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if(!userId) {
            return [];
        }
        
        const files = await ctx.db
            .query('files')
            .withIndex('by_projectId', (q) => q
                .eq('projectId', args.projectId )
            ) 
            .order('desc')
            .collect();

            const query = args.query;

            if (query) {
                const filteredFiles = files.filter(file => file.name.includes(query as string));
            
                return Promise.all(
                    filteredFiles.map(async (file) => ({
                        ...file,
                        fileUrl: await ctx.storage.getUrl(file.storageId)
                    }))
                );
            }
            
            return Promise.all(
                files.map(async (file) => ({
                    ...file,
                    fileUrl: await ctx.storage.getUrl(file.storageId)
                }))
            );
    }
});

export const getRecentFilesForProject = query({ 
    args: {
        projectId: v.id('projects')
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if(!userId) {
            return [];
        }
        
        const recentFiles = await ctx.db
            .query('files')
            .withIndex('by_projectId', (q) => q
                .eq('projectId', args.projectId )
            ) 
            .order('desc')
            .take(5);

        return Promise.all(
            recentFiles.map(async (file) => ({
                ...file,
                fileUrl: await ctx.storage.getUrl(file.storageId)
            }))
        );
    }
});

export const deleteFile = mutation({
    args: {
        fileId: v.id('files'),
        storageId: v.id('_storage')
    },
    async handler(ctx, args) {
        await ctx.storage.delete(args.storageId);
        await ctx.db.delete(args.fileId);
    }
})