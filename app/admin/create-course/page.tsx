"use client";
import React from "react";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import CreateCourse from "@/app/components/Admin/Course/CreateCourse";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title={`Elearning -Admin`}
        description=" Platform for student to Learn Software Courses"
        keywords="MERN, VUE, React"
      />
      <div className="flex h-[200vh]">
        <div className="1500px : w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <CreateCourse />
        </div>
      </div>
    </div>
  );
};

export default page;
