FROM alpine:latest
RUN apk add --update nodejs npm

WORKDIR /app/cms-be

COPY package.json package.json

RUN npm install

COPY . .
EXPOSE  8000
CMD ["node", "index.js"]