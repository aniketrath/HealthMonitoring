# Use the official Node.js image as the base image
FROM node:14
# Set the working directory inside the container
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy all other project files
COPY . .
# Expose the port your app runs on
EXPOSE 2500
# Start the application
CMD ["node", "index.js"]