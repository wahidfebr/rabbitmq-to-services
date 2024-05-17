FROM node:18.20.2-alpine3.18

WORKDIR /apps

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install && npm cache clean --force

COPY ./ ./

CMD ["npm", "start"]