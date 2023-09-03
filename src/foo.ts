type _Range<T extends number, R extends unknown[]> = R['length'] extends T ? R[number] : _Range<T, [R['length'], ...R]>;
type Ran<T extends number> = number extends T ? number :_Range<T, []>;
type R5 = Ran<998>
const b: R5 = 997

class A {
    constructor(f: number) {
        if (this.checkNum(f)){
            console.log(f)
        }else console.log('else condition')
    }
   private checkNum(f: number) {
        return f < 5;
    }
}

console.log(5 > 0)