import { mutation } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Called storeUser without authentication present");
      }

      const existingUser = await ctx.db
        .query("users")
        .withIndex("by_tokenIdentifier", (q) =>
          q.eq("tokenIdentifier", identity.tokenIdentifier)
        )
        .unique();

      if (existingUser) {
        if (existingUser.name !== identity.name) {
          await ctx.db.patch(existingUser._id, { name: identity.name });
        }
        return existingUser._id;
      }

      return await ctx.db.insert("users", {
        name: identity.name ?? '',
        img: identity.pictureUrl ?? '',
        email: identity.email ?? '',
        tokenIdentifier: identity.tokenIdentifier,
      });
    } catch (error) {
      console.error('Error storing user:', error);
      throw error;
    }
  },
});