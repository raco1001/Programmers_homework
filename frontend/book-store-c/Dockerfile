# Development stage
FROM node:latest 

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy env file and rename it to .env
COPY env .env

# Copy source code
COPY . .


# Start development server
CMD ["npm", "run", "start"] 