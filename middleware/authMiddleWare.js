const user = require("../models/userModel");

exports.isAdmin = async (req, res, next) => {
    if (!req.session.isAuth) {
        return res.redirect("/auth/login");
    }
    const admin = await user.findOne({ _id: req.session.admin._id, isAdmin: true });
    if (!admin) {
        req.flash("error", "Unauthorized user");
        return res.redirect("/auth/login");
    } else {
        req.session.admin = admin;
        next();
    }
}
