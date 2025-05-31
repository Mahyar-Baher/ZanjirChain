# مرحله اول: ساخت
FROM node:18-alpine AS build

WORKDIR /app

# فقط فایل‌های package.json و package-lock.json رو کپی کن
COPY package.json package-lock.json ./

# نصب وابستگی‌ها
RUN npm install

# کپی کردن بقیه فایل‌ها
COPY . .

# بیلد پروژه
RUN npm run build

# مرحله دوم: اجرا با nginx
FROM nginx:stable-alpine

# پاک کردن فایل‌های پیش‌فرض nginx
RUN rm -rf /usr/share/nginx/html/*

# کپی کردن فایل‌های بیلد شده به nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
