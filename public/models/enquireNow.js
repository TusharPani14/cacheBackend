const mongoose = require("mongoose");

const enquireNowSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        products: { type: String, required: true },
        phoneNo: { type: Number, required: true },
        message: {
            type: String, required: true
        },
    },
    {
        timestamps: true,
    }
);

const enquireNow = mongoose.model("enquiryNow", enquireNowSchema);

module.exports = enquireNow;
