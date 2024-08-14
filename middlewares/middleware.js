const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/model');

exports.initilizingPassport = async (passport) => {
    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            const admin = await Admin.findOne({ username });
            if (!admin) {
                return done(null, false, { message: 'Incorrect username or password' });
            };
            const isMatch = await admin.comparePassword(password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect username or password' });
            };
            return done(null, admin);
        } catch (error) {
            return done(error, false);
        };
    }));
    passport.serializeUser((admin, done) => {
        done(null, admin.id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const admin = await Admin.findById(id);
            done(null, admin);
        } catch (error) {
            done(error, false);
        };
    });
};

exports.IsAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user && req.user.role === 'admin') {
            return next();
        } else {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        };
    } else {
        return res.redirect('/login');
    };
};

exports.isLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    };
    next();
};
