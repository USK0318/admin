const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const user = require("../../models/userModel");

isValidPassword = (password) => {
    return (
        password.length >= 5 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)
    );
};

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

isGeneratedOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
}
let otpStore = {}

module.exports = {
    index: async (req, res) => {
        try {
            return res.render("index", {
                success: req.flash("success"),
                error: req.flash("error")
            })
        } catch (error) {
            req.flash("error", "internal server error");
            return res.redirect("/auth/login");
        }
    },
    login: async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const adminExists = await user.findOne({ email });
            if (!adminExists || !adminExists.isAdmin) {
                req.flash("error", "you dont have admin access");
                return res.redirect(("/auth/login"));
            }
            const matchedPassword = await adminExists.matchPassword(password);
            if (!matchedPassword) {
                req.flash("error", "password is wrong");
                return res.redirect("/auth/login");
            }
            req.session.isAuth = true;
            req.session.admin = adminExists;
            req.session.save(err => {
                if (err) {
                    return next(err);
                }
                return res.redirect("/admin/dashboard");
            })
        } catch (error) {
            console.log(error);
            req.flash("error", "internal server error");
            return res.redirect("/auth/login");
        }
    },
    logout: async (req, res) => {
        try {
            req.session.destroy();
            return res.redirect("/auth/login");
        } catch (error) {
            console.log(error);
            req.flash("error", "internal server error");
            return res.redirect("/auth/login");
        }
    },
    forgot: async (req, res) => {
        return res.render("forgotPassword", {
            success: req.flash("success"),
            error: req.flash("error")
        });
    },
    sendOtp: async (req, res) => {
        try {
            const { email } = req.body;
            if (!isValidEmail(email)) {
                req.flash("error", "Invalid email format");
                return res.redirect("/auth/forgot");
            }
            const adminExists = await user.findOne({ email });
            if (!adminExists || !adminExists.isAdmin) {
                req.flash("error", "The email does not have the admin access");
                return res.redirect("/auth/forgot");
            }
            const generatedOtp = isGeneratedOtp();
            otpStore['otp'] = generatedOtp;
            otpStore['email'] = email;
            let mailSent = false;
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "digital.analouge1@gmail.com",
                    pass: "ypbo utjc cywr isjs"
                }
            });
            const mailOptions = {
                from: "digital.analouge1@gmail.com",
                to: email,
                subject: "VERIFICATION EMAIL",
                text: `Your otp is ${generatedOtp}, Don't share to any one`
            };
            try {
                await transporter.sendMail(mailOptions);
                mailSent = true;
            } catch (error) {
                console.log(error);
                mailSent = false;
            }
            if (!mailSent) {
                req.flash("error", "Failed to send otp");
                return res.redirect("/auth/forgot");
            }
            req.flash("success", "Otp Sent");
            return res.redirect(`/auth/otp?email=${email}`);
        } catch (error) {
            console.log(error);
            req.flash("error", "internal server error");
            return res.redirect("/auth/forgot");
        }
    },
    otpGet: async (req, res) => {
        try {
            const email = otpStore['email'];
            return res.render("otpScreen", {
                Email: email,
                success: req.flash("success"),
                error: req.flash("error"),
            });
        } catch (error) {
            console.log(error);
            req.flash("error", "internal server error");
            return res.redirect("/auth/forgot");
        }
    },
    verifyOtp: async (req, res) => {
        const referer = req.header('referer');
        try {
            const email = otpStore['email'];
            const userOtp = req.body.otp;
            const generatedOtp = otpStore['otp'];
            if (!generatedOtp) {
                req.flash("error", "Invalid Otp");
                console.log('Invalid Otp');
                return res.redirect(referer || '/');
            } else {
                if (generatedOtp != userOtp) {
                    req.flash("error", "otp is not matched");
                    console.log('otp is not matched');
                    return res.redirect(referer || '/');
                } else {
                    req.flash("success", "otp verified successfully you are able to change your password");
                    console.log('otp verified successfully you are able to change your password');
                    return res.redirect(`/auth/updatepassword?email=${email}`);
                }
            }
        } catch (error) {
            console.log(error);
            req.flash("error", "internal server error");
            return res.redirect("/auth/forgot")
        }
    },
    updatePasswordGet: async (req, res) => {
        const referer = req.header('referer');
        try {
            const email = otpStore['email'];
            // console.log(email);
            const User = user.findOne({email:req.query.email});
            if(!User){
                req.flash("error", "internal server error");
                res.redirect(referer || '/');
            }else{
                return res.render("updatePassword", {
                    success: req.flash("success"),
                    error: req.flash("error"),
                    Email: email
                });
            }
        } catch (error) {
            console.log(error);
            req.flash("error", "internal server error");
            return res.redirect("/auth/forgot");
        }
    },
    updatePasswordPost: async (req, res) => {
        try {
            const email = otpStore['email'];
            const password = req.body.password;
            if (!email) {
                req.flash("error", "no email found");
                return res.redirect("/auth/fogot");
            }
            const adminExists = await user.findOne({ email });
            if (!adminExists || !adminExists.isAdmin) {
                req.flash("error", "admin not found");
                return res.redirect("/auth/forgot");
            }
            const validPassword = isValidPassword(password);
            if (!validPassword) {
                req.flash("error", "Invalid password");
                return res.redirect(`/auth/updatepassword?email=${email}`);
            }
            const hashedPassword = await bcrypt.hash(password, 15);
            const updatedPassword = await user.updateOne({ email: email }, { $set: { password: hashedPassword } });
            if (!updatedPassword) {
                req.flash("error", "Password updating failed");
                return res.redirect("/auth/forgot");
            }
            delete otpStore['email'];
            delete otpStore['otp'];
            req.flash("success", "Password updated successfully");
            return res.redirect("/auth/login");
        } catch (error) {
            console.log(error);
            req.flash("error", "internal server error");
            return res.redirect("/auth/forgot");
        }
    }
}