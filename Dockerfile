# Use Node.js image as base
FROM node:latest

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 4000
EXPOSE 4000

# Command to run the NestJS application
CMD ["npm", "run", "start:dev"]
