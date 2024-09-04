'use client'

import { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { Card, CardContent, CardHeader } from "./ui/card"
import { AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"

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
      <p
        ref={textRef}
        className={`leading-6 ${
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
        {text}
      </p>
      {isTruncated && (
        <Button
          variant="link"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 p-0 h-auto font-normal text-blue-400"
        >
          {isExpanded ? 'View less' : 'View more'}
        </Button>
      )}
    </div>
  )
}

export default function PostCard({
  name,
  image,
  body,
  date
}: {
  name: string, 
  image: string, 
  body: string,
  date: string,
}) {

  return (
    <Card className="p-0 ml-2 shadow-none border-t-0 border-l-0 border-r-0 border-b border-muted-background rounded-none w-full">
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

      <CardContent className="p-0 mt-4 text-sm pb-12">
        <TruncatedText text={body} />
      </CardContent>
    </Card>
  )
}