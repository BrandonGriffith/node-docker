FROM node:16.15
WORKDIR /app
# COPY package.json .
COPY . .
RUN npm install
# ENV PORT 4000
# EXPOSE $PORT
# CMD ["node", "index.js"]
CMD ["npm", "run", "dev"]