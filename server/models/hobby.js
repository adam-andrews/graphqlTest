const mongoose = require('mongoose');
const MSchema = mongoose.Schema;


const hobbySchema = MSchema({
    title:String,
    description:String,
})

module.exports = mongoose.model('Hobby', hobbySchema);