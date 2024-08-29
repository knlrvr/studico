'use client'

import AllTasks from "./allTasks"
import CompletedTaskList from "./completedTaskList"
import History from "./history"
import IncompleteTaskList from "./incompleteTaskList"
import Members from "./members"
import { ProgressChart } from "./progressChart"
import RecentProjectFilesPreview from "./recentProjectFilesPreview"
import UserTasks from "./user-tasks"

export function Overview() {
  
  return (
    <div className="grid gap-y-4 gap-x-4 mb-6">

      <div className="">
        <ProgressChart />
      </div>

      <div className="">
        <UserTasks />
      </div>

      <div className="">
        <AllTasks />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <IncompleteTaskList />
        <CompletedTaskList />
      </div>

      <div className="">
        <RecentProjectFilesPreview />
      </div>

      <div className="">
        <History />
      </div>

      <div className="">
        <Members />
      </div>

    </div>
  )
}
