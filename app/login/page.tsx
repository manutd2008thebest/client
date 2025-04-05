"use client";
import React, { useEffect } from "react";
import LoginForm from "../Components/auth/LoginForm/LoginForm";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

// window.localStorage.setItem('userAuthenticated', 'false')

function page() {
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('userAuthenticated', 'false')
  }, [user, router]);

  // return null or a loading spinner/indicator
  if (user && user._id) {
    return null;
  }

  return (
    <div className="auth-page w-full h-full flex justify-center items-center">
      <LoginForm />
    </div>
  );
}

export default page;
