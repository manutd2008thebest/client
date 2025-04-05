import { useTasks } from "@/context/taskContext";
import { edit, star, trash } from "@/utils/Icons";
import { Task } from "@/utils/types";
import { formatTime } from "@/utils/utilities";
import React from "react";
import { motion } from "framer-motion";
import { item } from "@/utils/animations";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  const { getTask, openModalForEdit, deleteTask, modalMode } = useTasks();

  return (
    <motion.div
      className="h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-[1rem] border-2 border-white"
      variants={item}
    >
      <div>
        <h4 className="font-bold text-2xl">{task.title}</h4>
        <div className="flex flex-col gap-10">
          <div>
            <p>{task.description}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Created: {formatTime(task.createdAt)}</p>
            <p className="text-sm text-gray-400">Due: {formatTime(task.dueDate)}</p>
          </div>
        </div>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </p>
        <div>
          <div className="flex items-center gap-1 text-gray-400 text-[1.2rem]">
            <button
              className="bg-[#00A1F1] text-white text-[.8rem] w-[70px] py-[2px] rounded-[8px]"
              onClick={() => {
                getTask(task._id);
                openModalForEdit(task);
              }}
            >
              Edit
            </button>
            <button
              className="bg-[#F65314] text-white text-[.8rem] w-[70px] py-[2px] rounded-[8px]"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskItem;
