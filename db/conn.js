const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient("mongodb+srv://eatthis320:cs320eatthis@cluster0.ggvnv2j.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: async function (callback) {
        await client.connect(function (err, db) {
            // Verify we got a good "db" object
            if (db) {
                _db = db.db("eatThis");
                console.log("Successfully connected to MongoDB.");
            } else {
                console.log(err);
            }
            return callback(err);
        });
    },

    getDb: function () {
        if (_db)
            return _db;
    },
};