import { Router } from 'express';
import { randomBytes } from 'crypto';
const { User } = require('../models/User');
const { auth } = require("../middleware/auth");
import { pick, reduce } from 'lodash';
import multer from 'multer';

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
        let { name, email } = req.body;
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
        await user.save((err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            });
        })
    } catch (err) {
        console.log('ERR :', err.message)
        return res.status(500).json({
            success: false,
            messgae: 'AN error accurred...'
        })
    }
});


router.post("/login", (req, res) => {
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
    User.findByIdAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
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
        console.log(req.parmas)
        let userUpdate = await User.findOneAndUpdate(id,
            { 
                email: req.body.email, 
                name: req.body.name,
                password: req.body.password,
                role: req.body.role 
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

// app.put('/campgrounds/:id', async (req, res) => {
//     const { id } = req.params;
//     const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
//     res.redirect(`/campgrounds/${campground._id}`)
// });


export default router;