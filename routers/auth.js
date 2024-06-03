const express = require('express');
const { register, userLogin, validateUser, createWishlist, allWishlist, addMovie ,allmovies} = require('../controller/auth');
const router = express.Router();

router.post('/register-user', register);
router.post('/login-user', userLogin);
router.post('/validate-user', validateUser);

router.post('/create-wishlist',createWishlist)
router.post('/wishlists',allWishlist)
router.post('/addmovie',addMovie)
router.post('/allmovies',allmovies)

module.exports = router;