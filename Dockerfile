FROM node:23.11-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx prisma generate
RUN npm run build

# イメージサイズを小さくするために、ビルド後のファイルだけをコピー
FROM node:23.11-alpine 
WORKDIR /app
COPY --from=builder /app ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "build/index.js"] 
