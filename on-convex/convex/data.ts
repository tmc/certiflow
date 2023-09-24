import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const populate = mutation({
  args: {
    table: v.string(),
    rows: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    for (const row of args.rows) {
      await ctx.db.insert(args.table, row);
    }
  },
});
