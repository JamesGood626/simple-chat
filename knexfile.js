// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.LOCALHOST ? process.env.LOCALHOST : "127.0.0.1",
      user: "jamesgood",
      password: "postgres",
      database: "simple_chat"
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
      tableName: "knex_migrations"
    }
  }
};
