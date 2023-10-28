import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import { toast } from "react-hot-toast";
import Link from "next/link";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  //open modal popup for delete user
  const [open, setOpen] = useState(false);

  //open modal popup fro new member
  const [active, setActive] = useState(false);

  //state get all users
  //refetch is import when u mahe update/delete, it helps u clear the cache and  refetch data quickly
  const { isLoading, error, isSuccess, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  //state update user role (admin or user)
  const [
    updateUserRole,
    {
      isLoading: updateIsLoading,
      error: updateIsError,
      isSuccess: updateIsSuccess,
    },
  ] = useUpdateUserRoleMutation();

  //state delete user (admin or user)
  const [
    deleteUser,
    {
      isLoading: deleteIsLoading,
      error: deleteIsError,
      isSuccess: deleteIsSuccess,
    },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (updateIsSuccess) {
      refetch();
      toast.success("User role updated successfully");
    }
    if (updateIsError) {
      if ("data" in updateIsError) {
        const errorMessage = updateIsError as any;
        toast.error(errorMessage.data.message);
        setActive(!active);
      }
    }
    if (deleteIsSuccess) {
      refetch();
      toast.success("User deleted successfully");
    }
    if (deleteIsError) {
      if ("data" in deleteIsError) {
        const errorMessage = deleteIsError as any;
        toast.error(errorMessage.data.message);
        setOpen(!open);
      }
    }
  }, [
    updateIsSuccess,
    updateIsError,
    active,
    deleteIsError,
    deleteIsSuccess,
    open,
  ]);

  //table columns
  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "name", headerName: "Full Name", flex: 0.8 },
    { field: "email", headerName: "email", flex: 0.6 },
    { field: "role", headerName: "Role", flex: 0.2 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Date Joined", flex: 0.7 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setUserId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className="dark:text-white text-red-800"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: " mail",
      headerName: "Mail",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setUserId(params.row.id);
              }}
            >
              <AiOutlineMail
                className="dark:text-white text-green-800"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  //   map data to row
  if (isTeam) {
    let newData =
      data && data.users.filter((user: any) => user.role === "admin");
    newData &&
      newData.map((user: any) =>
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          courses: user.courses.length,
          created_at: user.createdAt,
        })
      );
  } else {
    data &&
      data.users.map((user: any) =>
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          courses: user.courses.length,
          created_at: user.createdAt,
        })
      );
  }

  //handle submit
  const handleSubmit = async () => {
    // console.log("new member", { role, email, name });
    await updateUserRole({ role, email });
  };

  //handle delete user
  const handleDeleteUser = async () => {
    await deleteUser(userId);
  };

  return (
    <div className="mt-[120px]">
      {isLoading || updateIsLoading || deleteIsLoading ? (
        <Loader />
      ) : (
        <div className="ml-[30px]">
          <Box m="30px">
            {isTeam && (
              <div className="w-full flex justify-end mt-5">
                <div
                  className={`${styles.button} w-[205px] text-sm text-white`}
                  onClick={() => setActive(!active)}
                >
                  Add New Member
                </div>
              </div>
            )}
            <Box
              m="40px 0 0 0"
              height="80vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                  outline: "none",
                },
                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-sortIcon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-row": {
                  color: theme === "dark" ? "#fff" : "#000",
                  borderBottom:
                    theme === "dark"
                      ? "1px solid #ffffff30!important"
                      : "1px solid #ccc!important",
                },
                "& .MuiTablePagination-root": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none!important",
                },
                "& .name-column--cell": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                  borderBottom: "none",
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                },
                "& .MuiDataGrid-footerContainer": {
                  color: theme === "dark" ? "#fff" : "#000",
                  borderTop: "none",
                  backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                },
                "& .MuiCheckbox-root": {
                  color:
                    theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `#fff !important`,
                },
              }}
            >
              <DataGrid checkboxSelection rows={rows} columns={columns} />
            </Box>
            {/* modal for new member */}
            {active && (
              <Modal
                open={active}
                onClose={() => setActive(!active)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                  <h1 className={`${styles.title}`}> Add New Member </h1>
                  <div className="mt-4">
                    <div className="flex flex-col my-4 gap-2">
                      <label className={styles.label} htmlFor="name">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="JohnDoe@email.com"
                        className={`${styles.input} mt-[-4px]`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles.label} htmlFor="name">
                        Role
                      </label>
                      <select
                        name=""
                        id=""
                        className={`${styles.input} mt-[-4px]`}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="admin"> Admin</option>
                        <option value="user"> User</option>
                      </select>
                    </div>
                    <div
                      className={`${styles.button} my-4 text-white`}
                      onClick={handleSubmit}
                    >
                      Submit
                    </div>
                  </div>
                </Box>
              </Modal>
            )}

            {/* modal for delete member */}
            {open && (
              <Modal
                open={open}
                onClose={() => setOpen(!open)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                  <h1 className={`${styles.title}`}>
                    {" "}
                    Are you sure, you want to delete this user{" "}
                  </h1>
                  <div className="flex w-full items-center justify-between mb-6 mt-4">
                    <div
                      className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                      onClick={() => setOpen(!open)}
                    >
                      Cancel
                    </div>
                    <div
                      className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                      onClick={handleDeleteUser}
                    >
                      Delete
                    </div>
                  </div>
                </Box>
              </Modal>
            )}
          </Box>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
