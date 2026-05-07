FROM node:22.15-alpine
RUN apk add --no-cache make gcc g++ python3
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000

CMD ["sh", "-c", "npm run migrate && node index.js"]