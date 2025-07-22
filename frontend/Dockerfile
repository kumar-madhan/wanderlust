# Use a stable Node.js LTS version for reliability
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package metadata first for build caching
COPY package*.json ./

# Install dependencies (use 'npm ci' for CI/CD or locked installs)
RUN npm install

# Copy the full application source
COPY . .

# Set environment variable for development
ENV NODE_ENV=development

# Expose application port (5123)
EXPOSE 5123

# Run the development server
CMD ["npm", "run", "dev"]
