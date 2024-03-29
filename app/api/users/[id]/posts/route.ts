import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request: any, { params }: any) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    if (prompts) {
      return new Response(JSON.stringify(prompts), { status: 200 });
    }

  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
