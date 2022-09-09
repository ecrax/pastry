// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { groupRouter } from "./group";
import { authRouter } from "./auth";

export const appRouter = t.router({
  group: groupRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
