const app = require('../app');
const rp = require('request-promise').defaults({
  encoding: null,
  simple: false,
  resolveWithFullResponse: true,
  json: true
});

let server;
const User = require('../models/user');

describe('User tests', () => {
  const defaultUsers = require('../fixtures/users');

  before(done => {
    server = app.listen(3000, done);
  });

  after(done => {
    server.close(done);
  });

  describe('Test database operations', () => {
    after(async () => {
      await User.remove({});
    });
    context('Users test', () => {
      it('should create single user', async () => {
        const mock = JSON.parse(JSON.stringify(defaultUsers[0]));
        await User.remove({});
        const user = new User({
          email: mock.email.toLowerCase(),
          name: mock.name,
          jobTitle: mock.jobTitle,
          location: mock.location,
          industry: mock.industry,
        });
        const response = await user.save();
        response.email.should.eql(defaultUsers[0].email);
        response.name.should.eql(defaultUsers[0].name);
        response.jobTitle.should.eql(defaultUsers[0].jobTitle);
        response.location.should.eql(defaultUsers[0].location);
        response.industry.should.eql(defaultUsers[0].industry);
      });
    });
  });
});