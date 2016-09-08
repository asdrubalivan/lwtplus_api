var jsonfile = require('jsonfile');

function readfile(name) {
  let data = jsonfile.readFileSync(`seeds/${name}.json`);
  let len = data.length;
  let now = (new Date()).toISOString();
  for (var i = 0; i < len; i++) {
    data[i]['createdAt'] = now;
    data[i]['updatedAt'] = now;
  }
  return data;
}

module.exports = {
  readfile: readfile
};
