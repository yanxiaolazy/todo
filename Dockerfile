FROM node:latest

ENV NODE_ENV=production
WORKDIR /todo
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . /todo
EXPOSE 80
CMD ["yarn", "run", "pro"]



