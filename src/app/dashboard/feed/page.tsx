'use client'

import React, { useEffect } from 'react';
import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs"
import { Authenticated, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api"
import PostCard from '@/components/post-card';
import { timeAgo } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { PostActions } from '@/components/post-actions';
import { CreatePost } from '@/components/create-post';
import { Id } from '../../../../convex/_generated/dataModel';
import SkeletonPost from '@/components/skeleton-post';

type Post = {
    _id: Id<"posts">;
    _creationTime: number;
    author: {
        userId: string;
        userImg: string;
        userName: string;
    };
    body: string;
    likes?: Array<{
        userId: string;
        userImg: string;
        userName: string;
    }>;
    commentsCount: number;
    bookmarksCount: number;
};

export default function Feed() {
    const { user } = useUser();
    const posts = useQuery(api.posts.getPosts) as Post[] | undefined;
    const bookmarkedPostIds = useQuery(api.bookmarks.getUserBookmarks) as string[] | undefined;
    
    const renderPosts = (postsToRender: Post[] | undefined) => {
        if (!postsToRender || postsToRender.length === 0) {
            return <p className="text-muted-foreground text-sm">No posts found.</p>;
        }
        
        return postsToRender.map((post) => {
            const userHasLiked = post.likes?.some(like => like.userId === user?.id) ?? false;

            return (
                <div key={post._id} className="flex justify-between items-start">
                    <PostCard 
                        postId={post._id}
                        name={post.author.userName}
                        image={post.author.userImg}
                        body={post.body}
                        date={timeAgo(post._creationTime)}
                        likes={post.likes?.length.toString() ?? '0'}
                        comments={post.commentsCount.toString()}
                        userHasLiked={userHasLiked}
                    />
                    {post.author.userId.includes(user?.id as string) && (
                        <PostActions id={post._id} />
                    )}
                </div>
            );
        });
    };

    const renderBookmarkedPosts = () => {
        if (!bookmarkedPostIds || bookmarkedPostIds.length === 0) {
            return <p className="text-muted-foreground text-sm">No bookmarked posts found.</p>;
        }
    
        if (!posts || posts.length === 0) {
            return <p className="text-muted-foreground text-sm">No posts available.</p>;
        }
    
        const filteredPosts = posts.filter(post => {
            const isBookmarked = bookmarkedPostIds.includes(post._id.toString());
            return isBookmarked;
        });
        
        if (filteredPosts.length === 0) {
            return <p className="text-muted-foreground text-sm">No matching bookmarked posts found.</p>;
        }
    
        return renderPosts(filteredPosts);
    };
    
    return (
        <main className="flex flex-col pt-24 px-4 max-w-2xl">
            <Authenticated>
                <Tabs defaultValue="feed" className="">
                    <TabsList className="w-fit flex justify-between sm:gap-2">
                        <TabsTrigger value="feed">Feed</TabsTrigger>
                        <TabsTrigger value="bookmarked">Bookmarks</TabsTrigger>
                    </TabsList>
                    <TabsContent value="feed">
                        <div className="mt-8 space-y-8">
                            <CreatePost />
                            {posts === undefined ? <SkeletonPost /> : renderPosts(posts)}
                        </div>
                    </TabsContent>
                    <TabsContent value="bookmarked">
                        <div className="mt-8 space-y-8">
                            {bookmarkedPostIds === undefined ? <SkeletonPost /> : renderBookmarkedPosts()}
                        </div>
                    </TabsContent>
                </Tabs>
            </Authenticated>
        </main>
    );
}