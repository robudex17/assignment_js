const mongoose = require('mongoose')
const Schema = mongoose.Schema

const personSchema = new Schema({
  name : String,
  age : Number,
  stories: [{
      type: Schema.Types.ObjectId, ref: 'Story'
  }]
}) 

const storySchema = new Schema({
  author: {
    type: Schema.Types.ObjectId, ref : 'Person'
  },
  title : String,
  fans : [{
    type: Schema.Types.ObjectId, ref: 'Person'
  }]
})


exports.storySchema = mongoose.model('Story', storySchema)
exports.personSchema = mongoose.model('Person', personSchema)