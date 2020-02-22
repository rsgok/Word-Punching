FROM node:10.16.3
LABEL author="kysoo" 
ENV NODE_ENV=production
ENV HOST 0.0.0.0
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
RUN apt-get update
RUN apt-get install vim -y
RUN apt-get install iputils-ping -y
RUN apt-get install net-tools -y
RUN apt-get install telnetd-ssl -y
RUN apt-get install xinetd -y
RUN apt-get install telnetd -y

RUN mkdir -p /app
COPY . /app
WORKDIR /app
EXPOSE 3000
# RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
RUN npm run build
CMD ["npm", "start"]