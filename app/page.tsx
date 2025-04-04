"use client";
import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import Filters from "./Components/Filters/Filters";
import TaskItem from "./Components/TaskItem/TaskItem";
import { Task } from "@/utils/types";
import { filteredTasks } from "@/utils/utilities";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { container, item } from "@/utils/animations";

export default function Home() {
  const { tasks, openModalForAdd, priority, setPriority } = useTasks();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("userAuthenticated");
    if (auth === null || auth === "false") {
      useRedirect("/login");
    } else {
      setIsAuthenticated(true);
    }

    setPriority("all");
  }, []);

  if (isAuthenticated === null) return null; // or a loading spinner

  const filtered = filteredTasks(tasks, priority);

  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <Filters />
      </div>

      <motion.div
        className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {filtered.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
        <motion.button
          className="h-[8rem] w-[50%] py-2 rounded-md text-[3rem] font-medium text-gray-500 border-none bg-gray-300
          hover:bg-gray-400 hover:border-none transition duration-200 ease-in-out"
          onClick={openModalForAdd}
          variants={item}
        >
          +
        </motion.button>
      </motion.div>
    </main>
  );
}
