const mongoose = require('mongoose')

const passwordResetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  code: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  },
  used: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Auto-delete expired documents
passwordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

module.exports = mongoose.model('PasswordReset', passwordResetSchema)