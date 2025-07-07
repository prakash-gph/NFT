import express from "express"
// import twilio from "twilio"
const router = express.Router()
import {contact, volunteerData} from "../datamodel/duser.js"
// import transport from "../nodemailer/nodeMailer.js"
// const storeOtp = {};

export const contactRouters = router.post("/contact-information", async (req, res) => {

    const { name, email, city, message, phoneNumber } = req.body
    
    
    try {
        const check = await contact.findOne({ email })
        if (check) {
            return res.json({
                error: "Email is already exist"
            })
        }

        //OTPGENERATE
        // const otp = Math.floor(100000 + Math.random() * 900000);
        // storeOtp[""] = { otp }
        // const mailOption = {
        //     from: process.env.SENDER_EMAIL,
        //     to: email,
        //     subject: "WELCOME TO NATIONAL FIRST TRUST.....",
        //     html: `<h3> Welcome to national first trust website.
        //      Please must enter your otp. Your otp is: ---<h2>${otp}</h2><h3>--- verify otp.</h3>`
        // }
        // await transport.sendMail(mailOption).catch(error =>{
        //     return res.json(`error${error}`)})

        // const accountSid = 'AC4fb7a90d0a84e12d3390c86108229a67';
        // const authToken = '4de9aba5978c6a684dd241b31b08dff9';
        // const client = new twilio(accountSid, authToken)

        // client.messages
        //     .create({
        //         body: `Your Otp is: ${otp}`,
        //         messagingServiceSid: 'MG54b200f68425975fd923f93df2924519',
        //         from: process.env.TWILIO_MOBILE_NUMBER,
        //         to: `+91${phoneNumber}`
        //     })
        //     .then(message => console.log(message.sid));

        console.log(city)
        const storeContact = new contact({ name: name, email: email, mobile: phoneNumber, city: city, message: message })
        await storeContact.save()
         
        return res.json({ success: "successfull" })
    }
    catch (error) {
        return res.json("Error" + error)
    }
})

// export const otpVerifiy = router.post("/verify-otp", async (req, res) => {
//     const { otpValue } = req.body
//     try {
//         const storeOtps = storeOtp[""]
        
//         if (storeOtps.otp != otpValue) {
//             delete storeOtps[""]
//             return res.json({
//                 success: false, error: "Invalid Otp,Enter valid otp"
//             })
//         }
//         return res.json({
//             success: "successfull"
//         })
//     } catch (error) {
//         return res.json(""+ error)
//     }

// })


export const volunteerRouters = router.post("/become-volunteer", async (req, res) => {

    const { name, email, mobile, city, message } = req.body
    try {
        const check = await volunteerData.findOne({ email })
        if (check) {
            return res.json({
                error: "Email is already Exist"
            })
        }
        const volunteerDatas = new volunteerData({
            name: name, email: email, mobile: mobile, city: city, message: message
        })

        const storeVolunteerDatas = await volunteerDatas.save()

        return res.json(storeVolunteerDatas)

    }
    catch (error) {
        console.log("API ERRORS: " + error)
    }
})


