import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const createPost = mutation({
    args: { 
      author: v.object({
        userId: v.string(),
        userName: v.string(),
        userImg: v.string(),
      }),
      body: v.string(),
    },
    handler: async (ctx, args) => {
      const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
  
      if(!userId) {
        throw new ConvexError('Not authenticated!')
      }
  
      const userInfo = await ctx.auth.getUserIdentity();
  
      await ctx.db.insert("posts", {
        author: {
          userId: userId,
          userName: userInfo?.name ?? '',
          userImg: userInfo?.pictureUrl ?? '',
        },
        body: args.body,
      });
    },
});

export const getPosts = query({
    args: {},
    async handler(ctx, args) {
        const posts = await ctx.db
            .query('posts')
            .order('desc')
            .collect();

        return posts;
    }
})

export const addLike = mutation({
    args: { 
      postId: v.id('posts'),
      userId: v.string(),
      userImg: v.string(),
      userName: v.string(),
    },
    handler: async (ctx, args) => {
      const post = await ctx.db.get(args.postId);
      if (!post) throw new Error('Post not found');
  
      const newLike = {
        userId: args.userId,
        userImg: args.userImg,
        userName: args.userName,
      };
  
      const updatedLikes = [...(post.likes || []), newLike];
  
      await ctx.db.patch(args.postId, { likes: updatedLikes });
  
      return updatedLikes.length;
    },
});

export const deletePost = mutation({
  args: {
    postId: v.id('posts')
  },
  async handler(ctx, args) {
    await ctx.db.delete(args.postId)
  }
})