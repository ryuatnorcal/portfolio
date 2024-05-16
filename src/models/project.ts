import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  locale: {
    type: String,
    enum: ['en', 'jp']
  }
})

export const Project = mongoose.models?.Project || mongoose.model("Project", projectSchema)