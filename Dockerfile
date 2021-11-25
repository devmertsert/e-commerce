# Use the node 12 image on Linux Alpine latest
FROM node:12-alpine

# Set the port to 3000
ENV PORT=3000

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY src /app/src

# check files list
RUN ls -a

# install dependencies
RUN npm install && npm install --only=dev

# build the service
RUN npm run build

EXPOSE ${PORT}

# run the service
CMD [ "node", "./dist/app.js" ]