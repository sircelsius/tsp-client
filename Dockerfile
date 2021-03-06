FROM node:5.11
MAINTAINER <Marc Bramaud m.duboucheron@gmail.com>

WORKDIR /tmp
COPY ./package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN cp -a /tmp/node_modules /usr/src/app/

CMD ["/usr/local/bin/node", "./index.js"]
