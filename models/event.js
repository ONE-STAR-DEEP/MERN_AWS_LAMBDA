import mongoose, { Schema, model, models} from "mongoose";

const EventSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    img: {
        type: String,
        required: [true, 'Image is required.'],
    },
    date: {
        type: String, 
        required: [true, 'date required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required.'],
    },
    street: {
        type: String, 
        required: [true, 'street required'],
    },
    area: {
        type: String, 
        required: [true, 'area required'],
    },
    city: {
        type: String, 
        required: [true, 'city required'],
    },
    state: {
        type: String, 
        required: [true, 'state required'],
    },
    country: {
        type: String, 
        required: [true, 'country required'],
    },
    task: {
        type: String, 
        required: [true, 'Task required'],
    },
    desc: {
        type: String, 
        required: [true, ' required'],
    }
});

const Event= models.Event || model('Event', EventSchema);

export default Event;