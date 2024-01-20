
function printText(message) {
  $("#info-label").text($("#info-label").text() + "\n" + message)
}

$(document).ready(() => {

  $("#dl-rules-frame-shower").click(function() {

    if ($("#dl-rules-frame").attr("open") === "open") {
      $("#dl-rules-frame").attr("open", false)
    } else {
      $("#dl-rules-frame").attr("open", true)
    }

  })

  $("#save-button").click(() => {
    chrome.storage.sync.set({ "test": "coucou" }, function(){
        console.log("save 1")
    });
    chrome.storage.local.set({ "phasersTo": "awesome" }, function(){
        console.log("save 2")
    });
  })

  $("#get-button").click(() => {
    chrome.storage.sync.get("test", function(items){
        printText(items["test"])
    });
    chrome.storage.local.get(/* String or Array */["phasersTo"], function(items){
        printText(items["phasersTo"])
    });
  })

  $("#dl-button").click(() => {
    chrome.downloads.showDefaultFolder()
  })

})
