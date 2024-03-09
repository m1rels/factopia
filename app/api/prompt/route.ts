import mongoose from "mongoose";
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import * as UserModel from "@models/user";

export const dynamic = "force-dynamic";

export const GET = async (request: any) => {
  try {
    await connectToDB();

    mongoose.model('User', UserModel.UserSchema);

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
