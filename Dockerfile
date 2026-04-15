FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install
RUN bun run prisma generate
RUN bun run tsoa spec-and-routes
RUN bun run tsc

EXPOSE 5000

CMD ["bun", "dist/server.js"]