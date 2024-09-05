'use client'

import { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import LinkFormatter from './link-formatter'
import { Bookmark, CornerRightDown, CornerRightUp, Heart, MessageCircle } from 'lucide-react'
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
  const checkBookmark = useQuery(api.bookmarks.isPostBookmarked, { postId: postId });

  const addBookmark = useMutation(api.bookmarks.bookmarkPost);
  const removeBookmark = useMutation(api.bookmarks.removeBookmark);

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
              <span className="text-sm font-medium">{name}</span>
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
                className='p-0 h-fit hover:bg-transparent transition-colors duration-150'
                onClick={() => {
                  removeLike({
                    userId: user?.id as string,
                    userImg: user?.imageUrl as string, 
                    userName: user?.fullName as string,
                    postId: postId as Id<'posts'>,
                  })
                }}
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
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

            {checkBookmark ? (
              <Button
                onClick={() => {
                  removeBookmark({
                    postId: postId,
                  })
                }}
                className={`p-0 h-fit bg-transparent hover:bg-transparent text-amber-300`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fcd34d" stroke="#fcd34d" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  addBookmark({ postId: postId })
                }}
                className={`p-0 h-fit bg-transparent hover:bg-transparent text-primary`}
              ><Bookmark className="w-5 h-5" /></Button>
            )}



          </div>

          {pathname.includes(`${postId}`) ? (
            <div 
              className="text-xs text-muted-foreground flex items-center gap-1">
              <p>{likes} likes</p>
              <p>&bull;</p>
              <p>{commentCount?.length} comments</p>
            </div>
          ) : (
            <Link href={`/dashboard/feed/${postId}`}
              className="text-xs text-muted-foreground flex items-center gap-1">
              <p>{likes} likes</p>
              <p>&bull;</p>
              <p>{commentCount?.length} comments</p>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
