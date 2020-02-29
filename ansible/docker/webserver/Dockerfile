FROM alpine

RUN apk update
RUN apk add nginx
RUN mkdir /run/nginx
RUN rm /etc/nginx/conf.d/default.conf
#COPY conf/pandora.hypercentage.com.conf /etc/nginx/conf.d/
COPY conf/ /etc/nginx/conf.d/

CMD ["-c", "/etc/nginx/nginx.conf", "-g", "daemon off;"]

ENTRYPOINT ["nginx"]

EXPOSE 80

#FROM nginx:1.17.6-alpine
#
#RUN rm /etc/nginx/conf.d/*
#COPY conf/ /etc/nginx/conf.d/
#
#EXPOSE 80
