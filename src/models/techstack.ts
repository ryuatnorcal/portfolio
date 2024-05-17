import mongoose from "mongoose"

const techStackSchema = new mongoose.Schema({
  label: {
    type: String,
    emu: ['Frontend', 'Backend', 'DevOps', 'Tools'],
    required: true,

  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  locale: {
    type: String,
    enum: ['en', 'jp']
  }
})

export const TechStack = mongoose.models?.TechStack || mongoose.model("TechStack", techStackSchema)