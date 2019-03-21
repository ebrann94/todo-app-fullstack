const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        minlength: 7,
        required: true,
        validator(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// Function to create a JSON web token and add it to the tokens array
UserSchema.methods.generateAuthToken = async function() {

    const token = jwt.sign({ _id: this._id.toString() }, 'taskappsecret');
    this.tokens = this.tokens.concat({ token });
    await this.save();

    return token;
}

UserSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});


// Finds a user by the given email and checks if a the password matches
UserSchema.statics.findByCredentials = async function(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Incorrect email or password');
    }

    return user;

}

// Converts the password to a hash when the document is saved
UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;