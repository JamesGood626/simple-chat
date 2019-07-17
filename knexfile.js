// Update with your config settings.

module.exports = {
  test: {
    client: "postgresql",
    connection: {
      host: process.env.LOCALHOST ? process.env.LOCALHOST : "127.0.0.1",
      user: "jamesgood",
      password: "postgres",
      database: "simple_chat_test"
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/test"
    }
  },

  development: {
    client: "postgresql",
    connection: {
      host: process.env.LOCALHOST ? process.env.LOCALHOST : "127.0.0.1",
      user: "jamesgood",
      password: "postgres",
      database: "simple_chat"
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/development"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/db/migrations",
      tableName: "knex_migrations"
    }
  },

  // TODO:
  // - set production version to run w/ mix_env=PROD
  // - Create environment variables for database, user, password
  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/db/migrations",
      tableName: "knex_migrations"
    }
  }
};
