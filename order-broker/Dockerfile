FROM node AS base
WORKDIR /jackal-supplies
FROM base AS dependencies

COPY common common

COPY order-broker order-broker

# RUN apk add --update \
#   python \
#   python-dev \
#   py-pip \
#   build-base \
#   autoconf \
#   libtool \
#   git \
#   openssh-client \
# && pip install virtualenv \
# && rm -rf /var/cache/apk/*

COPY package.json .
COPY lerna.json .
COPY tsconfig.json .

RUN npm config set registry http://registry.npmjs.org
RUN npm install
RUN npm install -g ts-node rimraf tsc lerna

RUN lerna bootstrap

EXPOSE 3000
CMD ["lerna", "run", "--stream", "start:order-broker"]