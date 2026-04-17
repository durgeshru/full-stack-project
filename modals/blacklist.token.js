const mongoose = require('mongoose');

const BlacklistTokenSchema = new mongoose.Schema({
   token: {
      type: String,
      required: true,
      unique: true
   },
   createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400 // 24 hours in seconds (24 * 60 * 60)
   }
});

module.exports = mongoose.model('BlacklistToken', BlacklistTokenSchema);
