const { Schema, model } = require("mongoose");
const slugify = require('slugify');
const { v4: uuidv4 } = require("uuid");

const storageSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, default: 'active' },
  sku: { type: String, unique: true, required: true },
  pid: { type: String, required: true, default: uuidv4 },
  slug: { type: String, unique: true },
}, {
  collection: "storages", 
  timestamps: true,
});

storageSchema.pre('save', function (next) {
  const options = {
    lower: true,
    replacement: '-',
    strict: true,
    locale: 'vi',
    customReplacements: { 'Đ': 'd', 'đ': 'd' }
  };

  this.slug = slugify(this.name, options); 
  next();
});

storageSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.name) {
    const options = {
      lower: true,
      replacement: '-',
      strict: true,
      locale: 'vi',
      customReplacements: { 'Đ': 'd', 'đ': 'd' }
    };
    update.slug = slugify(update.name, options); 
    this.setUpdate(update);
  }
  next();
});

module.exports = model("Storage", storageSchema);
