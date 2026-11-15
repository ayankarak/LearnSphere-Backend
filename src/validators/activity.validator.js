
import { z } from "zod";

export const heartbeatSchema = z.object({
    activeSeconds: z.coerce
        .number()
        .int()
        .min(1, "Active seconds must be at least 1")
        .max(60, "Maximum 60 seconds allowed per heartbeat")
});
