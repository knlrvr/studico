import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const bookmarkPost = mutation({
    args: { postId: v.id('posts') },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Not authenticated");
      }
      const userId = identity.subject;
  
      // Check if the bookmark already exists
      const existingBookmark = await ctx.db
        .query("bookmarks")
        .withIndex("by_userId_postId", (q) => 
          q.eq("userId", userId).eq("postId", args.postId)
        )
        .unique();
  
      if (existingBookmark) {
        return [];
      }
  
      // Create the bookmark
      await ctx.db.insert("bookmarks", {
        userId,
        postId: args.postId,
      });
  
      // Fetch the current post
      const post = await ctx.db.get(args.postId);
      
      if (!post) {
        throw new Error(`Post with id ${args.postId} not found`);
      }
  
      // Increment the bookmarks count on the post
      const currentCount = post.bookmarksCount ?? 0;
      await ctx.db.patch(args.postId, {
        bookmarksCount: currentCount + 1,
      });
    },
  });
  

export const removeBookmark = mutation({
    args: { postId: v.id('posts') },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Not authenticated");
      }
      const userId = identity.subject;
  
      // Find and delete the bookmark
      const bookmark = await ctx.db
        .query("bookmarks")
        .withIndex("by_userId_postId", (q) => 
          q.eq("userId", userId).eq("postId", args.postId)
        )
        .unique();
  
      if (bookmark) {
        await ctx.db.delete(bookmark._id);
  
        // Fetch the current post
        const post = await ctx.db.get(args.postId);
        
        if (post) {
          // Safely decrement the bookmarks count on the post
          const currentCount = post.bookmarksCount ?? 0;
          await ctx.db.patch(args.postId, {
            bookmarksCount: Math.max(currentCount - 1, 0),
          });
        } else {
          console.error(`Post with id ${args.postId} not found`);
        }
      }
    },
});

export const getUserBookmarks = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;

    const bookmarks = await ctx.db
      .query("bookmarks")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    const postIds = bookmarks.map(bookmark => bookmark.postId.toString());

    return postIds;
  },
});

export const isPostBookmarked = query({
  args: { postId: v.id('posts') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return false;
    }
    const userId = identity.subject;

    const bookmark = await ctx.db
      .query("bookmarks")
      .withIndex("by_userId_postId", (q) => 
        q.eq("userId", userId).eq("postId", args.postId)
      )
      .unique();

    return !!bookmark;
  },
});