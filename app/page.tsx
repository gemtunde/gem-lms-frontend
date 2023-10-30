"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Routes/Hero";
import Courses from "./components/Routes/Courses";
import Reviews from "./components/Routes/Reviews";
import FAQ from "./components/FAQ/FAQ";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="ELearning | LMS"
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
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
    </div>
  );
};

export default Page;
