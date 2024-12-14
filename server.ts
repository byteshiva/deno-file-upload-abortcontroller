// server.ts
import { serveDir, serveFile } from "jsr:@std/http/file-server";

Deno.serve(await handler);

async function handler(req: Request): Promise<Response> {
    const pathname = new URL(req.url).pathname;

    if (pathname.startsWith("/public")) {
        return serveDir(req, {
            fsRoot: "public/static",
            urlRoot: "public",
        });
    }

    if (pathname === "/") {
        return serveFile(req, "./public/index.html");
    }

    if (pathname === "/upload" && req.method === "POST") {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const bytes = new Uint8Array(arrayBuffer);
            const filePath = `uploads/${file.name}`;
            await Deno.writeFile(filePath, bytes);
            return new Response(`File uploaded successfully as ${filePath}`, { status: 200 });
        } else {
            return new Response("No file uploaded", { status: 400 });
        }
    } else {
        return new Response("Not Found", { status: 404 });
    }
}

