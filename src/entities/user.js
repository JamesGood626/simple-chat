const { saveUserToDatabase } = require("../database/user/inserts");

class User {
  constructor(username) {
    // TODO: Run validation/encoding on username
    this.username = username;
  }

  async saveToDatabase() {
    return await saveUserToDatabase({ user_name: this.username });
  }
}

module.exports = User;
