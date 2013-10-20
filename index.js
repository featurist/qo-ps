(function() {
    var self = this;
    var proc;
    proc = require("child_process");
    exports.exec = function(command) {
        var self = this;
        var args = Array.prototype.slice.call(arguments, 1, arguments.length - 1);
        if (arguments.length > 1) {
            var continuation = arguments[arguments.length - 1];
        }
        var options, ps, stdout;
        options = function() {
            if (args[args.length - 1] instanceof Object) {
                return args.pop();
            } else {
                return {};
            }
        }();
        ps = proc.spawn(command, args, {
            env: options.env,
            cwd: options.cwd
        });
        stdout = [];
        ps.stdout.on("data", function(d) {
            return stdout.push(d.toString());
        });
        ps.on("close", function(code) {
            if (code === 0) {
                continuation(void 0, stdout.join(""));
            } else {
                continuation("`" + command + " " + args + "` exited with code " + code);
            }
        });
    };
    exports.spawn = function(command) {
        var self = this;
        var args = Array.prototype.slice.call(arguments, 1, arguments.length - 1);
        if (arguments.length > 1) {
            var continuation = arguments[arguments.length - 1];
        }
        var options, ps;
        options = function() {
            if (args[args.length - 1] instanceof Object) {
                return args.pop();
            } else {
                return {};
            }
        }();
        ps = proc.spawn(command, args, {
            stdio: "inherit",
            env: options.env,
            cwd: options.cwd
        });
        ps.on("close", function(code) {
            continuation(void 0, code);
        });
    };
}).call(this);