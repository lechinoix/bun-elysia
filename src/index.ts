import { db } from "./db";
import { eq } from "drizzle-orm";
import { movies } from "./schema";

import { Elysia, t } from "elysia";

const app = new Elysia()
    .get("/movies", async () => {
        return db.select().from(movies);
    })
    .get(
        "/movies/:id",
        async ({ params: { id } }) => {
            const result = await db
                .select()
                .from(movies)
                .where(eq(movies.id, Number(id)));
            return result;
        },
        {
            params: t.Object({
                id: t.Number(),
            }),
        }
    )
    .post(
        "/movies",
        async ({ body: { title, releaseYear } }) => {
            await db.insert(movies).values({
                title,
                releaseYear,
            });
        },
        {
            body: t.Object({
                title: t.String(),
                releaseYear: t.Number(),
            }),
        }
    )
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
