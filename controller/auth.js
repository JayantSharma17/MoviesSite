const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Wishlist = require("../models/Wishlist");
const Movie = require("../models/Movie");

const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(422).send('All fields are required.')
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ message: 'This email is already exist.' });
        }

        const userdata = await new User({ username, email, password });

        //middleware password hashing working here from userSchema
        await userdata.save();
        return res.status(201).json({ message: "Registration successfull." })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: e, message: 'Registration unsuccesfull' })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailExist = await User.findOne({ email: email });
        if (emailExist) {
            const isMatch = await bcrypt.compare(password, emailExist.password);
            if (isMatch) {
                console.log(emailExist)
                const token = await emailExist.generateAuthToken();
                console.log(`Token: ${token}`);
                res.status(200).json({ message: "User Login successfully", response: emailExist, token: token });
            }
            else {
                res.status(400).json({ message: "Invalid Credentials p" });
            }
        }
        else {
            res.status(400).json({ message: "Invalid Credentials m" });
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
}

const validateUser = async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        const userId = user._id;
        const userData = await User.findById(userId);
        console.log(userData)
        res.status(200).json({ message: "Authorized User", response: userData, token: token });

    }
    catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
}

const createWishlist=async(req,res)=>{
    try{
        const { name, userId, status } = req.body;
        let userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: 'User not found.' });
        }
        // console.log(userData)
        const wishlistData = await new Wishlist({ userId, name, status });
        userData.wishlist.push(wishlistData);

        await wishlistData.save()
        await userData.save();
        return res.status(201).json({ message: "wishlist created successfully." })
    }
    catch(e){
        console.log(e)
        res.status(500).send(e);
    }

}
const allWishlist=async(req,res)=>{
    try{
        const {userId} = req.body;
        const wishlistData = await Wishlist.find({userId});
        console.log(wishlistData)
        return res.status(200).json({wishlistData})
    }
    catch(e){
        console.log(e)
        res.status(500).send(e);
    }

}
const addMovie=async(req,res)=>{
    try{
        const {wishlistId,title,year,rating,plot,img} = req.body;
        let wishlistData = await Wishlist.findById(wishlistId);
        const movieData = await new Movie({ wishlistId,title,year,rating,plot,img});

        console.log(wishlistData)
        wishlistData.movies.push(movieData);
        await movieData.save();
        await wishlistData.save()
        return res.status(201).json({ message: "movie added successfully." })

    }
    catch(e){
        console.log(e)
        res.status(500).send(e);
    }

}

const allmovies=async(req,res)=>{
    try{
        const {wishlistId} = req.body;
        const wishlist = await Wishlist.findById(wishlistId).populate('movies')
        console.log(wishlist.movies)
        return res.status(200).json({wishlist})
    }
    catch(e){
        console.log(e)
        res.status(500).send(e);
    }

}

module.exports = { register, userLogin, validateUser,createWishlist,allWishlist,addMovie,allmovies }