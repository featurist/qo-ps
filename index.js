(function() {
    var self = this;
    var proc;
    proc = require("child_process");
    exports.exec = function(continuation) {
        var self = this;
        var gen1_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
        continuation = arguments[arguments.length - 1];
        if (!(continuation instanceof Function)) {
            throw new Error("asynchronous function called synchronously");
        }
        var args = Array.prototype.slice.call(gen1_arguments, 0, gen1_arguments.length);
        var gen2_o, ps, stdout;
        gen2_o = proc;
        ps = gen2_o.spawn.apply(gen2_o, args);
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
        var gen3_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
        continuation = arguments[arguments.length - 1];
        if (!(continuation instanceof Function)) {
            throw new Error("asynchronous function called synchronously");
        }
        command = gen3_arguments[0];
        var args = Array.prototype.slice.call(gen3_arguments, 1, gen3_arguments.length);
        var ps;
        ps = proc.spawn(command, args, {
            stdio: "inherit"
        });
        ps.on("close", function(code) {
            continuation(void 0, code);
        });
    };
}).call(this);