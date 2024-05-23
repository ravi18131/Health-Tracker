const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    disease: {
        type: String,
        required: true,
    },
    familyDisease: {
        type: String,
        required: true,
    },
    weights: [
        {
            weight: {
                type: Number,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now(),
            },
        }
    ],
    heights: [
        {
            height: {
                type: Number,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now(),
            },
        }
    ],
    calorieIntake: [
        {
            item: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now(),
                // required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            quantitytype: {
                type: String,
                required: true,
            },
            calorieIntake: {
                type: Number,
                required: true,
            },            
        }
        // goal: {
        //     type: String,
        //     // required: true,
        // },
    ],
    activityLevel: {
        type: String,
        // required: true,
    },
    sleep: [
        {
            date: {
                type: Date,
                default: Date.now(),
                // required: true,
            },
            durationInHrs: {
                type: Number,
                required: true,
            },
        },
    ],
    steps: [
        {
            date: {
                type: Date,
                default: Date.now(),
                // required: true,
            },
            steps: {
                type: Number,
                required: true,
            },
        },
    ],
    workouts: [
        {
            date: {
                type: Date,
                required: true,
            },
            exercise: {
                type: String,
                required: true,
            },
            durationInMinutes: {
                type: Number,
                required: true,
            },
        },
    ],
    water: [
        {
            date: {
                type: Date,
                default: Date.now(),
                required: true,
            },
            amountInMilliliters: {
                type: Number,
                required: true,
            },
        },
    ],
}, { timestamps: true });


userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});


const User = mongoose.model('User', userSchema);
module.exports = User;