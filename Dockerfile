#build satge
FROM node:18-alpine as build

WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .

RUN npm run build



#prod stage
FROM node:18-alpine

WORKDIR /usr/src/app
ARG NODE_ENV=production
ENV NODE_ENV={NODE_ENV}

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma
COPY package*.json ./
RUN npm install --only=production

# RUN rm package*.json
EXPOSE 3000
CMD [ "node","dist/main.js" ]