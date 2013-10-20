ps = require '..'
require 'chai'.should ()

describe 'qo-ps'
    describe 'exec'
        it 'executes a process and returns the output'
            ps.exec! 'echo' 'hi'.should.equal "hi\n"

    describe 'spawn'
        it 'executes a process inheriting the stdio'
            ps.exec! 'node' 'test/spawn.js'.should.equal "hi\ndone\n"
            
