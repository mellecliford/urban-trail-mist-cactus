FROM node:22-bookworm-slim AS build
WORKDIR /app
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV CI=1
# Never migrate during the image build. Hosts inject DATABASE_URL at build
# time, and Postgres is not running yet — `npm run build` would fail the image.
ENV DATABASE_URL=
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_PUBLIC_HOSTNAME=eveopsgroup.cloud
ENV VITE_PUBLIC_HOSTNAME=$VITE_PUBLIC_HOSTNAME
ENV NITRO_PRESET=node-server
RUN node scripts/with-app-env.mjs vite build

FROM node:22-bookworm-slim AS run
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0
RUN npm install pg@8.16.3
COPY --from=build /app/.output ./.output
COPY --from=build /app/migrations ./migrations
COPY --from=build /app/scripts/migrate.mjs ./scripts/migrate.mjs
COPY --from=build /app/scripts/migration-plan.mjs ./scripts/migration-plan.mjs
COPY scripts/docker-entrypoint.sh ./scripts/docker-entrypoint.sh
RUN chmod +x ./scripts/docker-entrypoint.sh
EXPOSE 8080
CMD ["./scripts/docker-entrypoint.sh"]
