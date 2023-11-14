import express from "express";
import ViteExpress from "vite-express";
import { db } from "./db/index";
import { trpcInit } from "./trpc/entry";

const app = express();

async function test() {
  try {
    await db.sync();

    await db.execute(
      "CREATE TABLE IF NOT EXISTS myArrayTable (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT)"
    );

    const res = await db.execute("SELECT * FROM myArrayTable");
    if (!res.rows.length) {
      const myArray: number[][] = Array.from({ length: 50 }, () =>
        Array(80).fill(0)
      );
      const arrayString = myArray.map((row) => row.join(",")).join(";");
      try {
        const insertOne = await db.execute({
          sql: "insert into myArrayTable values (:id, :value)",
          args: { id: 1, value: arrayString },
        });
        await db.sync();
      } catch (error) {
        console.log(error);
        console.log("ERROR WHEN INSERTING");
      }
    }
  } catch (error) {
    console.log(error);
  }
}

test();

app.use("/trpc", trpcInit);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
