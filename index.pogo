proc = require 'child_process'

exports.exec! (args, ...) =
    ps = proc.spawn (args, ...)

    stdout = []

    ps.stdout.on 'data' @(d)
        stdout.push(d.to string ())

    ps.on 'close' @(code)
        if (code == 0)
            continuation (nil, stdout.join '')
        else
            continuation "`#(args)` exited with code #(code)"

exports.spawn! (command, args, ...) =
    ps = proc.spawn (command, args, stdio: 'inherit')

    ps.on 'close' @(code)
        continuation (nil, code)
