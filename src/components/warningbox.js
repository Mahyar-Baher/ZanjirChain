import { Box, Typography} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
const WarningsBox = () => {
  return (
    <div
      className="col-5 bg-purple h-100 p-0 position-relative"
      style={{ borderRadius: "100px 0px 0px 100px" }}
    >
      <div
        className="position-absolute top-0 w-100 h-100 z-0 bg-secondary bg-opacity-10"
        style={{
          borderRadius: "100px 0px 0px 100px",
          backgroundImage: "url(/media/images/png.png)",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "lighten",
          opacity: "0.3",
        }}
      ></div>

      <div
        className="position-absolute top-0 w-100 h-100 z-0 bg-primary bg-opacity-10"
        style={{ borderRadius: "100px 0px 0px 100px" }}
      ></div>

      <div
        className="w-100 h-100 m-0 p-lg-5 p-0 bg-white bg-opacity-25 row justify-content-center align-content-center position-absolute z-2 text-white"
        style={{ borderRadius: "100px 0px 0px 100px" }}
      >
        <Box className="col-12 mt-3 mt-lg-5 fw-semibold d-flex justify-content-start align-items-center">
          <i className="ic ic-attention" style={{ marginLeft: '8px' }}></i>
          <Typography>با ورود به سایت، قوانین و شرایط استفاده را می‌پذیرید</Typography>
        </Box>
        <Box className="col-12 mt-3 mt-lg-5 fw-semibold d-flex align-items-center">
          <i className="ic ic-attention" style={{ marginLeft: '8px' }}></i>
          <Typography>
            اطلاعات خود را به بهانه کسب درآمد در اختیار دیگران قرار ندهید
          </Typography>
        </Box>
        <Box className="col-12 mt-3 mt-lg-5 fw-semibold d-flex align-items-center">
          <i className="ic ic-attention" style={{ marginLeft: '8px' }}></i>
          <Typography>
            ساخت حساب کاربری برای دیگران کلاه‌برداری است و مسئولیت آن با شماست
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default WarningsBox;