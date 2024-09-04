import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const newComment = mutation({
    args: {
        postId: v.id('posts'),
        author: v.object({
            userId: v.string(),
            userName: v.string(),
            userImg: v.string(),
          }),
        comment: v.string(),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
  
        if(!userId) {
          throw new ConvexError('Not authenticated!')
        }
    
        const userInfo = await ctx.auth.getUserIdentity();

        await ctx.db.insert('comments', {
            postId: args.postId,
            author: {
                userId: userId,
                userName: userInfo?.name ?? '',
                userImg: userInfo?.pictureUrl ?? '',
            },
            comment: args.comment,
        })
    }
})

export const getComments = query({
    args: {
        postId: v.id('posts')
    },
    async handler(ctx, args) {
        const tasks = await ctx.db.query('comments')
        .withIndex('by_postId', (q) => 
            q.eq('postId', args.postId)    
        )
        .order('asc')
        .collect();

        return tasks;
    }
});

export const deleteComment = mutation({
    args: {
        commentId: v.id('comments')
    },
    async handler(ctx, args) {
        await ctx.db.delete(args.commentId)
    },
})