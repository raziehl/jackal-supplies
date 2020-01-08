FROM alpine

RUN mkdir /opt/nats
COPY src/* /opt/nats/
RUN chmod 755 /opt/nats/nats-server

CMD ["-c", "/opt/nats/nats-server.conf"]

ENTRYPOINT ["/opt/nats/nats-streaming-server"]

EXPOSE 4222
EXPOSE 6222
EXPOSE 8222
