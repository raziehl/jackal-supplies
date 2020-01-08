FROM alpine

RUN apk update
RUN apk add nginx
RUN mkdir /run/nginx
RUN rm /etc/nginx/conf.d/default.conf
#COPY conf/amethyst.hypercentage.com.conf /etc/nginx/conf.d/
COPY conf/pandora.conf /etc/nginx/conf.d/

CMD ["-c", "/etc/nginx/nginx.conf", "-g", "daemon off;"]

ENTRYPOINT ["nginx"]

EXPOSE 80
