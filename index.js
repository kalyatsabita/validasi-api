const express = require("express")
const {body, validationResult} = require("express-validator")
const errorHandlerMiddleware = require('./middlewares/error-handler')
const registerValidator = require('./middlewares/register-validator')
// const loginValidator = require('./middlewares/login-validator')

const app = express()

app.use(express.json())

// app.get("/", (req, res) => {
//     // next
//     // ini namanya middleware
//     // console.log("Hello world")
//     // next()
//     return res.status(200).json({
//         status: "success",
//         message: "Selamat datang di API belajar validation"
//     })
// })

app.post("/auth/register",
            // body("email")
            //     .notEmpty().withMessage("Email Wajib Diisi")
            //     .bail()
            //     .custom(value => value.endsWith('@gmail.com'))
            //     .withMessage("Email harus menggunakan domain @gmail.com")
            //     .bail()
            //     .isEmail().withMessage("Email Tidak Valid"),
            // body("password")
            //     .notEmpty().withMessage("Password Wajib Diisi")
            //     .isLength({ min: 8 })
            //     .withMessage("Password Minimal 8 Karakter"),
            // body("ttl")
            //     .notEmpty().withMessage("Tanggal Lahir Wajib Diisi")
            //     .isDate({ format: 'YYYY-MM-DD' }).withMessage("Format Tanggal Tidak Valid (YYYY-MM-DD)"),
            // body("bio")
            //     .notEmpty().withMessage("Bio Wajib Diisi")
            //     .isLength({ min: 30, max: 999 })
            //     .withMessage("Bio Minimal 30 Karakter dan Maksimal 999 Karakter"),
            // body("hobi")
            //     .optional()
            //     .isString().withMessage("Hobi Wajib Wajib Berupa String"),
            // body("pendidikan")
            //     .optional()
            //     .isArray().withMessage("Pendidikan Wajib Berupa Array")
            //     .bail()
            //     .custom(values => {
            //         if (values.length > 0) {
            //             return values.every(value => ["SD", "SMP", "SMA", "SMK", "S1", "S2", "S3"].includes(value));
            //         }
            //         return true;
            //     }).withMessage("Pendidikan hanya Boleh: SD, SMP, SMA, SMK, S1, S2, S3"),
        registerValidator, (req, res) => {
    // registerValidator,    
    validationResult(req).throw()
    // console.log(req.body)
    //     res.json({ message: "test register" })
    // const validateResult = validationResult(req);
    // if(!validateResult.isEmpty()) {
    //     return res.status(400).json({
    //         status: "failed",
    //         message: "Validation Error",
    //         error: validateResult.array()
    //     })
    // }
    const body = req.body;
    return res.status(200).json({
        status: "success",
        message: "Berhasil Register",
        data: body
    })
})

// app.post("/auth/login", loginValidator, (req, res) => {
//     loginValidator,
//         // const result = validationResult(req);
//         // if (!result.isEmpty()) {
//         //     // validasi gagal
//         //     return res.status(400).json({ message: "validation error", detail: result.array() })
//         // }
    // validationResult(req).throw()
//         console.log(req.body)
//         res.json({ message: "test login" })
    // const validateResult = validationResult(req);
    // if(!validateResult.isEmpty()) {
    //     return res.status(400).json({
    //         status: "failed",
    //         message: "Validation Error",
    //         error: validateResult.array()
    //     })
    // }
//     const body = req.body;
//     return res.status(200).json({
//         status: "success",
//         message: "Berhasil Login",
//         data: body
//     })
// })

app.use(errorHandlerMiddleware)

app.listen(1945, ()=> {
    console.log(`app start at http://localhost:1945`)
})