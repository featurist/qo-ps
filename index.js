(function() {
    var self = this;
    var proc;
    proc = require("child_process");
    exports.exec = function(command) {
        var self = this;
        var args = Array.prototype.slice.call(arguments, 1, arguments.length);
        return new Promise(function(success, failure) {
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
            return ps.on("close", function(code) {
                if (code === 0) {
                    return success(stdout.join(""));
                } else {
                    return failure(new Error("`" + command + " " + args.join(" ") + "` exited with code " + code));
                }
            });
        });
    };
    exports.spawn = function(command) {
        var self = this;
        var args = Array.prototype.slice.call(arguments, 1, arguments.length);
        return new Promise(function(success, failure) {
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
            return ps.on("close", function(code) {
                return success(code);
            });
        });
    };
}).call(this);