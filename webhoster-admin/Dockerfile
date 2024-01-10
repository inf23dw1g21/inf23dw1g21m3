# pull official base image
FROM node:17.0.1-alpine3.14

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN npm install

# add app
COPY . .

EXPOSE 3006

# start app
CMD ["npm", "start"]