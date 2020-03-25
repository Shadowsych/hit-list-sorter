// sort the list of combos inside of the unsorted textbox
function sortComboList() {
  var unsortedText = document.getElementById("textbox-unsorted").value;
  var sortedHits = [];

  // store the last token of each line, assuming it's the number of points
  var lines = unsortedText.split("\n");
  for(var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    // parse the points as a number
    var points = getPoints(lines[lineIndex]);

    // if it's a number, then add the hit into hits Array
    if(!Number.isNaN(points)) {
      sortedHits.push({lineIndex, points});
    }
  }

  // sort the hits list using a custom function to sort it based on points
  sortedHits.sort(function(hit1, hit2) {
    if(hit1.points > hit2.points) {
      return -1;
    }
    return 1;
  });

  // build the sorted hits
  var sortedTextBuilder = "";
  for(var hitIndex = 0; hitIndex < sortedHits.length; hitIndex++) {
    var hit = sortedHits[hitIndex];

    // add this hit's line into the sorted text builder
    sortedTextBuilder += lines[hit.lineIndex] + "\n";
  }

  // output the sorted hits
  var sortedText = document.getElementById("textbox-sorted");
  sortedText.value = sortedTextBuilder;
}

/*
  return the points (last token), assuming space is the delimeter.
  this method is faster than using the .split() method because it
  doesn't need to break the entire string and store it in an Array.
*/
function getPoints(line) {
  var charIndex = line.length - 1;
  var foundDelim = false;
  var points = "";

  // iterate the line until finding the space delimeter
  while(!foundDelim && charIndex >= 0) {
    var digit = line[charIndex];
    if(digit == " ") {
      // found the space delimeter, stop the parsing
      foundDelim = true;
    } else {
      // concatenate this digit
      points = digit + points;
      charIndex--;
    }
  }

  // parse the points as a number, then return it
  points = parseFloat(points.replace(/\D/g,''));
  return points;
}
