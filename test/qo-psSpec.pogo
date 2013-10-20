ps = require '..'
require 'chai'.should ()
mkdirp = require 'mkdirp'
rimraf = require 'rimraf'

describe 'qo-ps'
    describe 'exec'
        it 'executes a process and returns the output'
            ps.exec! 'echo' 'hi'.should.equal "hi\n"

        it 'executes a process in a given directory'
            mkdirp! 'test/a/b/c'
            ps.exec! 'pwd' (cwd: 'test/a/b/c').should.match r/\/a\/b\/c\n$/
            rimraf! 'test/a'

    describe 'spawn'
        it 'executes a process inheriting the stdio'
            ps.exec! 'node' 'test/spawn.js' 'echo' 'hi'.should.equal "hi\ndone\n"

        it 'executes a process inheriting the stdio'
            ps.exec! 'node' 'test/spawnPwd.js'.should.equal "/\ndone\n"
