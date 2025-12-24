FROM node:20-alpine

WORKDIR /app

# Install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

ENV NODE_ENV=production
ENV PORT=5000
ENV MONGODB_URI=mongodb://127.0.0.1:27017/wanderlust
ENV REDIS_URL=redis://127.0.0.1:6379

EXPOSE 5000

CMD ["node", "server.js"]
