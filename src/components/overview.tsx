'use client'

import { Suspense } from "react"
import AllTasks from "./all-tasks"
import CompletedTaskList from "./completed-task-list"
import History from "./history"
import IncompleteTaskList from "./incompleteTaskList"
import Members from "./members"
import { ProgressChart } from "./progress-chart"
import RecentProjectFilesPreview from "./recent-project-files-preview"
import SkeletonTable from "./skeleton-table"
import UserTasks from "./user-tasks"

export function Overview() {
  
  return (
    <div className="grid gap-y-4 gap-x-4 mb-6">

      <div className="">
        <ProgressChart />
      </div>

      <div className="">
        <Suspense fallback={<SkeletonTable />}>
          <UserTasks />
        </Suspense>
      </div>

      <div className="">
        <Suspense fallback={<SkeletonTable />}>
          <AllTasks />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Suspense fallback={<SkeletonTable />}>
          <IncompleteTaskList />
        </Suspense>
        <Suspense fallback={<SkeletonTable />}>
          <CompletedTaskList />
        </Suspense>
      </div>

      <div className="">
        <RecentProjectFilesPreview />
      </div>

      <div className="">
        <Suspense fallback={<SkeletonTable />}>
          <History />
        </Suspense>
      </div>

      <div className="">
        <Members />
      </div>

    </div>
  )
}
