const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    // if(err) {
    //     const extractedErrors = {
    //         // name: []
    //         // password: [
    //             // "Password Wajib Diisi",
    //             // "Minimal 8 Karakter, Maksimal 15 Karakter"
    //         // ]
    //     }
    //     err.array().map(err => {
    //         if(!extractedErrors[err.path]) {
    //             extractedErrors[err.path] = [];
    //         }
    //         extractedErrors[err.path].push(err.msg);
    //     })
    //     return res.status(400).json({
    //         status: "failed",
    //         message: "Validation Error",
    //         error: extractedErrors
    //     })
    // }
    return res.status(400).json({
        message: "Validation Error", 
        detail: err
    })
    // next()
}

module.exports = errorHandlerMiddleware