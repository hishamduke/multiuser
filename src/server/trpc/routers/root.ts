import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const rootRouter = router({
  root: publicProcedure.query(() => {
    console.log(Date.now());
    return "hi";
  }),
});
