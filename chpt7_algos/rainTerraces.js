// Rain Terraces
// The Seattle Coding Dojo wants to send excess water to the Burbank Coding Dojo, so it landscapes its rooftop with a set of unusual elevated terraces. The terraces are all the same width, but have varying heights. When it rains, water gathers in the low terraces that are surrounded by taller ones. For example, if we have terraces with heights [3,1,1,4,2], then as much as 4 units of water could be gathered, because water would pool 2-deep on two different terraces (both of the 1-high terraces: between the 3-high and 4-high terraces). Water on the other terraces just runs off the sides. Given an array of terrace heights, return the maximum amount of water that is trapped when rains come.

function rainTerraces(arr){
    var bucketStart = arr[0];
    var bucket_vol = 0;
    var total_vol = 0;
    if (arr.length < 3){  //no middle between terraces so water falls off side
        return total_vol;
    }
    for (var i = 1; i < arr.length-1; i++) {
        if(arr[i] >= bucketStart){
            bucketStart = arr[i] //reset the bucketStart
        } else{ //terraces going down now,start collecting water; we'll dump it if we don't have an end
            bucket_vol += (bucketStart - arr[i]);
            for (var j = i+1; j <= arr.length-1; j++) { //now comparing backwards to find an end
                if(arr[j] < bucketStart){ //keep collecting water
                    bucket_vol += (bucketStart - arr[j]);
                } else { 
                    var bucketStop = j; //found an end to our bucket
                    break; //quit looking
                }
            }
            if(bucketStop){//we had a proper bucket ended
                total_vol += bucket_vol; //add bucket to total volume
                bucket_vol = 0; //and dump it
                bucketStart = arr[bucketStop] //advance our bucket start
                i = bucketStop //advance i as we've handled our first bucket start to finish
                bucketStop = null //reset bucket stop to falsey value
            } else{
                bucket_vol = 0; //no terrace to catch it, so bucket fell over
            }
        }
    }
    return total_vol;
}

//tester function courtesy of Keoni
function testRainTerrace(func) {
    var tests = [
      {
        given: [3, 1, 1, 4, 2],
        expects: 4
      },
      {
        given: [1, 1, 1, 1, 1],
        expects: 0
      },
      {
        given: [],
        expects: 0
      },
      {
        given: [12, 1, 12, 1, 12],
        expects: 22
      },
      {
        given: [12, 11, 10, 9, 8],
        expects: 0
      },
      {
        given: [3, 1, 2, 1, 4, 2, 1],
        expects: 5
      },
      {
        given: [1, 2, 3, 4, 5, 6, 7, 8],
        expects: 0
      },
      {
        given: [8, 7, 6, 5, 4, 3, 2, 1],
        expects: 0
      }
    ];
    var result;
    for (var test of tests) {
      result = func(test.given);
      if (result === test.expects) {
        console.log("------------------------------------");
        console.log("SUCCESS", test.given);
      } else {
        console.log("------------------------------------");
        console.log("FAILURE", test.given);
        console.log("Expected: ", test.expects);
        console.log("Returned: ", result);
      }
    }
}

testRainTerrace(rainTerraces);