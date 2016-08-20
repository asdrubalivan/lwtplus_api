var models = require('./models/index');
models.Language.create({
  code: 'FR',
  name: 'French',
  left_to_right: false,
  remove_spaces: false,
  split_each_char: false,
  regex_split_sentences: false
});
