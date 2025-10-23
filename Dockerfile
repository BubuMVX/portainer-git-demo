# Multi-stage build to optimize image size
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy configuration files
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies
RUN npm ci

# Copy source code
COPY src/ ./src/

# Compile TypeScript
RUN npm run build

# Production stage
FROM node:22-alpine AS production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy configuration files and dependencies
COPY package*.json ./
COPY --from=builder /app/dist ./dist

# Install production dependencies only
RUN npm ci --only=production && npm cache clean --force

# Change file ownership
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port (will be overridden by docker-compose)
EXPOSE 8080

# Start command
CMD ["node", "dist/server.js"]
