const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");
const _ = require('lodash');

const UserSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 ,
        required: true
    },
    password: {
        type: String,
        minglength: 5,
        required: true
    },
    address: {
        type:String
    },
    role : {
        type:Number,
        default: 0 
    },
    images: {
        type: Array,
        default: []
    },
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
        required: false
    },
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpiresIn: {
        type: Date,
        required: false
    }
}, { timestamps: true })


UserSchema.pre('save', function( next ) {
    var user = this;
    
    if(user.isModified('password')){    
        // console.log('password changed')
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});



// UserSchema.pre('findByIdAndUpdate', async function () {
//     this._update.password = await bcrypt.hash(this._update.password, 10)
//   })

UserSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

UserSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user);
    })
}

UserSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token,'secret',function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

UserSchema.methods.generatePasswordReset = async function() {
    this.resetPasswordExpiresIn = Date.now() + 36000000;
    this.resetPasswordToken = randomBytes(20).toString('hex');
}

UserSchema.methods.getUserInfo = function () {
    return _.pick(this, ['_id', 'email', 'name', 'role', 'verified'])
}

const User = mongoose.model('User', UserSchema);

module.exports = { User }