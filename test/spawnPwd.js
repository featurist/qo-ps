var ps = require('..');

ps.spawn('pwd', {cwd: '/'}, function (e, r) {
  console.log('done');
});
