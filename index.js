(function() {
    var self = this;
    var proc;
    proc = require("child_process");
    exports.exec = function(command, continuation) {
        var self = this;
        var gen1_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
        continuation = arguments[arguments.length - 1];
        if (!(continuation instanceof Function)) {
            throw new Error("asynchronous function called synchronously");
        }
        command = gen1_arguments[0];
        var args = Array.prototype.slice.call(gen1_arguments, 1, gen1_arguments.length);
        var options, ps, stdout;
        options = function() {
            if ($3c$3a(args[args.length - 1], Object)) {
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
                continuation("`" + args + "` exited with code " + code);
            }
        });
    };
    exports.spawn = function(command, continuation) {
        var self = this;
        var gen2_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
        continuation = arguments[arguments.length - 1];
        if (!(continuation instanceof Function)) {
            throw new Error("asynchronous function called synchronously");
        }
        command = gen2_arguments[0];
        var args = Array.prototype.slice.call(gen2_arguments, 1, gen2_arguments.length);
        var options, ps;
        options = function() {
            if ($3c$3a(args[args.length - 1], Object)) {
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