const { saveUserToDatabase } = require("../database/user/inserts");
const { findUser } = require("../database/user/queries");

class User {
  constructor(username) {
    // TODO: Run validation/encoding on username
    this.username = username;
  }

  async saveToDatabase() {
    return await saveUserToDatabase({ user_name: this.username });
  }

  async findUser() {
    return await findUser({ user_name: this.username });
  }
}

module.exports = User;
