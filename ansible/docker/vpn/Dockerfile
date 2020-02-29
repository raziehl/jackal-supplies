FROM ubuntu:bionic
RUN apt-get update -q
RUN apt-get install -qy openvpn iptables curl
COPY src /usr/local/sbin
EXPOSE 1194/udp 
CMD run
