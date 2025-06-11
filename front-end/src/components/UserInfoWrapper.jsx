// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import UserInfo from "./UserInfo";

// const UserInfoWrapper = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get("/api/user-info");
//       setUser(res.data);
//     } catch (err) {
//       console.error("خطا در دریافت اطلاعات:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const handleEditUser = async (updatedData) => {
//     try {
//       await axios.post("/api/update-user", updatedData);
//       setUser(updatedData);
//     } catch (err) {
//       console.error("خطا در ذخیره اطلاعات:", err);
//     }
//   };

//   if (loading) return <p>در حال بارگذاری...</p>;
//   if (!user) return <p>اطلاعاتی برای نمایش وجود ندارد.</p>;

//   return <UserInfo user={user} onEdit={handleEditUser} />;
// };

// export default UserInfoWrapper;
import React, {useState } from "react";
import UserInfo from "./UserInfo";

const UserInfoWrapper = () => {
  const [user, setUser] = useState({
    userId: "123456",
    firstName: "تست",
    lastName: "کاربر",
    birthDate: "1370/01/01",
    nationalId: "0012345678",
    phone: "09120000000",
    email: "user@example.com",
    avatarUrl: "",
  });

  const handleEditUser = (data) => {
    console.log("ویرایش:", data);
    setUser(data);
  };

  return <UserInfo user={user} onEdit={handleEditUser} />;
};

export default UserInfoWrapper;
