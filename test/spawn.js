ps = require('..');

var args = [];
args.push.apply(args, process.argv.slice(2));
args.push(function (e, r) {
  console.log('done');
});

ps.spawn.apply(ps, args);
