module.exports = {
  // secret data can be moved to env variables
  // or a separate config
  secret: 'mysecret',
  uri: 'mongodb://localhost/engagement',
  mongoose: {
    useMongoClient: true,
    keepAlive: 1,
    poolSize: 5
  },
  root: process.cwd(),
};