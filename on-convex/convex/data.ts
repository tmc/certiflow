import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const allControlCategories = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query("controls").collect();
  },
});

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
