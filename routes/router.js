const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const Controller = require('../controllers/controller');
const { IsAuthenticated, isLoggedOut } = require('../middlewares/middleware');
const passport = require('passport');

router.post('/create-admin', Controller.createAdmin);

router.post('/login-admin', (req, res, next) => {
    passport.authenticate('local', (err, admin, info) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        };
        if (!admin) {
            return res.status(401).json({ message: 'Invalid username or password' });
        };
        req.logIn(admin, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Login failed' });
            };
            return res.status(200).json({
                message: 'Login successful',
                redirectUrl: '/digital-vle',
            });
        });
    })(req, res, next);
});

router.get('/login', isLoggedOut, Controller.renderLoginAdmin);
router.get('/digital-vle', IsAuthenticated, Controller.renderAdminPanel);
router.post('/upload', upload.single('videoUpload'), Controller.storeVideoInDatabase);

module.exports = router;
