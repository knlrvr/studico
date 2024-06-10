import { mutation } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Check if we've already stored this identity before.
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q
          .eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (existingUser !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (existingUser.name !== identity.name) {
        await ctx.db.patch(existingUser._id, { name: identity.name });
      }
      return existingUser._id;
    }

    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      name: identity.name ?? '',
      img: identity.pictureUrl ?? '',
      email: identity.email ?? '',
      tokenIdentifier: identity.tokenIdentifier,
    });
  },
});