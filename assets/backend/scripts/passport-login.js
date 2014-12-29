passport implementation
var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('./assets/backend/scripts/account');
mongoose config

var Schema = mongoose.Schema;
var itemSchema = new Schema ({
    title: String
    // link: String,
    // mod_description: String,
    // mod_description_datavis: String,

});
var Items = mongoose.model('Item', itemSchema);
var Item_resizer = new Item({
    title: 'Resizer'
});
console.log(itemSchema);

passport config
passport.use( new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//mongoose config
mongoose.connect('mongodb://localhost/passport_local_mongoose');
