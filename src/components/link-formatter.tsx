import React from 'react'
import Link from 'next/link'

interface LinkFormatterProps {
  postBody: string
}

export default function LinkFormatter({ postBody }: LinkFormatterProps) {
  const urlRegex = /(https?:\/\/[^\s]+)/g

  const parts = postBody.split(urlRegex)

  return (
    <div className="space-y-2">
      {parts.map((part, index) => {
        if (part.match(urlRegex)) {
          return (
            <Link
              key={index}
              href={part}
              className="text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {part}
            </Link>
          )
        } else {
          return <span key={index}>{part}</span>
        }
      })}
    </div>
  )
}