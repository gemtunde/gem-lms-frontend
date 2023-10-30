"use client";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import CourseAnalytics from "@/app/components/Admin/Analytics/CourseAnalytics";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title={`Elearning -Admin`}
          description=" Platform for student to Learn Software Courses"
          keywords="MERN, VUE, React"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHeader />
            <CourseAnalytics />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
