FROM node:12.6.0-alpine

WORKDIR /app

COPY . /app

# Install necessary packages
RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 80

CMD ["npm", "run", "start"]