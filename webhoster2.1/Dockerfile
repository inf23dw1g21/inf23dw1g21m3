# Use a Node.js base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your LoopBack 4 application is running on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
