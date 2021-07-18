import { Router } from 'express';
import { randomBytes } from 'crypto';
import { Profile, User } from '../models';
const { auth } = require("../middleware/auth");
import multer from 'multer';
const bcrypt = require('bcrypt');
const saltRounds = 10;


const router = Router()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {
    console.log(req)
    //가져온 이미지를 저장을 해주면 된다.
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

})


router.get("/auth", auth, (req, res) => {

    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        address: req.user.address,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", async (req, res) => {
    console.log(req.body)
    try {
        let { name, email, ip, adminPage } = req.body;
        let user = await User.findOne({ name })
        if(user) {
            return res.status(400).json({
                success: false,
                message: 'Username is a already taken'
            })
        }
        user = await User.findOne({ email })
        if(user) {
            return res.status(400).json({
                success: false,
                message: 'Email is a already registered. Did you forget the password. Try resetting it.'
            })
        }
        user = new User ({
            ...req.body, 
            verificationCode: randomBytes(20).toString('hex')
        })

        let profile = new Profile ({
            account: user._id,
            ip: ip,
            createdTime: Date.now(),
            adminPage: adminPage
        })
        await profile.save((err, doc) => {
            if (err) return res.json({ success: false, err });
        })

        await user.save((err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            });
        })
        console.log('User', user)
        

    } catch (err) {
        console.log('ERR :', err.message)
        return res.status(500).json({
            success: false,
            messgae: 'AN error accurred...'
        })
    }

});


router.post("/login", (req, res) => {


    console.log(req.body)

    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });
    

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });


        Profile.findOneAndUpdate(
            { account: user._id },
            {
                $push: {
                    loginTime: Date.now()
                }
            },
            { new: true },
            (err, doc) => {
                if (err) {
                    res.status(400).json({ success: false, err })
                    return
                }  
                // if(!err) {
                //     res.status(200).json({
                //         success: true
                //     })
                //     return
                // }
                
            }
        )
    
    });
});

router.get('/userslist', auth, async (req, res) => {
    let users = await User.find().select('-password')
    if(!users) {
        return res.status(400).json({ success: false, message: 'Could not find users'})
    }
    return res.status(200).json({ success: true, usersInfo: users})

})


router.get("/logout", auth, (req, res) => {
    let logOutTime = Date.now(req.body)
    console.log(logOutTime)
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, logOutTime: logOutTime, err });
        return res.status(200).send({
            success: true, 
            logOutTime: logOutTime,
        });
    });
});

router.get('/user_by_id', async (req, res) => {
    let userId = req.query.id;

    User.find({ _id: { $in: userId }})
    .exec((err, user) => {
        if(err) return res.status(400).send(err)
        return res.status(200).send(user)
    })
})

router.put('/register/:id', async (req, res) => {
    try {
        const  { id } = req.params;
        const { password } = req.body;
        console.log(req.body)
        
        let salt = await bcrypt.genSalt(saltRounds)
        if(!salt) return res.status(400).json({
            success: false, 
            message: 'salt is not generated'
        })
        

        let hash_password = await bcrypt.hash(password, salt)
        if(!password) return res.status(400).json({
            success: false,
            message: 'Password is not generated'
        })


        let userUpdate = await User.findByIdAndUpdate(id,
            { 
                email: req.body.email, 
                name: req.body.name,
                password: hash_password,
                role: req.body.role,
                images: req.body.images,
                address: req.body.address 
            },
            { new: true }
        )
        return res.status(200).json({
            success: true, userUpdate
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            success: false, err
        })
    }
})

router.get('/delete_user/:id', async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(200).json({
        success: true
    })
})


export default router;