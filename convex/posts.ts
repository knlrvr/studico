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

    const postId = await ctx.db.insert("posts", {
      author: {
        userId: userId,
        userName: userInfo?.name ?? '',
        userImg: userInfo?.pictureUrl ?? '',
      },
      body: args.body,
      likes: [],
      commentsCount: 0,
      bookmarksCount: 0,
    });

    return postId;
  },
});

export const updatePostImage = mutation({
  args: {
    postId: v.id('posts'),
    storageId: (v.id('_storage')),
    name: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
        throw new ConvexError('Not authenticated!')
    }

    await ctx.db.patch(args.postId, {
      picture: args.storageId,
    });

    await ctx.db.insert('files', {
      name: args.name,
      type: 'image',
      storageId: args.storageId,
      postId: args.postId,
      tokenIdentifier: userId,
    });
  }
});

export const getPosts = query({
  args: {},
  async handler(ctx) {
    
    const posts = await ctx.db
      .query('posts')
      .order('desc')
      .collect();

    return posts;
  }
});

export const getPostWithImage = query({
  args: { postId: v.id('posts') },
  async handler(ctx, args) {
    // Fetch the post
    const post = await ctx.db.get(args.postId)
    
    if (!post) {
      throw new Error('Post not found')
    }

    // Fetch the associated file (image) for the post
    const file = await ctx.db
      .query('files')
      .withIndex('by_postId', (q) => q.eq('postId', args.postId))
      .first()

    let imageUrl = null
    if (file) {
      // Get the URL for the image
      imageUrl = await ctx.storage.getUrl(file.storageId)
    }

    // Return the post with the image URL
    return {
      ...post,
      imageUrl
    }
  }
})

export const getPost = query({
  args: {
      postId: v.id('posts')
  },
  async handler(ctx, args) {
      const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

      if (!userId) {
          return null;
      }

      const post = await ctx.db.get(args.postId);

      if (post && post.picture) {
          return {
              ...post,
              imageUrl: await ctx.storage.getUrl(post.picture),
          };
      }

      return post;
  }
});

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

    // Check if the user has already liked the post
    const hasLiked = post.likes?.some((like) => like.userId === args.userId);

    if (hasLiked) {
      return [];
    }

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

export const removeLike = mutation({
  args: {
    postId: v.id('posts'),
    userId: v.string(),
    userImg: v.string(),
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    // Fetch the current post
    const post = await ctx.db.get(args.postId);
    if (!post) throw new Error('Post not found');

    // Check if the user has liked the post
    const existingLikeIndex = post.likes?.findIndex((like) => like.userId === args.userId);

    if (existingLikeIndex === undefined || existingLikeIndex === -1) {
      return post.likes?.length ?? 0;
    }

    const updatedLikes = (post.likes || []).filter((like, index) => index !== existingLikeIndex);

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