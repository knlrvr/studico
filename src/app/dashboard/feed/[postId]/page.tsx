'use client'

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import PostCard from "@/components/post-card";
import { PostActions } from "@/components/post-actions";
import { timeAgo } from "@/lib/utils";
import Image from "next/image";
import NewCommentForm from "@/components/new-comment-form";


export default function PostPage({
    params,
}: {
    params: {
        postId: Id<'posts'>
    }
}) {

    const post = useQuery(api.posts.getPost, { postId: params.postId });
    const allComments = useQuery(api.comments.getComments, { postId: params.postId })
    const { user } = useUser();

    const userHasLiked = (post?.likes ?? []).some((like) => like.userId === user?.id);

    return (
        <>
        {post !== undefined && post !== null && (
            <main className="flex flex-col pt-24 px-4 items-start max-w-2xl pb-8">
            <Link href='/dashboard/feed'
                className="text-sm flex items-center gap-2 mb-4 text-muted-foreground hover:text-blue-400 hover:underline underline-offset-4 transition-all duration-150"    
            >
                <MoveLeft className="w-4 h-4" />
                <span>Back</span>
            </Link>

            <div className="flex items-start w-full">
                <PostCard 
                    postId={post?._id as Id<'posts'>}
                                                    
                    name={`${post?.author.userName}`}
                    image={`${post?.author.userImg}`}
                    body={`${post?.body}`}
                    date={`${timeAgo(post._creationTime)}`}

                    likes={`${post?.likes?.length}`}
                    comments={`${post?.commentsCount}`}

                    userHasLiked={userHasLiked}
                />
                {post.author.userId.includes(user?.id as string) && (
                    <PostActions id={post._id} />
                )}
            </div>

            {/* dont forget to add filtering for old comments or a bunch of comments lol */}
            <div className="flex flex-col items-start space-y-4 w-full mt-6">
                {allComments?.map((comment) => (
                    <div key={comment._id}
                        className="flex gap-2 w-full"
                    >
                        <Image 
                            src={`${comment.author.userImg}`}
                            alt={`${comment.author.userName}'s image`}
                            width={1000}
                            height={1000}
                            className="h-8 w-8 rounded-full"
                        />
                        <div className="flex flex-col">
                            <div className="flex flex-col space-y-1 bg-neutral-200 dark:bg-[#222] dark:bg-opacity-50 w-fit rounded-lg px-3 py-1.5 pb-2">
                                <span className="text-sm text-neutral-500 dark:text-muted-foreground font-medium">{comment.author.userName}</span>
                                <p className="text-sm tracking-wide">{comment.comment}</p>
                            </div>

                            <span className="text-muted-foreground text-xs ml-3 mt-1">{timeAgo(comment._creationTime)}</span>
                        </div>
                        
                    </div>
                ))}
            </div>
            <NewCommentForm postId={params.postId}/>
        </main>
        )}
        </>
    )
}