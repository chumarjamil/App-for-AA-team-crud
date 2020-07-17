const mongoose = require("mongoose");
const uri =
    "mongodb+srv://uj:12345@cluster0.b57a3.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose
    .connect(uri, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"));
mongoose.Promise = Promise;

module.exports.Package = require("./Package");