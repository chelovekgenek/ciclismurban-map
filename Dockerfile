FROM node:10.15.3

WORKDIR /usr/src/app

COPY . .

RUN yarn install --production=true --silent
RUN yarn build

CMD [ "yarn", "start" ]