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

export default function Feed() {
    const posts = useQuery(api.posts.getPosts);

    const { user } = useUser();

    return (
        <main className="flex flex-col pt-[5.9rem] px-4 max-w-2xl">
            <Authenticated>
                <Tabs defaultValue="feed" className="">
                    <TabsList className="w-fit flex justify-between sm:gap-2">
                        <TabsTrigger value="feed">Feed</TabsTrigger>
                        <TabsTrigger value="saved" disabled>Saved</TabsTrigger>
                    </TabsList>
                    <TabsContent value="feed">
                        <div className="mt-8 space-y-8">
                            <CreatePost />
                            {posts ? (
                                posts.map((post) => (
                                    <div key={post._id} className="flex justify-between items-start">
                                        <PostCard 
                                            name={`${post.author.userName}`}
                                            image={`${post.author.userImg}`}
                                            body={`${post.body}`}
                                            date={`${timeAgo(post._creationTime)}`}
                                        />
                                        {post.author.userId.includes(user?.id as string) && (
                                            <PostActions id={post._id} />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>no</p>
                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="saved">
                        <div className="mt-8">
                            saved.
                        </div>
                    </TabsContent>
                </Tabs>
            </Authenticated>
        </main>
    )
}
