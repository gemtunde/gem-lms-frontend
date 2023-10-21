"use client";
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import ProfileComponent from "@/app/components/Profile/ProfileComponent";
import { useSelector } from "react-redux";

type Props = {};

const Profile: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  //get user
  const { user } = useSelector((state: any) => state.auth);

  return (
    <Protected>
      <Heading
        title={`${user?.name} profile`}
        description="Software Courses"
        keywords="MERN, VUE, React"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <ProfileComponent user={user} />
    </Protected>
  );
};

export default Profile;
