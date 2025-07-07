import mongoose from "mongoose";

//CONTACT INFORMATION
const contactInfromation = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    mobile: {
        type: Number,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "User contact information"
    }

}, { timestamps: true })

export const contact = new mongoose.model("Contact-Collection", contactInfromation)
//BECOME VOLUNTEER

const volunteer = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    mobile: {
        type: Number,
        require: true,
    },
    city: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "Volunteer"
    },

}, { timestamps: true })

export const volunteerData = mongoose.model("Volunteer-Datas", volunteer)

const adminSendOtp = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    adminOtp: {
        type: String,
        default: ""
    },
    adminExpireOtp: {
        type: Number,
        default: 0
    }
})


export const adminResetPassword = mongoose.model("adminSendOtp", adminSendOtp)

const adminImageVideos = new mongoose.Schema({
   
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }

})

export const adminUploadImageVideo = mongoose.model("adminUploadImageVideo", adminImageVideos)


const videoSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  cloudinaryId: String
});
 export const Video = mongoose.model('Video', videoSchema);