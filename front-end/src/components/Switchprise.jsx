import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Switch,
  Typography,
  Stack,
  Modal,
  Box,
  Button,
} from '@mui/material';
const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 11,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

function Switchprise() {
  const [checked, setChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSwitch, setModalSwitch] = useState(false);

  const handleToggle = (event) => {
    if (event.target.checked) {
      setModalOpen(true);
    } else {
      setChecked(false);
      setModalSwitch(false);
    }
  };

  const handleConfirm = () => {
    if (modalSwitch) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setChecked(false);
    setModalSwitch(false);
  };

  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        <Android12Switch checked={checked} onChange={handleToggle} />
      </Stack>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        closeAfterTransition
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
            minWidth: 320,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" mb={2}>
            دریافت جایزه
          </Typography>
          <Typography id="modal-description" mb={2}>
            آیا می‌خواهید جایزه را دریافت کنید؟
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" mb={3}>
            <Typography>خیر</Typography>
            <Android12Switch
              checked={modalSwitch}
              onChange={(e) => setModalSwitch(e.target.checked)}
            />
            <Typography>بله</Typography>
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={handleCloseModal}>
              انصراف
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirm}
              disabled={!modalSwitch}
            >
              تایید
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default Switchprise;
// import React, { useState } from 'react';
// import { styled } from '@mui/material/styles';
// import {
//   Switch,
//   Typography,
//   Stack,
//   Modal,
//   Box,
// } from '@mui/material';

// const Android12Switch = styled(Switch)(({ theme }) => ({
//   padding: 8,
//   '& .MuiSwitch-track': {
//     borderRadius: 11,
//     '&::before, &::after': {
//       content: '""',
//       position: 'absolute',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       width: 16,
//       height: 16,
//     },
//     '&::before': {
//       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
//         theme.palette.getContrastText(theme.palette.primary.main)
//       )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
//       left: 12,
//     },
//     '&::after': {
//       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
//         theme.palette.getContrastText(theme.palette.primary.main)
//       )}" d="M19,13H5V11H19V13Z" /></svg>')`,
//       right: 12,
//     },
//   },
//   '& .MuiSwitch-thumb': {
//     boxShadow: 'none',
//     width: 16,
//     height: 16,
//     margin: 2,
//   },
// }));

// function Switchprise() {
//   const [checked, setChecked] = useState(false); 
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalSwitch, setModalSwitch] = useState(false);

//   const handleMainSwitchClick = () => {
//     if (!checked) {
//       setModalOpen(true);
//       setModalSwitch(false);
//     } else {
//       setChecked(false);
//     }
//   };

//   const handleModalSwitchChange = (e) => {
//     const val = e.target.checked;
//     setModalSwitch(val);
//     if (val) {
//       setChecked(true);
//       setModalOpen(false);
//     }
//   };

//   return (
//     <>
//       <Stack direction="row" alignItems="center">
//         <Android12Switch checked={checked} onChange={handleMainSwitchClick} />
//       </Stack>

//       <Modal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//         BackdropProps={{
//           sx: {
//             backgroundColor: 'rgba(0, 0, 0, 0.4)',
//             backdropFilter: 'blur(4px)',
//           },
//         }}
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             bgcolor: 'background.paper',
//             boxShadow: 24,
//             borderRadius: 2,
//             p: 4,
//             minWidth: 320,
//           }}
//         >
//           <Typography id="modal-title" variant="h6" component="h2" mb={2}>
//             دریافت جایزه
//           </Typography>
//           <Typography id="modal-description" mb={3}>
//             برای فعال‌سازی جایزه، لطفاً سوییچ زیر را فعال کنید:
//           </Typography>

//           <Stack direction="row" justifyContent="center">
//             <Android12Switch
//               checked={modalSwitch}
//               onChange={handleModalSwitchChange}
//             />
//           </Stack>
//         </Box>
//       </Modal>
//     </>
//   );
// }

// export default Switchprise;
