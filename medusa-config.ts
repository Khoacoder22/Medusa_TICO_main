import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    // redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    databaseDriverOptions: {
      ssl: false,
      sslmode: "disable",
    },
    admin: {
      disable: false, // information_source: This will not serve the Admin UI
    },
    cors: {
      admin: {
        origin: ["http://localhost:5173"], // admin frontend
        credentials: true,
      },
      store: {
        origin: ["http://localhost:8000"], // store frontend if any
        credentials: true,
      },
    },
  },
  modules: [
    {
      resolve: "./src/modules/brand",
    },
  ],
})
