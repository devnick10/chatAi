FROM oven/bun:canary-alpine

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN bunx prisma generate 

EXPOSE 3000

ENV BUN_ENV=production
ENV PORT=3000

CMD ["bun", "run", "start"]
