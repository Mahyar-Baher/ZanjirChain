export const generateTrackingCode = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
    const timePart = hours + minutes + seconds + milliseconds.slice(0, 2);
    let randomPart = '';
    for (let i = 0; i < 3; i++) {
      randomPart += Math.floor(Math.random() * 10);
    }
    return timePart + randomPart;
  };