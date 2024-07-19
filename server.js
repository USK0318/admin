const express = require("express");
const expressSession = require("express-session");
const path = require("path");
const fileUpload = require("express-fileupload");
const flash = require('connect-flash');
const hbs = require("hbs");
const cors = require("cors");
const mongoDBSession = require("connect-mongodb-session")(expressSession);
const dotenv = require("dotenv").config();

const connectDb = require("./config/dbConnect.js");
const adminAuthRouter = require("./routes/adminRoutes/adminAuthRoute.js");
const adminRouter = require("./routes/adminRoutes/adminRoute.js");
const userAuthRouter = require("./routes/userRoutes/userAuthRoute.js");
const { isAdmin } = require("./middleware/authMiddleWare.js");
const careerRouter = require("./routes/careerRoutes/careerRoutes.js");
const app = express();

connectDb();

//storing sessions  
const store = new mongoDBSession({
    uri: process.env.MONGO_URI,
    collection: "userSessions",
});

//cors options
const corsOptions = {
    origin: "*",
    methods: "GET, POST, PUT, HEAD, PATCH, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// ############################################

app.use(flash());

// app.use((req, res, next) => {
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     next();
// });

// ############################################

//MIDDLEWARES.
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession({
    secret: "thisIsSecretKeyForDHAMMA#1",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2
    },
    resave: false,
    saveUninitialized: false,
    store: store,
}));

app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
}));

app.use(express.static(path.join(__dirname, "public")));
app.use('/uploadings',express.static(path.join(__dirname, "uploadings")));

//template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine("html", hbs.__express);
hbs.registerPartials(path.join(__dirname, "views", "partials"));
hbs.registerHelper('inc', function (value, options) {
    return parseInt(value) + 1;
});
hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});
app.get("/", async (req, res) => {
    return res.redirect("/auth/login");
});

//admin auth
app.use("/auth", adminAuthRouter);

//admin access
app.use("/admin", isAdmin, adminRouter);

//user auth
app.use("/", userAuthRouter);

app.use("/career", careerRouter);

app.listen(process.env.PORT, async (req, res) => {
    console.log(`server running on port.....${process.env.PORT}`);
});

// app.listen();