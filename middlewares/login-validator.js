const { body } = require("express-validator")

const loginValidator = [
    body("email")
        .notEmpty().withMessage("Email Wajib Diisi")
        .isEmail().withMessage("Email Tidak Valid"),
    body("password")
        .notEmpty().withMessage("Password Wajib Diisi")
        .isLength({ min: 8, max:15 })
        .withMessage("Password Minimal 8 Karakter dan Maksmial 15 Karakter")
    // body("email").notEmpty().isEmail(),
    // body("password").notEmpty().isLength({ min: 8 })
];

module.exports = loginValidator;