proc = require 'child_process'

exports.exec (command, args, ..., continuation) =
    options =
        if (args.(args.length - 1) :: Object)
            args.pop ()
        else
            {}

    ps = proc.spawn (command, args, env: options.env, cwd: options.cwd)

    stdout = []

    ps.stdout.on 'data' @(d)
        stdout.push(d.to string ())

    ps.on 'close' @(code)
        if (code == 0)
            continuation (nil, stdout.join '')
        else
            continuation (@new Error "`#(command) #(args.join ' ')` exited with code #(code)")

exports.spawn (command, args, ..., continuation) =
    options =
        if (args.(args.length - 1) :: Object)
            args.pop ()
        else
            {}

    ps = proc.spawn (command, args, stdio: 'inherit', env: options.env, cwd: options.cwd)

    ps.on 'close' @(code)
        continuation (nil, code)
