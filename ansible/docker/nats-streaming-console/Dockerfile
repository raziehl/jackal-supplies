FROM node:10
RUN mkdir -p /opt/nats-streaming-console
WORKDIR /opt/nats-streaming-console
RUN git clone https://github.com/KualiCo/nats-streaming-console.git .
# Latest commit at the time of docker build
# https://github.com/KualiCo/nats-streaming-console/commit/2ef9ecae980dc8cb5199ab7e1ab7151c2d269951
RUN git checkout 2ef9ecae980dc8cb5199ab7e1ab7151c2d269951
RUN npm install
RUN npm run build-css
RUN npm run build
EXPOSE 8282
