# Use official Node.js LTS as the base
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install only prod dependencies for smaller image
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code
FROM base AS builder
WORKDIR /app

# Copy package files again for build deps
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Build Next.js app
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only the built output and node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 3000

CMD ["npm", "run", "start"]
