'use client'

import { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import LinkFormatter from './link-formatter'
import { CornerRightDown, CornerRightUp, Heart, MessageCircle } from 'lucide-react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { Id } from '../../convex/_generated/dataModel'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function TruncatedText({ text, maxLines = 4 }: { text: string; maxLines?: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight)
        const maxHeight = lineHeight * maxLines
        setIsTruncated(textRef.current.scrollHeight > maxHeight)
      }
    }

    checkTruncation()
    window.addEventListener('resize', checkTruncation)
    return () => window.removeEventListener('resize', checkTruncation)
  }, [maxLines, text])

  return (
    <div>
      <div
        ref={textRef}
        className={`leading-6 whitespace-pre-wrap break-words ${
          !isExpanded && isTruncated
            ? `overflow-hidden`
            : ''
        }`}
        style={
          !isExpanded && isTruncated
            ? {
                display: '-webkit-box',
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: 'vertical',
              }
            : {}
        }
      >
        <LinkFormatter postBody={text} />
      </div>
      {isTruncated && (
        <Button
          variant="link"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-2 p-0 h-auto font-normal text-blue-400 ${isExpanded ? 'mt-8' : 'mt-2'}`}
        >
          <span>{isExpanded ? `View less` : `View more`}</span>
          {isExpanded ? 
            <CornerRightUp className="w-4 h-4 mb-2" /> 
            : 
            <CornerRightDown className="w-4 h-4 mt-2" /> 
          }
        </Button>
      )}
    </div>
  )
}

export default function PostCard({
  name,
  image,
  body,
  date,
  likes, 
  comments,
  postId,
  userHasLiked,
}: {
  name: string, 
  image: string, 
  body: string,
  date: string,
  likes: string, 
  comments: string,
  postId: Id<'posts'>,
  userHasLiked: boolean,
}) {

  const { user } = useUser();
  const pathname = usePathname();

  const likePost = useMutation(api.posts.addLike);
  const removeLike = useMutation(api.posts.removeLike);

  const commentCount = useQuery(api.comments.getComments, { postId: postId });

  return (
    <Card className="p-0 shadow-none border-t-0 border-l-0 border-r-0 border-b border-muted-background rounded-none w-full">
      <CardHeader className="p-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="">
              <AvatarImage 
                src={image} 
                alt={`${name}'s picture`} 
                className="w-8 h-8 rounded-full"
              />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="">{name}</span>
              <span className="text-xs text-muted-foreground">{date}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 mt-4 text-sm pb-8">
        <TruncatedText text={body} />
      </CardContent>

      <CardFooter className='p-0 pb-4'>
        <div className="flex justify-between w-full">

          <div className="flex items-center gap-6">
            {userHasLiked ? (
              <Button variant='ghost' 
                className='p-0 h-fit hover:bg-transparent transition-colors duration-150 text-red-500 hover:text-red-500'
                onClick={() => {
                  removeLike({
                    userId: user?.id as string,
                    userImg: user?.imageUrl as string, 
                    userName: user?.fullName as string,
                    postId: postId as Id<'posts'>,
                  })
                }}
              ><Heart className="w-5 h-5" />
              </Button>
            ): (
              <Button variant='ghost' 
                className='p-0 h-fit hover:bg-transparent hover:text-red-500 transition-colors duration-150 '
                onClick={() => {
                  likePost({
                    userId: user?.id as string,
                    userImg: user?.imageUrl as string, 
                    userName: user?.fullName as string,
                    postId: postId as Id<'posts'>,
                  })
                }}
              ><Heart className="w-5 h-5" />
              </Button>
            )}
            {pathname.includes(`${postId}`) ? (
              <></>
            ) : (
              <Link href={`/dashboard/feed/${postId}`}
              className="p-0 h-fit hover:bg-transparent hover:text-blue-400 transition-colors duration-150"
              ><MessageCircle className='w-5 h-5' />
              </Link>
            )}
          </div>

          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <p>{likes} likes</p>
            <p>&bull;</p>
            <p>{commentCount?.length} comments</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
