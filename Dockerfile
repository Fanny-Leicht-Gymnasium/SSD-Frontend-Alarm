# Multi-stage Dockerfile for a Next.js 15 (TypeScript) app
# - builder: installs dependencies and runs the Next.js build
# - runner: minimal production image with built assets

FROM node:20-alpine AS builder
WORKDIR /app

# Install small build tools (some native packages may require these)
RUN apk add --no-cache python3 make g++ libc6-compat || true

# Copy dependency manifests first for better caching
COPY package.json package-lock.json* ./

# Install all deps (including dev deps needed for build)
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# -----------------------------------------------------------------------------
# Runner image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only what we need to run the built app
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "start"]
