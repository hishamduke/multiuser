import { router, publicProcedure, mergeRouters } from "../trpc";
import { z } from "zod";

import { userRouter } from "./user";
import { postRouter } from "./post";
import { rootRouter } from "./root";
import { gridRouter } from "./grid";

const otherRouters = router({
  user: userRouter,
  post: postRouter,
  grid: gridRouter,
});

export const appRouter = mergeRouters(rootRouter, otherRouters);

export type AppRouter = typeof appRouter;
