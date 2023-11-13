import { router, publicProcedure } from "../trpc";
import { z } from "zod";
export const postRouter = router({
  postCreate: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation((opts) => {
      const { input } = opts;
    }),
  postList: publicProcedure.query(() => {
    // ...
    return [];
  }),
});
