import { router, publicProcedure } from "../trpc";
import { z } from "zod";
export const userRouter = router({
  userList: publicProcedure.query(() => {
    // [..]
    return "yum1";
  }),
});
