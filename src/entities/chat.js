const uuid = require("uuidv4");
const { saveChatToDatabase } = require("../database/chat/inserts");

class Chat {
  constructor(name) {
    // TODO: Run validation/encoding on username
    this.name = name;
    this.channel = uuid();
  }

  performUnsafeIO(fn) {
    fn(this.name());
  }

  async saveToDatabase() {
    return await saveChatToDatabase({ name: this.name, channel: this.channel });
  }
}

module.exports = Chat;
