import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./routers/_app";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return { user: "jh" };
};

type Context = inferAsyncReturnType<typeof createContext>;

export const trpcInit = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});
