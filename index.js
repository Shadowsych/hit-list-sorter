// sort the list of combos inside of the unsorted textbox
function sortComboList() {
  var unsortedText = document.getElementById("textbox-unsorted").value;
  var sortedHits = [];

  // store the last token of each line, assuming it's the number of points
  var lines = unsortedText.split("\n");
  for(var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    // extract the points (last token), then parse it as a number
    var points = lines[lineIndex].split(" ").pop();
    points = parseFloat(points.replace(/\D/g,''));

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

  // output the sorted hits
  for(var hitIndex = 0; hitIndex < sortedHits.length; hitIndex++) {
    var hit = sortedHits[hitIndex];

    // add this hit's line into the sorted textbox
    var sortedText = document.getElementById("textbox-sorted");
    sortedText.value += lines[hit.lineIndex] + "\n";
  }
}
