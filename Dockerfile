FROM node:10.13

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copy source
COPY . .

# NPM install and build with webpack
RUN npm run build

# Port
EXPOSE 8000

# Start container
ENTRYPOINT ["npm","run","prod"]
