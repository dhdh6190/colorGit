var originIdx = 0;
var colors = [
    [ '#1e6823', '#44a340', '#8cc665', '#d6e685', '#eee' ],
    [ '#ff5675', '#ff6a89', '#ff88a7', '#ffb0cf', '#eee' ],
    [ '#0048cc', '#148cff', '#3cb4ff', '#5adeff', '#eee' ],
    [ '#9932cc', '#ad46e0', '#c15af4', '#ff9dff', '#eee' ],
    [ '#03001c', '#fe9600', '#ffc501', '#ffee4a', '#eee' ],
];

var updateColors = function(newIdx) {
  var originColors = colors[originIdx];
  var newColors = colors[newIdx];
  var originGraph = $('div.js-calendar-graph > svg > g g');
  for (var i = 0; i < originGraph.length; i += 1) {
      var rectList = $('div.js-calendar-graph > svg > g > g:nth-child('+(i+1)+') rect');
      for (var j = 0; j < rectList.length; j += 1) {
        var origin = $('div.js-calendar-graph > svg > g > g:nth-child('+(i+1)+') > rect:nth-child('+(j+1)+')');
        var original = origin.attr('fill');
        var newColorIdx = originColors.indexOf(original);
        origin.attr('fill', newColors[newColorIdx]);
      }
  }
  originIdx = newIdx;
  localStorage.colorGit = newIdx;
}

var updateReponameColors = function(newIdx) {
    var newColors = colors[newIdx];
    var repoNames = $('a.text-bold');
    for (var i = 0; i < repoNames.length; i += 1) {
        repoNames[i].style.color = newColors[1];
    }
}

// Initialize
var idx = localStorage.colorGit;
if (idx === undefined) { idx = 0; }
idx *= 1;

$('#js-pjax-container').bind("DOMSubtreeModified", function() {
  if ($('.contributions-tab').length == 1) {
      try {
          updateColors(idx);
          updateReponameColors(idx);
      } catch(err) { }
  }
});

updateColors(idx);
updateReponameColors(idx);

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  var value = request.value * 1;
  updateColors(value);
  updateReponameColors(value);
});
