# Use a node base image
FROM node:18-alpine3.16 as builder

# Set the working directory
WORKDIR /client

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire app directory
COPY . .

# Build the application
RUN npm run build
