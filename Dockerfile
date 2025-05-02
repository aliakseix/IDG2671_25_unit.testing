FROM node:23.9.0-slim

LABEL author="Aliaksei"
LABEL version="0.0.1"
LABEL iamarandomlable="hello there"

EXPOSE 8181/tcp

ENV MONGODB_PORT=27017

RUN groupadd app-gr
RUN useradd -g app-gr myfabuloususer

RUN mkdir /app

WORKDIR /app

COPY --chown=myfabuloususer:app-gr . /app

RUN npm install

USER myfabuloususer

CMD [ "npm", "run", "start"]