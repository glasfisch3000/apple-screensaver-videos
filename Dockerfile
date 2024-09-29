# syntax=docker/dockerfile:1

ARG NODE_VERSION=21.1.0
FROM node:${NODE_VERSION}-alpine

# node production environment
ENV NODE_ENV=production

WORKDIR /usr/src/app

# some weird caching shit i think
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# run as non-root user
USER node

COPY . .
EXPOSE 1618
CMD ["npm", "start"]
