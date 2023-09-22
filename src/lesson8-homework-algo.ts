// This is an algorithmic problem - use your algorithmic skills and typescript knowledge to solve it
function exerciseExtra1() {
    // TODO: create a function to determine if two strings are an anagram
    // HINT: A word is an anagram of another if you can rearrange its characters to produce the second word.
    function areAnagrams(s1: string, s2: string): boolean {
        const s1Arr = s1.split('');
        const s2Arr = s2.split('');
        let isAnagram: boolean = true;
        if (s1Arr.length != s2Arr.length) {
            isAnagram = false
            return isAnagram;
            // return isAnagram;
        }
        for (let i = 0; i < s1Arr.length; i++) {
            const currentChar = s1Arr[i];
            const charIndex = s2Arr.indexOf(currentChar)
            if (charIndex < 0) {
                isAnagram = false
                break;
            }
            // s2Arr.splice(charIndex, 1)
        }
        // if (s2Arr.length == 0) {
        //     isAnagram = true
        // }
        return isAnagram;
    }

    console.assert(!areAnagrams("abc", "abcd"), "Length check is failed");
    console.assert(areAnagrams("listen", "silent"), "listen&silent are not anagram");
    console.assert(areAnagrams("abc", "cba"), "abc&cba are not anagram");
    console.assert(!areAnagrams("abc", "cbd"), "abc&cbd are anagram");
    console.assert(areAnagrams("", ""), "empty strings");


    // HINT: consider exercise33 for code reuse ideas
}

exerciseExtra1();