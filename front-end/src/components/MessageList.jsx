import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Typography,
  Divider,
} from '@mui/material';
import { Icon } from '@iconify/react';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 440,
  bgcolor: 'background.paper',
  color: 'text.primary',
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
  outline: 'none',
};

const messagesData = [
  { id: 1, text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.', type: 'notification', time: '۱۰:۰۰ - ۱۴۰۴/۰۶/۱۵' },
  { id: 2, text: 'پیام دوم اعلان', type: 'alert', time: '۱۱:۳۰ - ۱۴۰۴/۰۶/۱۵' },
  { id: 3, text: 'پیام سوم اطلاعیه', type: 'notification', time: '۱۲:۰۰ - ۱۴۰۴/۰۶/۱۶' },
  { id: 4, text: 'پیام چهارم اعلان', type: 'alert', time: '۱۴:۰۰ - ۱۴۰۴/۰۶/۱۶' },
  { id: 5, text: 'پیام پنجم اطلاعیه', type: 'notification', time: '۱۶:۰۰ - ۱۴۰۴/۰۶/۱۶' },
];

const tabs = [
  { key: 'all', label: 'همه' },
  { key: 'notification', label: 'اطلاعیه‌ها', icon: 'mdi:bell-outline' },
  { key: 'alert', label: 'اعلان‌ها', icon: 'mdi:alert-circle-outline' },
];

const getRadiusStyle = (pos) => {
  if (pos === 'top') return { borderTopLeftRadius: 12, borderTopRightRadius: 12 };
  if (pos === 'bottom') return { borderBottomLeftRadius: 12, borderBottomRightRadius: 12 };
  return {};
};

const MessageList = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);

  const filteredMessages =
    activeTab === 'all' ? messagesData : messagesData.filter((m) => m.type === activeTab);

  const visibleMessages = filteredMessages.slice(0, visibleCount);

  const handleOpenModal = (text) => {
    setModalText(text);
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3); 
  };

  return (
    <Box sx={{ p: 1 }}>
        <Box sx={{display: 'grid',gridTemplateColumns: 'auto 1fr auto',alignItems: 'center',gap: 1,width: '100%',p:1}}>
        <Typography variant="h6" fontWeight="bold">
          مدیریت پیام‌ها
        </Typography>
        
        <Divider  sx={{    borderStyle: 'dashed',   borderColor: 'rgba(0,0,0,1)',   height: 2 }}/>
        <Box>
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setVisibleCount(3);
              }}
              variant={activeTab === tab.key ? 'contained' : 'outlined'}
              color="primary"
              sx={{
                mr: 1,
                borderRadius: 2,
                textTransform: 'none',
                px: 2,
                py: 0.7,
                borderColor: '#7878FF',
                gap: 0.5,
                fontWeight: activeTab === tab.key ? 'bold' : 'normal',
                ...(activeTab === tab.key
                  ? {
                      bgcolor: '#7878FF',
                      color: 'white',
                      '&:hover': { bgcolor: '#5c5cff' },
                    }
                  : {
                      color: '#7878FF',
                      bgcolor: 'transparent',
                      '&:hover': { bgcolor: 'rgba(120,120,255,0.1)' },
                    }),
              }}
            >
              {tab.icon && <Icon icon={tab.icon} width={18} height={18} />}
              {tab.label}
            </Button>
          ))}
        </Box>
        </Box>
      <Divider sx={{ mb: 1.5, borderColor: 'rgba(120,120,255,0.5)', borderWidth: '2px' }} />
      <TableContainer
        sx={{
          boxShadow: 'none',
          borderRadius: 2,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: '#80808c3f',
                ...getRadiusStyle('top'),
              }}
            >
              <TableCell align="center" sx={{ fontWeight: 'bold',borderBottomRightRadius: 12, borderTopRightRadius: 12 }}>
                متن پیام
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                نوع
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                زمان
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold',borderBottomLeftRadius: 12, borderTopLeftRadius: 12 }}>
                عملیات
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleMessages.map((msg, i) => {
              const isLast = i === visibleMessages.length - 1;
              return (
                <TableRow
                  key={msg.id}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    mb: 1,
                    bgcolor: '#80808c3f',
                    '&:hover': { bgcolor: '#e1e1ff' },
                    '& td': { borderBottom: 'none' },
                    ...(!isLast && { borderBottom: '8px solid transparent' }),
                    ...(isLast && getRadiusStyle('bottom')),
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                        borderTopRightRadius: '22px', borderBottomRightRadius: '22px', borderBottom: 'none',
                      maxWidth: 220,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontSize: 14,
                      px: 1,
                    }}
                    title={msg.text}
                  >
                    {msg.text}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      textTransform: 'capitalize',
                      fontSize: 14,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 0.7,
                    }}
                  >
                    <Icon
                      icon={
                        msg.type === 'notification' ? 'mdi:bell-outline' : 'mdi:alert-circle-outline'
                      }
                      width={20}
                      height={20}
                      color={msg.type === 'notification' ? '#5c5cff' : '#ff5959'}
                    />
                    {msg.type === 'notification' ? 'اطلاعیه' : 'اعلان'}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 14, fontFamily: 'Vazir, sans-serif' }}>
                    {msg.time}
                  </TableCell>
                  <TableCell align="center" sx={{borderTopLeftRadius: '22px', borderBottomLeftRadius: '22px', borderBottom: 'none' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenModal(msg.text)}
                      sx={{
                        borderColor: '#7878FF',
                        color: '#7878FF',
                        textTransform: 'none',
                        px: 2,
                        borderRadius: 2,
                        fontSize: 13,
                        '&:hover': { bgcolor: '#7878FF', color: 'white' },
                      }}
                    >
                      مشاهده
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {visibleMessages.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4, color: '#999', fontSize: 14 }}>
                  پیامی یافت نشد
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {visibleCount < filteredMessages.length && (
        <Box
          sx={{
            mt: 0,
            pt: 0.8,
            display: 'flex',
            justifyContent: 'center',
            bgcolor: 'Background.primary',
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            boxShadow: '0px 2px 6px rgb(0 0 0 / 0.05)',
            borderTop: '1px solid rgba(120,120,255,0.3)',
          }}
        >
          <Button fullWidth
            variant="contained"
            color="primary"
            sx={{
              bgcolor: '#7878FF',
              textTransform: 'none',
              borderRadius: 2,
              px: 3,
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#5c5cff' },
            }}
            onClick={handleShowMore}
          >
            نمایش بیشتر
          </Button>
        </Box>
      )}
      <Modal open={modalOpen} onClose={handleCloseModal} aria-labelledby="modal-title" closeAfterTransition>
        <Box sx={styleModal}>
          <Typography id="modal-title" variant="h6" fontWeight="bold" gutterBottom>
            جزئیات پیام
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', fontSize: 15 }}>
            {modalText}
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="contained"
              onClick={handleCloseModal}
              sx={{ bgcolor: '#7878FF', '&:hover': { bgcolor: '#5c5cff' } }}
            >
              بستن
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default MessageList;
