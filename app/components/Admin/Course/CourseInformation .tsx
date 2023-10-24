import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";

type CourseInfoProps = {
  name: string;
  description: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  level: string;
  categories: string;
  demoUrl: string;
  thumbnail: any;
};

type Props = {
  courseInfo: CourseInfoProps;
  setCourseInfo: (courseInfo: CourseInfoProps) => void;
  active: number;
  setActive: (active: number) => void;
};
const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  //form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(active + 1);
  };

  //file change
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  //draggable
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.title}`}>
        <div className="my-4 flex flex-col items-start">
          <label htmlFor="" className={styles.label}>
            Course Name
          </label>
          <input
            type="name"
            name=""
            id="name"
            required
            value={courseInfo?.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            placeholder="MERN stack LMS"
            className={`${styles.input}`}
          />
        </div>
        <div className="my-4 flex flex-col items-start">
          <label htmlFor="" className={styles.label}>
            Course Description
          </label>
          <textarea
            name=""
            id=""
            cols={20}
            rows={4}
            required
            value={courseInfo?.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            placeholder="write something amazing"
            className={`${styles.input} !h-min !p-2`}
          ></textarea>
        </div>
        <div className="flex items-center flex-col gap-3 800px:flex-row">
          <div className="my-4 flex flex-col items-start 800px:w-[50%] w-[100%]">
            <label htmlFor="" className={styles.label}>
              Price
            </label>
            <input
              type="text"
              name=""
              id="price"
              required
              value={courseInfo?.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              placeholder="$78"
              className={`${styles.input}`}
            />
          </div>
          <div className="my-4 flex flex-col items-start 800px:w-[50%] w-[100%]">
            <label htmlFor="" className={styles.label}>
              Estimated Price
            </label>
            <input
              type="text"
              name=""
              id="estimatedPrice"
              required
              value={courseInfo?.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              placeholder="$300"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <div className="my-4 flex flex-col items-start">
          <label htmlFor="" className={styles.label}>
            Tags
          </label>
          <input
            type="text"
            name=""
            id="tags"
            required
            value={courseInfo?.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            placeholder="MERN, Java, Nextjs"
            className={`${styles.input}`}
          />
        </div>
        <div className="flex items-center flex-col gap-3 800px:flex-row">
          <div className="my-4 flex flex-col items-start 800px:w-[50%] w-[100%]">
            <label htmlFor="" className={styles.label}>
              Levels
            </label>
            <input
              type="text"
              name=""
              id="level"
              required
              value={courseInfo?.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              placeholder="Beginner/Intermediate/Advance"
              className={`${styles.input}`}
            />
          </div>
          <div className="my-4 flex flex-col items-start 800px:w-[50%] w-[100%]">
            <label htmlFor="" className={styles.label}>
              Demo Url
            </label>
            <input
              type="text"
              name=""
              id="demoUrl"
              value={courseInfo?.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              placeholder="google.com"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
