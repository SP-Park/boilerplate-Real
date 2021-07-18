import { Schema, model } from "mongoose";

const ProfileSchema = new Schema({
    account:{
        ref: 'users',
        type: Schema.Types.ObjectId       
    },
    ip: {
        type: Array,
        default: []
    },
    loginTime: {
        type:Array,
        default: []
    },
    createdTime: {
        type:Array,
        default: []
    },
    adminPage: {
        type: Number,
        default: 0
    },
}, { timestamps: true})

const Profile = model('profiles', ProfileSchema)
export default Profile;