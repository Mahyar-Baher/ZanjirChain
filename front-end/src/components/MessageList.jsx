import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material';
import useAuthStore from '../context/authStore'; // مسیر فایل useAuthStore.js
import NoDataImage from '/media/images/empty_box.webp';

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

const getRadiusStyle = (pos) => {
  if (pos === 'top') return { borderTopLeftRadius: 12, borderTopRightRadius: 12 };
  if (pos === 'bottom') return { borderBottomLeftRadius: 12, borderBottomRightRadius: 12 };
  return {};
};

const MessageList = () => {
  const { messages, token, fetchUserFromToken } = useAuthStore();
  const [messagesData, setMessagesData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMessages = async () => {
      if (!token) {
        setError('لطفاً ابتدا وارد شوید.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        await fetchUserFromToken(token);
        setMessagesData(Array.isArray(messages) ? messages : []);
      } catch (err) {
        console.error('خطا در بارگذاری پیام‌ها:', err?.response?.data || err.message);
        setError('خطا در بارگذاری پیام‌ها. لطفاً دوباره تلاش کنید.');
        if (err.response?.status === 401) {
          useAuthStore.getState().logout();
          window.location.href = '/login';
        }
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, [token, fetchUserFromToken]);

  const visibleMessages = messagesData.slice(0, visibleCount);

  const handleOpenModal = (text) => {
    setModalText(text);
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <Box sx={{ p: 1, direction: 'rtl' }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
        مدیریت پیام‌ها
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ mb: 2, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
          <Typography color="error.main">{error}</Typography>
        </Box>
      ) : !messagesData || messagesData.length === 0 ? (
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
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottomRightRadius: 12, borderTopRightRadius: 12 }}>
                    موضوع
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    متن پیام
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    زمان ارسال
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottomLeftRadius: 12, borderTopLeftRadius: 12 }}>
                    عملیات
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ background:"#80808c3f"}}>
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ borderBottom: 'none', py: 5 }}>
                    <img src={NoDataImage} alt="No data" width={120} />
                    <Typography sx={{ mt: 2, color: 'text.secondary' }}>
                      هیچ آدرسی برای نمایش وجود ندارد
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
              </Table>
          </TableContainer>
      ) : (
        <>
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
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottomRightRadius: 12, borderTopRightRadius: 12 }}>
                    موضوع
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    متن پیام
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    زمان ارسال
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottomLeftRadius: 12, borderTopLeftRadius: 12 }}>
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
                        bgcolor: '#80808c3f',
                        borderRadius: 2,
                        mb: 1,
                        '&:hover': { bgcolor: '#e1e1ff' },
                        '& td': { borderBottom: 'none' },
                        ...(!isLast && { borderBottom: '8px solid transparent' }),
                        ...(isLast && getRadiusStyle('bottom')),
                      }}
                    >
                      <TableCell align="center" sx={{ fontSize: 14, px: 1 }}>
                        {msg.subject || 'بدون موضوع'}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          maxWidth: 220,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontSize: 14,
                          px: 1,
                        }}
                        title={msg.body}
                      >
                        {msg.body || 'بدون متن'}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: 14, fontFamily: 'Vazir, sans-serif' }}>
                        {new Date(msg.created_at).toLocaleString('fa-IR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </TableCell>
                      <TableCell align="center" sx={{ px: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleOpenModal(msg.body || 'بدون متن')}
                          sx={{
                            borderColor: '#1a652a',
                            color: '#1a652a',
                            textTransform: 'none',
                            px: 2,
                            borderRadius: 2,
                            fontSize: 13,
                            '&:hover': { bgcolor: '#1a652a', color: 'white' },
                          }}
                        >
                          مشاهده
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {visibleCount < messagesData.length && (
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
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  bgcolor: '#1a652a',
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
        </>
      )}

      <Modal open={modalOpen} onClose={handleCloseModal} aria-labelledby="modal-title" closeAfterTransition>
        <Box sx={styleModal}>
          <Typography id="modal-title" variant="h6" fontWeight="bold" gutterBottom>
            جزئیات پیام
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontSize: 15,
              lineHeight: 1.8,
            }}
          >
            {modalText}
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="contained"
              onClick={handleCloseModal}
              sx={{ bgcolor: '#1a652a', '&:hover': { bgcolor: '#5c5cff' } }}
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