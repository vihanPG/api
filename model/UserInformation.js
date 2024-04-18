const mongoose = require("mongoose");

const UserInformationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default:""
    },
    lastName: {
        type: String,
        default:""
    },
    address: {
        type: String,
        default:""
    },
    city: {
      type: String,
      default: "",
    },
    country: {
        type: String,
        default: "india",
      },
      postalCode: {
        type: String,
        default: "india",
      },
      aboutMe: {
        type: String,
        default: "",
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Information", UserInformationSchema);
