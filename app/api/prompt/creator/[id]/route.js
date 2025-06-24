import { connectToDB } from "@utils/database";
import Event from "@models/event";

export const GET = async (request, { params }) => {
  console.log("Fetching events created by:", params.id);

  try {
    await connectToDB();

    const events = await Event.find({ creator: params.id }).populate("creator");

    if (!events || events.length === 0) {
      return new Response("No events found for this creator", { status: 404 });
    }

    return new Response(JSON.stringify(events), { status: 200 });

  } catch (error) {
    console.error("Error fetching events:", error);
    return new Response("Failed to fetch events", { status: 500 });
  }
};
