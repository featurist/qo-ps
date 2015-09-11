ps = require '..'
expect = require 'chai'.expect
mkdirp = require 'mkdirp'
rimraf = require 'rimraf'

describe 'qo-ps'
    describe 'exec'
        it 'executes a process and returns the output'
            expect(ps.exec! 'echo' 'hi').to.equal "hi\n"

        it 'executes a process in a given directory'
            mkdirp!('test/a/b/c', ^)
            expect(ps.exec!('pwd', cwd: 'test/a/b/c')).to.match r/\/a\/b\/c\n$/
            rimraf!('test/a', ^)

        xit 'executes a process in a given directory'
            mkdirp!('test/a/b/c', ^)
            expect(ps.exec!('ls', '-al', cwd: '/')).to.match r/\/a\/b\/c\n$/
            rimraf!('test/a', ^)

    describe 'spawn'
        xit 'executes a process inheriting the stdio'
            expect(ps.exec!('node', 'test/spawn.js', 'echo', 'hi')).to.equal "hi\ndone\n"

        xit 'executes a process inheriting the stdio'
            expect(ps.exec! 'node' 'test/spawnPwd.js').to.equal "/\ndone\n"
