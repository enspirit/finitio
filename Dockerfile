# The site is a statically generated Nuxt application (see website/). The
# build produces plain HTML/CSS/JS, so the runtime image is just nginx — no
# Node and no application server.

FROM node:22-alpine AS builder

# better-sqlite3 compiles a native addon at install time; there is no musl
# prebuild to fall back on.
RUN apk add --no-cache python3 make g++

WORKDIR /build

# Dependencies first, so a content-only change reuses this layer. The
# postinstall hook runs `nuxt prepare`, which needs the config files.
COPY website/package.json website/package-lock.json ./
COPY website/nuxt.config.ts website/content.config.ts website/tsconfig.json ./
COPY website/shiki ./shiki
RUN npm ci

COPY website/ ./
RUN npm run generate

FROM nginx:alpine AS runtime

COPY website/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /build/.output/public /usr/share/nginx/html

EXPOSE 4000
