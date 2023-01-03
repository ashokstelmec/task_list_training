import React from 'react'
import Sidebar from "./Sidebar"
import TaskList from "./TaskList"

const Content = () => {
    return (
        <div className="main-content">
            <Sidebar />
            <TaskList />
        </div>
    )
}

export default Content