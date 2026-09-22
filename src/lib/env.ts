import { z } from "zod";

/**
 * Environment validation.
 *
 * Every variable the running app reads is declared here and parsed once, at
 * module load, so a misconfigured deployment fails immediately instead of
 * halfway through a checkout. Later phases add their own keys (DATABASE_URL,
 * AUTH_SECRET, the Midtrans keys); see `.env.example` for the full list and
 * which phase introduces each one.
 */
const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
});

function parse<T extends z.ZodType>(
  schema: T,
  source: unknown,
  label: string,
): z.infer<T> {
  const result = schema.safeParse(source);

  if (!result.success) {
    const problems = result.error.issues
      .map((issue) => `  ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");

    throw new Error(`Invalid ${label} environment variables:\n${problems}`);
  }

  return result.data;
}

export const serverEnv = parse(
  serverSchema,
  { NODE_ENV: process.env.NODE_ENV },
  "server",
);

/**
 * Client variables are read by explicit property access rather than by
 * spreading `process.env`, because Next.js inlines `NEXT_PUBLIC_*` at build
 * time only where it can see the literal reference.
 */
export const clientEnv = parse(
  clientSchema,
  { NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL },
  "client",
);

export { serverSchema, clientSchema };
