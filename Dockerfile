FROM node:9

RUN useradd --user-group --create-home --shell /bin/false app

ENV DIR=/DIR/app

COPY package.json tools/ $DIR/tree/
RUN chown -R app:app $DIR/*

USER app
WORKDIR $DIR/tree
RUN npm install

USER root
COPY . $DIR/tree
RUN chown -R app:app $DIR/*
USER app

CMD ["npm", "run", "deploy"]

EXPOSE 8081
