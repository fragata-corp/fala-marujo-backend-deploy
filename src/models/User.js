const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: String,
      required: true,
      default: false
    },
    isActive: {
      type: String,
      required: true,
      default: false
    },
    bio: String,
    fone: {
      type: String,
      required: true
    },
    address: {
      street: String,
      number: String
    },
    avatar: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

//Criptografa password

UserSchema.pre("save", async function(next) {
  try {
    //Generate a salt
    const salt = await bcrypt.genSalt(10);
    //Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.password, salt);
    //Re-assign hashed version over original, plain text password
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

//Compara new password com hash criptografada

UserSchema.methods.isValidPassword = async function(newPassword) {
  //recebe um novo password da requisição
  try {
    return await bcrypt.compare(newPassword, this.password); //verifica se é o mesmo criptografado
  } catch (error) {
    throw new Error(error); //se der erro
  }
};

module.exports = model("User", UserSchema);
