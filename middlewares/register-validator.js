const { body } = require("express-validator")

const registerValidator = [
    // body("name")
    //     .notEmpty().withMessage("Nama Wajib Diisi"),
    body("email")
        .notEmpty().withMessage("Email Wajib Diisi")
        .bail()
        .custom(value => value.endsWith('@gmail.com'))
        .withMessage("Email harus menggunakan domain @gmail.com")
        .bail()
        .isEmail().withMessage("Email Tidak Valid"),
    body("password")
        .notEmpty().withMessage("Password Wajib Diisi")
        .isLength({ min: 8 })
        .withMessage("Password Minimal 8 Karakter"),
    body("ttl")
        .notEmpty().withMessage("Tanggal Lahir Wajib Diisi")
        .isDate({ format: 'YYYY-MM-DD' }).withMessage("Format Tanggal Tidak Valid (YYYY-MM-DD)"),
    body("bio")
        .notEmpty().withMessage("Bio Wajib Diisi")
        .isLength({ min: 30, max: 999 })
        .withMessage("Bio Minimal 30 Karakter dan Maksimal 999 Karakter"),
    body("hobi")
        .optional()
        .isString().withMessage("Hobi Wajib Wajib Berupa String"),
    body("pendidikan")
        .optional()
        .isArray().withMessage("Pendidikan Wajib Berupa Array")
        .isIn(["SD", "SMP", "SMA", "SMK", "S1", "S2", "S3"])
        .withMessage("Pendidikan hanya boleh: SD, SMP, SMA, SMK, S1, S2, S3")
        // .bail()
        // .custom(values => {
        //     if (values.length > 0) {
        //         return values.every(value => ["SD", "SMP", "SMA", "SMK", "S1", "S2", "S3"].includes(value));
        //     }
        //     return true;
        // }).withMessage("Pendidikan hanya Boleh: SD, SMP, SMA, SMK, S1, S2, S3"),
        // body("nama").notEmpty(),
    // body("email").notEmpty().isEmail(),
    // body("password").notEmpty().isLength({ min: 8 })
];

module.exports = registerValidator;