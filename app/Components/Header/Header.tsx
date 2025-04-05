"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import Profile from "../Profile/Profile";
import { github, moon, profile } from "@/utils/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";


function Header() {
  const { user, logoutUser } = useUserContext();

  const { openModalForAdd, activeTasks } = useTasks();

  const [authenticated, setAuthenticated] = React.useState<string | null>(null);

  const router = useRouter();

  const { name } = user;

  const userId = user._id;


  React.useEffect(() => {
    const auth = localStorage.getItem("userAuthenticated");
    setAuthenticated(auth);
  }, []);

  if (authenticated == "true") {
    return (
      <header className="px-2 my-3 w-full flex items-center justify-between bg-[#ffffff]">
        <div>
          {/* <p className="text-sm">
            {userId ? (
              <>
                You have{" "}
                <span className="font-bold text-[#0b52d6]">
                  {activeTasks.length}
                </span>
                &nbsp;active tasks
              </>
            ) : (
              "Please login or register to view your tasks"
            )}
          </p> */}
        </div>
        <div className="h-[60px] flex items-center justify-end">
          {/* <button
            className="h-[58px] px-8 py-3 bg-[#0b52d6] text-white rounded-[0.8rem]
            hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
            onClick={() => {
              if (userId) {
                openModalForAdd();
              } else {
                router.push("/login");
              }
            }}
          >
            {userId ? "Add a new Task" : "Login / Register"}
          </button> */}
         <Profile />
        </div>
      </header>
    );
  }   
}

export default Header;
