'use client'

import { Id } from "../../convex/_generated/dataModel"
import RecentProjectFiles from "./recentProjectFiles"
import TaskList from "./taskList"

export function Overview({
  params
} : {
    params: {
        projectId: Id<"projects">
    }
}) {

  return (
    <div className="grid gap-y-8 mb-6">
        <TaskList params={{ projectId: params.projectId }} />

        <RecentProjectFiles params={{ projectId: params.projectId }} />
    </div>
  )
}
