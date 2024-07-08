'use client'

import { Id } from "../../convex/_generated/dataModel"
import AllTasks from "./allTasks"
import CompletedTaskList from "./completedTaskList"
import IncompleteTaskList from "./incompleteTaskList"
import { ProgressChart } from "./progressChart"
import RecentProjectFiles from "./recentProjectFiles"

export function Overview({
  params
} : {
    params: {
        projectId: Id<"projects">
    }
}) {

  return (
    <div className="grid gap-y-4 gap-x-4 mb-6">

      <div className="">
        <ProgressChart params={{ projectId: params.projectId }}/>
      </div>

      <div className="">
        <AllTasks params={{ projectId: params.projectId }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <IncompleteTaskList params={{ projectId: params.projectId }} />
        <CompletedTaskList params={{ projectId: params.projectId }} />
      </div>

      <div className="">
        <RecentProjectFiles params={{ projectId: params.projectId }} />
      </div>

    </div>
  )
}
