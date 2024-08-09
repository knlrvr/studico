import { MutationCtx, QueryCtx, mutation, query } from './_generated/server'
import { ConvexError, v } from 'convex/values'

export const sendProjectInvite = mutation({
    args: {
        projectId: v.id('projects'),
        projectName: v.string(),
        inviteeEmail: v.string(),
        inviterName: v.string(),
    },
    async handler(ctx, args) {
        const inviterId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if (!inviterId) {
            throw new ConvexError('Not authenticated!');
        }

        const project = await ctx.db.get(args.projectId);

        if (!project) {
            throw new ConvexError('Project not found');
        }

        if (project.orgId) {
            const isMember = await hasOrgAccess(ctx, project.orgId);

            if (!isMember) {
                throw new ConvexError('You do not have permission to invite members to this project.');
            }
        } else if (project.tokenIdentifier !== inviterId) {
            throw new ConvexError('You do not have permission to invite members to this project.');
        }

        await ctx.db.insert('invites', {
            projectId: args.projectId,
            projectName: args.projectName,
            inviteeEmail: args.inviteeEmail,
            inviterId: inviterId,
            inviterName: args.inviterName,
            status: 'pending'
        });
    }
});

export const getInvitesForUser = query({
    args: {
        userEmail: v.string(),
    },
    async handler(ctx, args) {
        const invites = await ctx.db.query('invites')
            .withIndex('by_inviteeEmail', (q) => q.eq('inviteeEmail', args.userEmail))
            .collect();

        return invites;
    }
});

export const acceptProjectInvite = mutation({
    args: {
        inviteId: v.id('invites')
    },
    async handler(ctx, args) {
        const userIdentity = await ctx.auth.getUserIdentity();
        const userId = userIdentity?.tokenIdentifier;

        if (!userId) {
            throw new ConvexError('Not authenticated!');
        }

        const invite = await ctx.db.get(args.inviteId);

        if (!invite) {
            throw new ConvexError('Invite not found');
        }

        if (invite.status !== 'pending') {
            throw new ConvexError('Invite is no longer valid');
        }

        const project = await ctx.db.get(invite.projectId);

        if (!project) {
            throw new ConvexError('Project not found');
        }

        const user = await ctx.db.query('users')
            .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', userId))
            .first();

        if (!user) {
            throw new ConvexError('User not found');
        }

        const members = project.members || [];
        const userIsAlreadyMember = members.some((member) => member.userId === userId);

        if (!userIsAlreadyMember) {
            members.push({
                userId: userId,
                userImg: user.img,
                userName: user.name,
            });
        }

        await ctx.db.patch(invite.projectId, {
            members: members,
        });

        await ctx.db.patch(args.inviteId, {
            status: 'accepted',
        });
    }
});

// 
// decline & delete are the same, but separating them by use case helps me (:
// 

export const declineProjectInvite = mutation({
    args: {
        inviteId: v.id('invites')
    },
    async handler(ctx, args) {
        await ctx.db.delete(args.inviteId)
    }
})

export const deleteProjectInvite = mutation({
    args: {         
        inviteId: v.id('invites')
    },
    async handler(ctx, args) {
        await ctx.db.delete(args.inviteId);
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

export const leaveProject = mutation({
    args: {
      projectId: v.id('projects'),
    },
    async handler(ctx, args) {
      const userIdentity = await ctx.auth.getUserIdentity();
      const userId = userIdentity?.tokenIdentifier;
  
      if (!userId) {
        throw new ConvexError('Not authenticated!');
      }
  
      const project = await ctx.db.get(args.projectId);
  
      if (!project) {
        throw new ConvexError('Project not found');
      }
  
      const members = project.members || [];
      const memberIndex = members.findIndex((member) => member.userId === userId);
  
      if (memberIndex === -1) {
        throw new ConvexError('You are not a member of this project');
      }
  
      members.splice(memberIndex, 1);
  
      await ctx.db.patch(args.projectId, {
        members: members,
      });
  
    // track members that leave for x time? idk

    }
  });