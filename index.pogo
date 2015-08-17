proc = require 'child_process'

exports.exec (command, args, ...) =
  promise @(success, failure)
    options =
        if (args.(args.length - 1) :: Object)
            args.pop ()
        else
            {}

    ps = proc.spawn (command, args, env: options.env, cwd: options.cwd)

    stdout = []

    ps.stdout.on 'data' @(d)
        stdout.push(d.toString ())

    ps.on 'close' @(code)
        if (code == 0)
            success (stdout.join '')
        else
            failure (@new Error "`#(command) #(args.join ' ')` exited with code #(code)")

exports.spawn (command, args, ...) =
  promise @(success, failure)
    options =
        if (args.(args.length - 1) :: Object)
            args.pop ()
        else
            {}

    ps = proc.spawn (command, args, stdio: 'inherit', env: options.env, cwd: options.cwd)

    ps.on 'close' @(code)
        success (code)
