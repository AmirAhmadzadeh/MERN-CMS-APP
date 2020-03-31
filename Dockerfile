FROM  node:10.16.3

WORKDIR /usr/src

COPY ./ ./

RUN npm install 


CMD [ "../../bin/bash" ]