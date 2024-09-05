'use client'

import React from 'react';
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
import { Lock } from 'lucide-react';

export default function Feed() {
    const posts = useQuery(api.posts.getPosts);
    
    const { user } = useUser();

    return (
        <main className="flex flex-col pt-24 px-4 max-w-2xl">
            <Authenticated>
                <Tabs defaultValue="feed" className="">
                    <TabsList className="w-fit flex justify-between sm:gap-2">
                        <TabsTrigger value="feed">Feed</TabsTrigger>
                        <TabsTrigger value="bookmarked" disabled>Bookmarks <Lock className="ml-2 h-3 w-3" /></TabsTrigger>
                    </TabsList>
                    <TabsContent value="feed">
                        <div className="mt-8 space-y-8">
                            <CreatePost />
                            {posts && (
                                posts.map((post) => {
                                    const userHasLiked = (post.likes ?? []).some((like) => like.userId === user?.id);
                                    return (
                                        <div key={post._id} className="flex justify-between items-start">
                                            
                                            <PostCard 
                                                postId={post._id as Id<'posts'>}
                                                
                                                name={`${post.author.userName}`}
                                                image={`${post.author.userImg}`}
                                                body={`${post.body}`}
                                                date={`${timeAgo(post._creationTime)}`}

                                                likes={`${post.likes?.length}`}
                                                comments={`${post.commentsCount}`}

                                                userHasLiked={userHasLiked}
                                            />
                                            {post.author.userId.includes(user?.id as string) && (
                                                <PostActions id={post._id} />
                                            )}
                                            
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="bookmarked">
                        <div className="mt-8">
                            saved.
                        </div>
                    </TabsContent>
                </Tabs>
            </Authenticated>
        </main>
    )
}