const mongoose = require("mongoose");

const information = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  pronoun: {
    type: String,
  },
  phNo: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  languages: [
    {
      type: String,
    },
  ],
  bio: {
    type: String,
  },
  qualifications: {
    type: String,
    required: true,
  },
  license: {
    type: String,
    required: true,
  },
  practicingFrom: {
    type: Date,
  },
  title: {
    type: String,
  },
  ServiceType: [
    {
      type: String
    }
  ],
  AoE: [
    {
      type: String,
    }
  ],
  pdf: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
  },
});

const UserInformation = mongoose.model("userInformation", information);
module.exports = UserInformation;
