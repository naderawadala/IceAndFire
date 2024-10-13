# Dockerfile for React Client

# Use the official Node.js image as the base image
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the built React app using nginx
FROM nginx:alpine

# Copy the built React app into the nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to serve the app
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
