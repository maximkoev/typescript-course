function exerciseExtra2() {
    /**
     * Write a program that prints the integers from 1 to 100 (inclusive).
     * But:
     *  - for multiples of three, print Fizz (instead of the number)
     *  - for multiples of five, print Buzz (instead of the number)
     *  - for multiples of both three and five, print FizzBuzz (instead of the number)
     */

    function verifyFizzOrBuzz(i: number) {
        if (i === 0) return i
        if (i % 5 == 0 && i % 3 == 0) return 'FizzBuzz'
        if (i % 3 == 0) return 'Fizz'
        if (i % 5 == 0) return 'Buzz'
        else return i
    }

    function fizzBuzz() {
        // TODO: add your code here
        for (let i = 0; i < 101; i++) {
            console.log(verifyFizzOrBuzz(i))
        }
    }


    /**
     * 1
     * 2
     * Fizz
     * 4
     * Buzz
     * ...
     */

    // TODO: convert fizzBuzz to generate a string instead of printing to console
    function fizzBuzzToString(): string {
        let res: string = ''
        for (let i = 0; i < 101; i++) {
            res = res.concat(verifyFizzOrBuzz(i).toString())
        }
        return res
    }

    console.log(fizzBuzzToString())

    fizzBuzzToString();
    // TODO: write a test to validate fizzBuzz output using console.assert
    console.assert(typeof fizzBuzzToString() === 'string');
    console.assert(verifyFizzOrBuzz(3) === 'Fizz', 'should return Fizz')
    console.assert(verifyFizzOrBuzz(5) === 'Buzz', 'should return buzz')
    console.assert(verifyFizzOrBuzz(4) === 4, 'should return 4')
    console.assert(verifyFizzOrBuzz(1) === 1, 'should return 1')
    console.assert(verifyFizzOrBuzz(2) === 2, 'should return 2')
    console.assert(verifyFizzOrBuzz(6) === 'Fizz', 'should return Fizz for 6')
    console.assert(verifyFizzOrBuzz(30) === 'FizzBuzz', `should return FizzBuzz for 30`)
    console.assert(fizzBuzzToString().split('')[0] === '0', 'first element should be 0')

}

exerciseExtra2();
