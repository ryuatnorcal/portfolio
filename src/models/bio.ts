import mongoose from "mongoose"

const bioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  locale: {
    type: String,
    enum: ['en', 'jp']
  }
})

export const Bio = mongoose.models?.Bio || mongoose.model("Bio", bioSchema)