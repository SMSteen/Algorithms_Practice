function insertAt(arr, idx, value){
    for(var i=arr.length; i>= idx; i--){
        arr[i] = arr[i-1];
    }
    arr[idx] = value;
    return arr;
}

function removeAt(arr, idx){
    for (var i=idx; i<arr.length; i++){
        arr[i] = arr[i+1];
    }
    arr.length--;
    return arr;
}

function flattenArray(arr){
    var i = 0;
    while(i <= arr.length){
        if(!Array.isArray(arr[i])){ //not a nested array, keep value as is and move on
            i++;
        } else{
            if(arr[i].length == 0){ //empty array, remove it and move on
                removeAt(arr, i) // remove empty array
            } else{// got a nested array, let's deal with it
                var count = arr[i].length  //we'll need to shift our current array right this many times
                var idx = i;  //this is where want to start shifting our array
                for (var j = 0; j < count; j++) {
                    insertAt(arr, i+j, arr[idx+j][j])  //insert each nested array value into our array
                }
                removeAt(arr, idx+count) // our nested array shifted right by the length of nested array, now we remove it
            } //do not increment i, reevaluating again will capture nested arrays within nested arrays
        }
    }
    return arr;
}

// test = [1, [[[2, 3], 4], [1, 2, 3]], 4, []];
// console.log(flattenArray(test)) //should return [1,2,3,4,1,2,3,4]

Array.prototype.equals = function(arr){
    if (!Array.isArray(arr) || arr.length !== this.length){
        return false;
    }

    for (var idx = 0; idx < this.length; idx++){
        if (arr[idx] !== this[idx]){
            return false;
        }
    }

    return true;
}

function testFlatten(func) {
    var tests = [
        {
            testArray: [1,[[2],3],4,[5,6,[[[[7],8],9],10],11,[12]],13],
            expect: [1,2,3,4,5,6,7,8,9,10,11,12,13]
        },
        {
            testArray: [],
            expect: []
        },
        {
            testArray: [1,[2,3],4,5,[6,[[7,8,9],10],11,[12]],[[[13]]]],
            expect: [1,2,3,4,5,6,7,8,9,10,11,12,13]
        },
        {
            testArray: [[[[[[[[[[[[[1]]]]]]]]]]]]],
            expect: [1]
        },
        {
            testArray: [[[[[[[[[[[[[1]]]]]]]]]]]],[]],
            expect: [1]
        }
    ];
    for (var test of tests){
        func(test.testArray);
        if (test.testArray.equals(test.expect)){
            console.log("Working case: ", test.testArray);
        } else {
            console.log("----------Failing case----------");
            console.log("Expected: ", test.expect);
            console.log("Got:      ", test.testArray);
        }
    }
}

testFlatten(flattenArray);