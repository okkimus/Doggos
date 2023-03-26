FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json startup.sh ./
COPY prisma ./prisma

RUN chmod +x startup.sh
RUN npm ci --omit=dev
RUN npx prisma generate

COPY ./dist/* ./dist/


EXPOSE 8080

ENTRYPOINT [ "/usr/src/app/startup.sh" ]