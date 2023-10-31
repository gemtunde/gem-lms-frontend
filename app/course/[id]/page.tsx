"use client";
import CourseDetailsPage from "@/app/components/Course/CourseDetailsPage";
import React from "react";

type Props = {};

const page = ({ params }: any) => {
  const id = params.id;
  return (
    <div>
      <CourseDetailsPage id={id} />
    </div>
  );
};

export default page;
