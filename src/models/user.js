const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) throw new Error('Age cannot be negative number !!!');
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre('findOneAndDelete', async function (next) {
  const filter = this.getFilter(); // Get query filter like { _id: req.user._id }
  const user = await this.model.findOne(filter); // Load the actual user document

  if (user) {
    await Task.deleteMany({ owner: user._id }); // Now it works ✅
  }

  next();
});

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens.push({ token });
  await user.save();
  return token;
};

userSchema.statics.getCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Unable to login !!!');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Unable to login !!');
  return user;
};
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  // delete userObject.avatar;
  delete userObject.id;

  return userObject;
};

/* userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false, // (optional) to remove `__v`
  transform(doc, ret) {
    delete ret.id; // ⛔ remove virtual id
    delete ret.password; // 🔒 (optional) hide sensitive fields
    delete ret.tokens; // 🔐 (optional) if you don't want to expose tokens
    delete ret.avatar;
    return ret;
  },
}); */

const User = mongoose.model('User', userSchema);

User.createIndexes();

module.exports = User;
