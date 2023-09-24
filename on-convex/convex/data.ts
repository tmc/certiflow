import { v } from "convex/values";
import { action, internalAction, internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import OpenAI from 'openai';



export const allControlCategories = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query("control_categories" as any).collect();
  },
});

export const populate = mutation({
  args: {
    table: v.string(),
    rows: v.array(v.any()),
  },
  handler: async (ctx, args: any) => {
    for (const row of args.rows) {
      await ctx.db.insert(args.table, row);
    }
  },
});

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export const generateEmbeddings = internalAction({
  handler: async (ctx, args) => {
    const controls = await ctx.runQuery(internal.data.fetchEmbeddings, {});

    for (const control of controls) {
      const result = embed(control.implementationExample);
      await ctx.runMutation(internal.data.reallyGenerateEmbeddings, { id: control._id, embedding: result });
    }
  }});

export const fetchEmbeddings = internalQuery({
  handler: async (ctx, args) => {
    return await ctx.db.query("controls").collect();
  }}
);

export const reallyGenerateEmbeddings = internalMutation({
  handler: async (ctx, args: any) => {
    await ctx.db.patch(args.id, { embedding: args.embedding });
  }
});

const embed = async (text: string) => {
  const result = await openai.embeddings.create({
    input: text,
    model: "text-embedding-ada-002"
  });
  return result.data[0].embedding;
}

export const relatedControls = action({
  args: {
    descriptionQuery: v.string(),
  },
  handler: async (ctx, args) => {
    // 1. Generate an embedding from you favorite third party API:
    const embedding = await embed(args.descriptionQuery);
    // 2. Then search for similar foods!
    const results = await ctx.vectorSearch("controls", "by_embedding", {
      vector: embedding,
      limit: 16,
      //filter: (q) => q.eq("cuisine", "French"),
    });
    // ...
  },
});
