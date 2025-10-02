# Stage 1: Install dependencies
FROM node:20.19-alpine AS install-package

WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json /app

# Install dependencies
RUN npm install

# Stage 2: Build the Angular application
FROM install-package AS build

WORKDIR /app

# Copy configuration files and source code
COPY angular.json tsconfig*.json webpack*.config.js /app/
COPY src /app/src
COPY public /app/public

# Build the Angular application
RUN npm run build:prod

CMD [ "/bin/sh" ]

# Stage 3: Serve the application with Nginx
FROM nginx:alpine

# Copy the built application from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf


# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/js/env.template.js > /usr/share/nginx/html/assets/js/env.js && exec nginx -g 'daemon off;'"]