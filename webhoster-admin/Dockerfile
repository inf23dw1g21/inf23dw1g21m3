# Use the official Node image with version 14
FROM inf23dwg21/webhoster1.0:webhoster-admin

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3006

# Start the application
CMD ["sh", "-c", "sleep 10 && npm start"]
