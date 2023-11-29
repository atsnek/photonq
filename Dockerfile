# Use a specific version of Node as the base image
FROM node:18-bullseye-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock first to leverage Docker caching for dependencies
COPY package.json yarn.lock ./

# Install dependencies only if package.json or yarn.lock changes
RUN yarn install --frozen-lockfile

# Copy the rest of the application code (e)
COPY . .

# Build the application
RUN yarn build

# Expose the port that the app will run on
EXPOSE 9000

# Set the entry point for the container
ENTRYPOINT ["yarn", "gatsby", "serve", "-H", "0.0.0.0"]
