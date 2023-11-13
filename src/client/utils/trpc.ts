// utils/trpc.ts
import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../../server/trpc/routers/_app";

export const trpc = createTRPCReact<AppRouter>();
// => { useQuery: ..., useMutation: ...}
