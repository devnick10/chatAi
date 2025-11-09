# ---------- Stage 1: Build ----------
FROM oven/bun:canary-alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

# ---------- Stage 2: Runtime ----------
FROM oven/bun:canary-alpine AS runner

WORKDIR /app

# Copy production artifacts from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lock ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Environment
ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["bun", "run", "start"]
