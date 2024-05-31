import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const token_secret = process.env.TOKEN_SECRET;
const token_expiry = process.env.TOKEN_EXPIRY;
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["Job Seeker", "Employer"],
    }
}, {
    timestamps: true
});
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    else {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
});
UserSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
UserSchema.methods.generateToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        role: this.role
    }, token_secret, {
        expiresIn: token_expiry
    });
};
export const User = mongoose.model("User", UserSchema);
