ps = require('..');

ps.spawn('echo', 'hi', function (e, r) {
  console.log('done');
});
