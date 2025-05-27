# Stage 1: Build
FROM node:18-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file cấu hình và package
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Build dự án Next.js
RUN npm run build

# Stage 2: Run
FROM node:18-alpine AS runner

WORKDIR /app

# Cài đặt `serve` để chạy ứng dụng
RUN npm install -g serve

# Copy chỉ thư mục `.next` và `public`, `package.json` (tối ưu)
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

# Biến môi trường
ENV NODE_ENV=production

# Mở cổng (tùy vào config hoặc port serve)
EXPOSE 3000

# Lệnh chạy Next.js ở chế độ production
CMD ["npx", "next", "start"]
