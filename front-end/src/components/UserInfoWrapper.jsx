import React, { useContext } from "react";
import UserInfo from "./UserInfo";
import { AuthContext } from "../context/AuthContext";

const UserInfoWrapper = () => {
  const { user, setUser } = useContext(AuthContext);

  if (!user) return <p>🔒 اطلاعات کاربر هنوز بارگذاری نشده است.</p>;

  const handleEditUser = (updatedData) => {
    setUser(updatedData);
    localStorage.setItem("user", JSON.stringify(updatedData));
    // در صورت نیاز، درخواست به سرور:
    // axios.post('/api/update-user', updatedData);
  };

  return <UserInfo user={user} onEdit={handleEditUser} />;
};

export default UserInfoWrapper;
