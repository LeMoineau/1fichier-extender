
function terminal(contentId) {

  this.contentDiv = $(`#${contentId}`)
    .click(function() { terminal.focusLastWord() })
  this.init()
  this.ctrlDown = false
  this.allWordsSelected = false
  this.hist = []

}

terminal.prototype.init = function() {

  this.addWord(" >").addClass("start")
  this.addWord("").addClass("space")
  this.addWord("").css({ width: "1ch" }).focus()

}

terminal.prototype.getLastWord = function() {
  return this.contentDiv.children(".word:last-child");
}

terminal.prototype.getSecondLastWord = function(n) {
  return this.contentDiv.children(`.word:nth-last-child(${n || 2})`)
}

terminal.prototype.focusLastWord = function() {

  let textSize = this.getLastWord().val().length
  this.getLastWord().focus()[0].setSelectionRange(textSize, textSize)

}

terminal.prototype.addWord = function(value) {
  res = $("<input>")
    .attr({
      class: "word",
      type: "text",
      spellcheck: "false",
      value: value
    })
    .css({
      width: `${value.length}ch`
    })
    .keydown(function (event) { wordKeyDownListener($(this), event) })
    .keyup(function (event) { wordKeyUpListener($(this), event) })
    .appendTo(this.contentDiv)
  if (terminal.allWordsSelected) {
    res.addClass("selected")
  }
  return res
}

terminal.prototype.addCmdToHistorique = function(cmd) {
  this.hist.push(cmd)
}

terminal.prototype.space = function(event) {
  event.preventDefault()
  if (!this.getSecondLastWord().hasClass("space") || this.getLastWord().val().length > 0) {
    this.addWord("").addClass("space")
    this.addWord("").css({ width: "1ch" }).focus()
  }
}

terminal.prototype.erase = function(event) {
  if (this.contentDiv.children().length > 1 && this.getLastWord().val().length <= 0 && !this.getSecondLastWord(3).hasClass("start")) {
    this.getLastWord().remove() //remove le word où curseur
    this.getLastWord().remove() //remove l'espace d'avant
    this.focusLastWord()
    event.preventDefault()
  } else {
    this.getLastWord().css({ width: `${this.getLastWord().val().length - 1}ch` })
  }
}

terminal.prototype.enter = function(event) {
  event.preventDefault()
  let words = []
  $(".word:not(.space):not(.start)").each(function() {
    if ($(this).val().length > 0) {
      words.push($(this).val())
    }
  })
  if (words.length > 1) {
    let cmd = new command(words)
    cmd.execute()
    this.addCmdToHistorique(cmd)
    this.contentDiv.html("")
    this.init()
  }
}

terminal.prototype.moveRight = function(ele, event) {
  if (ele[0].selectionStart >= ele.val().length) {
    console.log("move à droite")
    event.preventDefault()
    if (ele.next() !== undefined && ele.next().next() !== undefined) {
      ele.next().next().focus()
    }
  }
}

terminal.prototype.moveLeft = function(ele, event) {
  if (ele[0].selectionStart <= 0) {
    console.log("move à gauche")
    event.preventDefault()
    if (ele.prev() !== undefined && ele.prev().prev() !== undefined && !this.getSecondLastWord(3).hasClass("start")) {
      ele.prev().prev().focus()
    }
  }
}

terminal.prototype.putColor = function(ele, event) {
  parser = new colorParser(ele.val())
  parser.colorised(ele)
}

terminal.prototype.selectAll = function(ele, event) {
  terminal.allWordsSelected = !terminal.allWordsSelected
  $(".word:not(.start):not(.start + .space)").toggleClass("selected", terminal.allWordsSelected)
}

var wordKeyDownListener = function(ele, event) {

  terminal.putColor(ele, event)
  if (terminal.ctrlDown) {
    switch (event.keyCode) {
      case 65: //A
        terminal.selectAll(ele, event)
      default:
        console.log("ctrl downed")
        event.preventDefault()
    }
  } else {
    switch (event.keyCode) {
      case 17:
        terminal.ctrlDown = true
        break;
      case 39: //right >
        terminal.moveRight(ele, event)
        break;
      case 37: //left <
        terminal.moveLeft(ele, event)
        break;
      case 32: //space
        terminal.space(event)
        break;
      case 13: //enter
        terminal.enter(event)
        break;
      case 8: //back
        terminal.erase(event)
        break;
      default:
        ele.css({ width: `${ele.val().length + 1}ch` })
    }
  }

}

var wordKeyUpListener = function(ele, event) {

  terminal.putColor(ele, event)
  if (event.keyCode === 17) {
    terminal.ctrlDown = false
  }

}

var terminal = new terminal('terminal')
