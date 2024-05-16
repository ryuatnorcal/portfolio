import mongoose from "mongoose"

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  years: {
    type: String,
    required: true
  },
  company: {
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

export const Experience = mongoose.models?.Experience || mongoose.model("Experience", experienceSchema)