# Stage 1: Build the frontend
FROM node:18 
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# # Stage 2: Serve with Nginx
# FROM nginx:alpine
# COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 5173
CMD ["npm", "run", "dev"]
