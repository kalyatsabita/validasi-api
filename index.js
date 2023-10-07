const express = require("express")
const {body, validationResult} = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {param} = require("express-validator")
const app = express()
const secretKey = 'mysecretkey'

app.use(express.json())

let users = [];
let userIdCounter = 1;

app.post('/auth/register', [
    body('fullName')
        .notEmpty().withMessage('Nama Wajib Diisi'),
    body('email')
        .notEmpty().withMessage('Email Wajib Diisi')
        .isEmail().withMessage('Email Tidak Valid'),
    body('password')
        .notEmpty().withMessage('Password Wajib Diisi')
        .isLength({ min: 8 }).withMessage('Password Minimal 8 Karakter')
        .matches(/[\W]/).withMessage('Password Wajib Memiliki Minimal 1 Simbol'),
    body('bio')
        .optional(),
    body('dob')
        .notEmpty().withMessage('Date of Birth Wajib Diisi')
        .isDate({ format: 'YYYY-MM-DD' }).withMessage('Format Tanggal Tidak Valid (YYYY-MM-DD)'),
    ], (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation Error', 
            detail: errors.array()
        })
    }

    const { fullName, email, password, bio, dob } = req.body;

    if (users.some(user => user.email === email)) {
        return res.status(400).json({
            message: 'Email Sudah Pernah Terdaftar.'
        })
      }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = {
        id: userIdCounter++,
        fullName,
        email,
        password: hashedPassword,
        bio,
        dob
    }

    users.push(user);

    res.status(201).json({
        message: 'Registrasi Success'
    })
});

app.post('/auth/login', [
    body('email')
        .notEmpty().withMessage('Email Wajib Diisi')
        .isEmail().withMessage('Email Tidak Valid'),
    body('password')
        .notEmpty().withMessage('Password Wajib Diisi')
        .isLength({ min: 8 }).withMessage('Password Minimal 8 Karakter')
        .matches(/[\W]/).withMessage('Password Wajib Memiliki Minimal 1 Simbol'),
    ], (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
            message: 'Validation Error',
            detail: errors.array()
        })
    }
  
    const { email, password } = req.body;
  
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({
            message: 'Login Failed'
        })
    }
  
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
            message: 'Login Failed'
        })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey);
  
    res.status(200).json({
        message: 'Success',
        data: { token }
    })
});

app.get('/users', (req, res) => {
    if (users.length === 0) {
      return res.status(404).json({
            message: 'User Not Found'
        })
    }
  
    const userData = users.map(user => ({
      fullName: user.fullName,
      email: user.email,
      bio: user.bio,
      dob: user.dob
    }))
  
    res.status(200).json({
        message: 'Success',
        data: userData
    })
});
  
app.get('/users/:userId', [
    param('userId')
        .isNumeric().withMessage('User ID Wajib Berbentuk Angka'),
    ], (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
            message: 'Validation Error',
            detail: errors.array()
        })
    }
  
    const userId = parseInt(req.params.userId, 10);
    const user = users.find(user => user.id === userId);
  
    if (!user) {
      return res.status(404).json({
            message: 'User Not Found' 
        })
    }
  
    const userData = {
      fullName: user.fullName,
      email: user.email,
      bio: user.bio,
      dob: user.dob
    }
  
    res.status(200).json({
        message: 'Success',
        data: userData
    })
});

app.listen(1945, ()=> {
    console.log(`app start at http://localhost:1945`)
})