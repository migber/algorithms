
const nestedArray = [1, {a: [2, 3]}, 4, [5, [6]], [[7], 8, 9], 10];
// Array inspiration taken from: https://medium.com/@moulayjam/solving-the-misery-of-flattening-and-array-algorithm-recursion-4c9e6bedae41
const nestedArray2 = [[1,[[[[[[[[2,3]]]]]]]]],[4,5,6],[7,8],[9,[10,11,[2,[4,5,[22,[55]]]]],12],[33, [[[[[[[[11,22355]]]]]]]],
[7,88,76], [17,98],[19, [209,712,[1945,[1969,512,[202,[45]]]],102]]]];

// #1 Algorithm
function flattenArray (arr) {
    let result = [];
    arr.forEach(item => {
        if(Array.isArray(item)) {
            result = result.concat(flattenArray(item))
        } else {
            result.push(item)
        }
    });
    return result;
}
console.time('#1 Flatten (recursion with .forEach)');
const flattenedArray = flattenArray(nestedArray2);
console.timeEnd('#1 Flatten (recursion with .forEach)');


// #2 Algorithm
function flattenArray2(arr) {
    let result = [];
    for(let i = 0; i <= arr.length-1; i++) {
        let item = arr[i];
        if(Array.isArray(item)) {
            result = result.concat(flattenArray2(item))
        } else {
            result.push(item)
        }
    }
    return result;
}
console.time('#2 Flatten (recursion with for cicle)');
const flattenedArray2 = flattenArray2(nestedArray2);
console.timeEnd('#2 Flatten (recursion with for cicle)');

// #3 Algorithm
function flatten (arr) {
    let result = [];
    // immutable for array "arr"
    let stack = [...arr], first;

    while (stack.length > 0) {
        first = stack[0];
        if (Array.isArray(first)) {
            Array.prototype.splice.apply(stack,[0,1].concat(first))
        } else {
            result.push(first);
            stack.splice(0,1)
        }
    }
    return result;
}
console.time('#3 Flatten with mutation of array');
const flattenedArrayNonResursive1 = flatten(nestedArray2);
console.timeEnd('#3 Flatten with mutation of array');


// #4 Algorithm
function flatten2 (arr) {
    let result = [];
    // immutable for array "arr"
    let stack = [...arr], first;

    while (stack.length > 0) {
        first = stack[0];
        if (Array.isArray(first)) {
            stack.splice(0,1, ...first);
        } else {
            result.push(first);
            stack.splice(0,1)
        }
    }
    return result;
}

console.time('#4 Flatten with splice');
const flattenedArrayNonResursive = flatten2(nestedArray2);
console.timeEnd('#4 Flatten with splice');
 
// #5 Algorithm
function flattenNonRecursion(arr) {
    const res = arr.slice();
    let i = 0;
  
    while (i < res.length) {
      if (Array.isArray(res[i])) {
        res.splice(i, 1, ...res[i]);
      }
      else {
        i++;
      }
    }
  
    return res;
  }

console.time('#5 Flatten with mutation of result array');
const flattenNonRecursiveArray = flattenNonRecursion(nestedArray2);
console.timeEnd('#5 Flatten with mutation of result array');

// #6 Algorithm
function flatWritten(input) {
    const stack = [...input];
    const res = [];
    while (stack.length) {
      // pop value from stack
      const next = stack.pop();
      if (Array.isArray(next)) {
        // push back array items, won't modify the original input
        stack.push(...next);
      } else {
        res.push(next);
      }
    }
    return res.reverse();
  }
console.time('#6 Flatten with stack pop & push');
const flattenNonRecursiveArray1 = flatWritten(nestedArray2);
console.timeEnd('#6 Flatten with stack pop & push');


// javascript .flat() function
// #7 Algorithm
console.time('#7 .flat(infinity)');
const withFlatFunction = nestedArray2.flat(Infinity);
console.timeEnd('#7 .flat(infinity)');