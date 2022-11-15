import { app, get } from "https://denopkg.com/syumai/dinatra/mod.ts";

import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const url = Deno.env.get("DATABASE_URL");

console.log("connecting to url", url);

const client = new Client(url);

const greeting = "<h1>Hello From Deno on Fly!</h1>";

app(
  get("/", () => greeting),
  get("/:id", async ({ params }) => {
    console.log(params);

    await client.connect();

    const array_result = await client.queryArray(
      "SELECT * FROM pg_stat_activity",
    );

    console.log(array_result);

    return "ret";

    // console.log(array_result.rows);
    // return '<h1> sup </h1>'
  }),
);
