FROM node:16.14
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
# ENV PORT 4000
# EXPOSE $PORT
# CMD ["node", "index.js"]
CMD ["npm", "run", "dev"]