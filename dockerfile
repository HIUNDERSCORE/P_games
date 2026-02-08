FROM node:18-alpine
ENV NODE_OPTIONS="--max-old-space-size=180"
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev --no-audit
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD ["node", "index.mjs"]
