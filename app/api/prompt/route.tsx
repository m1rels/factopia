import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const dynamic = "force-dynamic";

export const GET = async (request: any) => {
  try {
    const isConnected = await connectToDB();

    if (isConnected) {
      const prompts = await Prompt.find({}).populate("creator");

      return new Response(JSON.stringify(prompts), { status: 200 });
    } else {
      // Handle the case where the database connection is not successful
      return new Response("Database connection failed", { status: 500 });
    }
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
