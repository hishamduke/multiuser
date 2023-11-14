import { z } from "zod";
import { myArray, updateMyarray } from "../../data";
import { router, publicProcedure } from "../trpc";
import { db } from "../../db";
import { TRPCError } from "@trpc/server";
export const gridRouter = router({
  getGrid: publicProcedure.query(async () => {
    const grid = await db.execute(
      "SELECT * FROM myArrayTable ORDER BY id LIMIT 1; "
    );
    const result = grid.rows[0]?.value! as string;
    const newArray = result.split(";").map((row) => row.split(",").map(Number));
    return newArray;
  }),

  updateGrid: publicProcedure
    .input(
      z.object({
        x: z.number(),
        y: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const { x, y } = input;

      const grid = await db.execute(
        "SELECT * FROM myArrayTable ORDER BY id LIMIT 1; "
      );

      const result = grid.rows[0]?.value! as string;
      const prev = result.split(";").map((row) => row.split(",").map(Number));

      prev[x][y] = !!prev[x][y] ? 0 : 1;

      const arrayString = prev.map((row) => row.join(",")).join(";");

      try {
        const query = `UPDATE myArrayTable SET value = "${arrayString}" WHERE id = 1`;
        await db.execute(query);
        await db.sync();
      } catch (error) {
        console.log("ERROR WHEN INSERTING");
        console.log(error);
      }

      return;
    }),
  clearGrid: publicProcedure
    .input(
      z.object({
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { password } = opts.input;
      if (password !== "abcdefg") {
        throw new TRPCError({ message: "ERROR", code: "UNAUTHORIZED" });
        return;
      }

      const myArray: number[][] = Array.from({ length: 50 }, () =>
        Array(80).fill(0)
      );
      const arrayString = myArray.map((row) => row.join(",")).join(";");
      try {
        const query = `UPDATE myArrayTable SET value = "${arrayString}" WHERE id = 1`;
        await db.execute(query);
        await db.sync();
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          message: "ERROR",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      return "hm";
    }),
});
