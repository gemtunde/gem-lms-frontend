"use client";

import React, { FC, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import ChangePassword from "./ChangePassword";

import ProfileInfo from "./ProfileInfo";

type Props = {
  user: any;
};

const ProfileComponent: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [logout, setLogout] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);

  //logout state
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  //logout
  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-gray-500 dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] shadow-sm dark:shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>

      {active === 1 && <ProfileInfo user={user} avatar={avatar} />}
      {active === 2 && <ChangePassword user={user} />}
    </div>
  );
};

export default ProfileComponent;
