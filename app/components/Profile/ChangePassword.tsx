import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {
  user: any;
};

const ChangePassword: FC<Props> = (props) => {
  const [show, setShow] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //state
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  //password logic
  const passwordChangeHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password does not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  return (
    <div className="w-full pl-5 ml-8 px-2 800px:px-5 ">
      <h1 className={`${styles.title}`}> Change Password </h1>
      <form
        onSubmit={passwordChangeHandler}
        className="w-full flex flex-col items-center"
      >
        <div className="w-full mt-5 relative mb-1">
          <label className={styles.label} htmlFor="email">
            Old Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="oldPassword"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="xxxxxxx"
            className={` ${styles.input}`}
            required
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        <div className="w-full mt-5 relative mb-1">
          <label className={styles.label} htmlFor="email">
            New Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="xxxxxxx"
            className={` ${styles.input}`}
            required
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        <div className="w-full mt-5 relative mb-1">
          <label className={styles.label} htmlFor="email">
            Confirm New Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="xxxxxxx"
            className={` ${styles.input}`}
            required
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>

        <div className="w-full my-3">
          <input
            type="submit"
            value="Change Password"
            className={styles.button}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
