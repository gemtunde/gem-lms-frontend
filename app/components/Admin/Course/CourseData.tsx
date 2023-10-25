import { styles } from "@/app/styles/style";
import { RemoveCircleOutline } from "@mui/icons-material";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { RiAddCircleFill } from "react-icons/ri";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  active,
  setActive,
  setBenefits,
  prerequisites,
  setPrerequisites,
}) => {
  // handle Benefit Change
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  //handle Remove Benefit;
  const handleRemoveBenefit = (index: number) => {
    const updatedBenefits = [...benefits];
    const removeBenefit = updatedBenefits.filter((item, idx) => idx !== index);
    setBenefits(removeBenefit);
  };
  //handle Add Benefits;
  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  // handle add prerequisites Change
  const handleprerequisiteChange = (index: number, value: any) => {
    const updatedPrerequisite = [...prerequisites];
    updatedPrerequisite[index].title = value;
    setPrerequisites(updatedPrerequisite);
  };

  //handle Add prerequisites;
  const handleAddprerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };
  //handle Remove prerequisites
  const handleRemoveprerequisite = (index: number) => {
    const updatedPrerequisite = [...prerequisites];
    const removePrerequisite = updatedPrerequisite.filter(
      (item, idx) => idx !== index
    );
    setPrerequisites(removePrerequisite);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill all fields to go next!");
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24 block">
      {/* benefits */}
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <div key={index} className="flex items-center justify-center gap-2">
            <input
              type="text"
              name="Benefit"
              placeholder="You will be able to build a fullstack LMS Platform"
              required
              className={`${styles.input} my-2`}
              value={benefit.title}
              onChange={(e) => handleBenefitChange(index, e.target.value)}
            />
            <RemoveCircleOutline
              style={{ margin: "0px 10px", cursor: "pointer", width: "30px" }}
              onClick={() => handleRemoveBenefit(index)}
            />
          </div>
        ))}
        <RiAddCircleFill
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefits}
        />
      </div>

      {/* prerequisites */}
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the prerequisites for starting this course?
        </label>
        <br />
        {prerequisites.map((prerequisite: any, index: number) => (
          <div key={index} className="flex items-center justify-center gap-2">
            <input
              type="text"
              name="prerequisite"
              placeholder="Minimum requirement for this course"
              required
              className={`${styles.input} my-2`}
              value={prerequisite.title}
              onChange={(e) => handleprerequisiteChange(index, e.target.value)}
            />
            <RemoveCircleOutline
              style={{ margin: "0px 10px", cursor: "pointer", width: "30px" }}
              onClick={() => handleRemoveprerequisite(index)}
            />
          </div>
        ))}
        <RiAddCircleFill
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddprerequisites}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
