import { connectToDB } from "@utils/database";
import Event from '@models/event';

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const events = await Event.findById(params.id).populate('creator');
if(!events) return new Response("Events not found", {status: 404})

        return new Response(JSON.stringify(events), {
            status: 200})
    }catch (error) {
        return new Response("Failed to fetch all events", {status: 500})
    }
}

export const PATCH = async (retuest, {params}) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Prompt not found", {status:404})

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200})
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500})
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted Successfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to delete prompt", {status: 500})    
    }
}