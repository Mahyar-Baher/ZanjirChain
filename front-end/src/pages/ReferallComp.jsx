import { Box, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../context/authStore";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

const ReferallComp = () => {
  const { token, user , orders } = useAuthStore();
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOkeyToGetReferral , setIsOkeyToGetReferral] = useState(false)

  useEffect(() => {
    if(Number(user?.invited_by) > 1 && (orders?.length > 0) > 0 && user?.kyc_level > 0){
      setIsOkeyToGetReferral(true)
    }
  }, [user, orders])

  const handlerVerify = async () => {
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://pump-ex.com/laravel/api/verifyInviteCode",
        { invite_code: userInput , invitor_id : user?.invited_by },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message || "کد دعوت با موفقیت ثبت شد");
      setUserInput(""); // پاک کردن فیلد بعد از موفقیت
    } catch (error) {
      console.log(error);
      setMessage("کد دعوت معتبر نیست یا قبلاً ثبت شده است");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (invite_code) => {
    navigator.clipboard.writeText(`https://pump-ex.com/invite/${invite_code}`);
    setMessage("لینک دعوت کپی شد");
  };

  return (
    <Box bgcolor="background.paper" width="100%" p={2} m={1} borderRadius="10px">
      <Box textAlign="start" fontWeight="bold">
        رفرال - دعوت
      </Box>

      <Box mt={5} p={2}>
        <Box textAlign="start" fontWeight="bold">
          نکات
        </Box>
        <Box p={2}>
            <Box>با هر دعوت، هم شما 2 دلار پاداش می‌گیرید و هم فرد دعوت‌شده 1 دلار هدیه دریافت می‌کند.</Box>
            <Box>پاداش‌ها پس از انجام اولین تراکنش مالی توسط فرد دعوت‌شده فعال می‌شوند.</Box>
            <Box>می‌توانید با دعوت بیشتر، پاداش‌های بیشتری کسب کنید.</Box>
        </Box>

        <Box mt={2} textAlign="start" fontWeight="bold">
          لینک دعوت شما
        </Box>
        <Box p={1} display="flex" justifyContent="space-between" alignItems="center">
          <Box p={2} border="1px solid gray" borderRadius="5px" width="87%">
            https://pump-ex.com/invite/{user?.invite_code}
          </Box>
          <Box width="10%">
            <Button variant="contained" size="large" onClick={()=>handleCopy(user?.invite_code)}>
              کپی
            </Button>
          </Box>
        </Box>

        {message && (
          <Box mt={2} color={message.includes("موفق") || message.includes("کپی") ? "green" : "red"}>
            {message}
          </Box>
        )}

        <Box mt={3} textAlign="start" fontWeight="bold">
          { user?.invited_by ? "" : "کد دعوت دارید؟"}
        </Box>
        <TextField
          disabled={loading}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          sx={{ marginTop: "10px" , display: user?.invited_by ? "none" : "block" }}
          fullWidth
          placeholder="وارد کردن کد دعوت"
        />
        <Button
          disabled={loading || !userInput.trim()}
          onClick={handlerVerify}
          size="large"
          fullWidth
          variant="contained"
          sx={{ marginTop: "10px" , display: user?.invited_by ? "none" : "block"}}
        >
          {loading ? "در حال بررسی..." : "ثبت"}
        </Button>

        <Box textAlign={"start"} fontWeight={"bold"} mt={3}>
            دریافت جایزه ی رفرال
        </Box>
        <Grid spacing={2} mt={3} container>
            <Grid size={{lg:4 , xs:12}}>
                <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                    <Box mt={-0.7}>اهراز هویت لول یک</Box>
                    <Box mx={0.5}>
                        {user?.kyc_level == 0 ? <DoNotDisturbIcon/> : <CheckBoxIcon/>}
                    </Box>
                </Box>
            </Grid>
            <Grid size={{lg:4 , xs:12}}>
                <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                    <Box mt={-0.7}>حدعقل یک تراکنش</Box>
                    <Box mx={0.5}>
                        {orders?.length > 0 ? <CheckBoxIcon/> : <DoNotDisturbIcon/> }
                    </Box>
                </Box>
            </Grid>
            <Grid size={{lg:4 , xs:12}}>
                <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                    <Box mt={-0.7}>کسی شمارا دعوت کرده؟</Box>
                    <Box mx={0.5}>
                        {user?.invited_by == 0 ? <DoNotDisturbIcon/> : <CheckBoxIcon/>}
                    </Box>
                </Box>
            </Grid>
            <Box mt={1} width={"100%"}>
                <Button disabled={loading || !isOkeyToGetReferral} onClick={handlerVerify} fullWidth variant={!isOkeyToGetReferral ? "outlined" : "contained"} >دریافت جایزه</Button>
            </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default ReferallComp;
