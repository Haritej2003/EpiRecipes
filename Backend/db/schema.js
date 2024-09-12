const mongoose=require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL)
const userSchema=mongoose.Schema({
    Name:String,
    Email:String,
    Password:String, // add min length
    // Favourites:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'favourites'
    // }
});

const favouritesSchema=mongoose.Schema({
    id:Number,
    // add details
});

const user=mongoose.model('User',userSchema);
const favourites=mongoose.model('Favourites',favouritesSchema);

module.exports={
    user,
    favourites
}