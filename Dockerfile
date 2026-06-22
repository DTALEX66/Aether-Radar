# Aether Radar production container
# Build from repository root:
#   docker build -t aether-radar .
#   docker run --rm -p 4173:4173 aether-radar
FROM node:20-alpine AS deps
WORKDIR /app
COPY next-app/package.json next-app/package-lock.json* ./
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY next-app ./
COPY data ../data
COPY scripts ../scripts
RUN npm run sync:data && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4173
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 4173
CMD ["npm", "run", "start"]
