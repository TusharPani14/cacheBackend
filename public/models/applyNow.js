const mongoose = require("mongoose");

const applyNowSchema= mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phoneNo: { type: Number, required: true },
        email: { type: String, required: true, unique: true },
        positions: { type: String, required: true },
        resumeLink: {
            type: String, required: true
        },
    },
    {
        timestamps: true,
    }
);

const applyNow = mongoose.model("applyNow", applyNowSchema);

module.exports = applyNow;
