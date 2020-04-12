FROM node:10-alpine

ARG ENV
ARG SERVER_PORT

RUN mkdir -p /opt/order-broker
RUN mkdir -p /opt/common

COPY ./order-broker /opt/order-broker
COPY ./common /opt/common
COPY ./package.json /opt/package.json
COPY ./package-lock.json /opt/package-lock.json

RUN apk add alpine-sdk python

WORKDIR /opt
RUN npm install

WORKDIR /opt/order-broker
RUN npm install
RUN npm run build

EXPOSE ${SERVER_PORT}
