var originIdx = 0;
var colors = [
    [ '#1e6823', '#44a340', '#8cc665', '#d6e685', '#eee' ],
    [ '#ff5675', '#ff6a89', '#ff88a7', '#ffb0cf', '#eee' ],
    [ '#0048cc', '#148cff', '#3cb4ff', '#5adeff', '#eee' ],
    [ '#9932cc', '#ad46e0', '#c15af4', '#ff9dff', '#eee' ],
];

var updateColors = function(newIdx) {
  var originColors = colors[originIdx];
  var newColors = colors[newIdx];
  for (var i = 0; i < originColors.length; i += 1) {
      $('.day[fill='+originColors[i] + ']').attr('fill', newColors[i]);
      $('.contrib-legend .legend li').eq(4-i).css('background-color', newColors[i]);
  }
  originIdx = newIdx;
  localStorage.colorGit = newIdx;
}

var updateReponameColors = function(newIdx) {
    var newColors = colors[newIdx];
    var repoNames = document.getElementsByClassName('repo js-repo');
    for (var i = 0; i < repoNames.length; i += 1) {
        repoNames[i].style.color = newColors[2];
    }
}

var updateContributionColors = function(newIdx) {
    var newColors = colors[newIdx];
    var contributionActivity = document.getElementsByClassName('simple-conversation-list');
    var contributionNames = document.getElementsByClassName('title');
    for (var i = 0; i < contributionNames.length; i += 1) {
        contributionNames[i].style.color = newColors[2];
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
          updateContributionColors(idx);
      } catch(err) { }
  }
});

updateColors(idx);
updateReponameColors(idx);
updateContributionColors(idx);

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  var value = request.value * 1;
  updateColors(value);
  updateReponameColors(value);
  updateContributionColors(value);
});
