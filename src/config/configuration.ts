export default () => ({
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT, 10) || 3000,
  google: {
    client: {
      id:
        process.env.GOOGLE_CLIENT_ID ||
        '94304976094-rmd2qdhg1k2evntfs9jk4cdoae91r5l9.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'YqBvBZSizLlCtGe_-s1bpUBk',
    },
    redirectUrl:
      process.env.GOOGLE_REDIRECT_URL || 'http://localhost:8090/confirm-login',
  },
  accessTokenSecret:
    process.env.ACCESS_TOKEN_SECRET || 'YqBvBZSizLlCtGe_-s1bpUBk',
  accessTokenLife: parseInt(process.env.ACCESS_TOKEN_LIFE, 10) || '86400',
  database: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT, 10) || 27017,
    name: process.env.DB_NAME || 'project-db',
  },
});
