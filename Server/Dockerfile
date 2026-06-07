FROM node:22.15-alpine

RUN apk add --no-cache make gcc g++ python3 netcat-openbsd

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

COPY wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh

EXPOSE 5000

CMD ["/wait-for-it.sh", "db", "5432", "--", "node", "index.js"]