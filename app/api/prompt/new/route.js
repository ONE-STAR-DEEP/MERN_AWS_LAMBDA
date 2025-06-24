import { connectToDB } from "@utils/database";
import Event from '@models/event';

export const POST= async (req) => {
    const {userId, img, date, name, street, area, city, state, country, task, desc} = await req.json();
    console.log(img)
    try {
        await connectToDB();
        const newEvent = new Event({
            creator: userId, img, date, name, street, area, city, state, country, task, desc})
        await newEvent.save();

        return new Response(JSON.stringify(newEvent), {status: 201})
    } catch (error) {
        return new Response("Failed to create a new Event", {status: 500})
    }
}