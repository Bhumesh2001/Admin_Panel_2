const Admin = require('../models/model');

exports.renderAdminPanel = (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    };
};

exports.renderLoginAdmin = (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        }); 
    };
};

exports.storeVideoInDatabase = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        };
        const fileBuffer = req.file.buffer;
        const fileName = req.file.originalname;

        console.log('File buffer:', fileBuffer);
        console.log('File name:', fileName);

        console.log(req.body);
        res.status(200).json({
            success: true,
            data: req.body,
            message: 'Ok',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    };
};

exports.createAdmin = async (req, res) => {
    try {
        const newAdmin = new Admin(req.body);
        await newAdmin.save();
        console.log('Admin user created successfully');
        res.status(201).json({
            success: true,
            message: "Admin user created successfully...",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    };
};