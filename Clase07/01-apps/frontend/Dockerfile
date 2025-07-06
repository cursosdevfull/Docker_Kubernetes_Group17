FROM node:18-alpine

RUN apk add curl

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy application code
COPY . .

# Start the application
CMD ["npm", "start"]
