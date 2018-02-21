const mongoose = require('mongoose');

// mongoose.Promise = Promise;

const beautifyUnique = require('mongoose-beautiful-unique-validation');

// beauty MongoErrors
mongoose.plugin(beautifyUnique);
// mongoose.set('debug', true);

mongoose.plugin(schema => {
  if (!schema.options.toObject) {
    schema.options.toObject = {};
  }

  if (schema.options.toObject.transform === undefined) {
    schema.options.toObject.transform = (doc, ret) => {
      delete ret.__v;
      return ret;
    };
  }

});

const dbUrl = process.env.NODE_ENV === 'test' ? 'respondent-test' : 'respondent';

mongoose.connect(`mongodb://localhost/${dbUrl}`, {
  poolSize: 2,
  promiseLibrary: global.Promise
});

module.exports = mongoose;
