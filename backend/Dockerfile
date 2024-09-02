# Use the official Node.js image as the base image
FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Remove or adjust this line if no build step is needed
# RUN npm run build 

EXPOSE 8000

CMD ["npm", "start"]
