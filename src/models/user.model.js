const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
    },
    status: {
        type: String, // ENUM: ACTIVE, PENDING, BLOCKED, DELETED, INACTIVE
        required: true,
        default: "PENDING",
    },
    type: {
        type: String, //ENUM: ADMIN, CUSTOMER, 
        required: true,
        default: "CUSTOMER",
    },
    addresses : [
        {
            line1: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            pincode: {
                type: String,
                required: true,
            },
            tag: {
                type: String, // such as home, office, other
            }
        }
    ]
    
}, { timestamps: true });

userSchema.methods.toShortJson = function () {
    const obj = this.toJSON();
  
    delete obj.password;
    delete obj.status;
    delete obj.addresses;
    return obj;
}

userSchema.methods.toSafeJson = function () {
    const obj = this.toJSON();
  
    delete obj.password;
    delete obj.status;
    return obj;
}

const Users = mongoose.model('User', userSchema);

module.exports = Users;