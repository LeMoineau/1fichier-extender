
/*
* Colors table functions
*/

// priority: undefined ==> priority: 1
var colors = []
const check_init_colors = [
  {
    title: "local-cmd",
    priority: 0,
    text: Object.keys((new command(["test"]))._getProto()),
    color: "#3498db"
  },
  {
    title: "private-cmd",
    priority: 0.5,
    text: privateFonctions,
    color: "#e74c3c"
  },
  {
    title: "parameters",
    priority: 0.5,
    text: ["--"],
    IfContains: true,
    color: "#9b59b6"
  }
]

chrome.storage.local.get("colors", function(items) {
  if (items.colors !== undefined) {
    colors = items.colors
  }

  for (let c of check_init_colors) {
    addNewColorToTerminal(c)
    for (let cmd of c.text) {
      addTextWhere("title", c.title, cmd)
    }
  }
})

function addNewColorToTerminal(obj) {
  let target = colors.find(i => i.title === obj.title)
  if (obj.title === undefined || target === undefined) { //ajout de nouvelles couleurs
    if (obj.text !== undefined && Array.isArray(obj.text) && obj.color !== undefined) {
      colors.push(obj)
      chrome.storage.local.set({
        colors: colors
      })
    }
  } else if (obj.title !== undefined && target !== undefined) { //update de prec
    for (let k in obj) {
      target[k] = obj[k]
    }
  }
}

function addTextWhere(key_where, value_where, text) {
  let item = colors.find(i => i[key_where] === value_where)
  if (item !== undefined && !item.text.includes(text)) {
    item.text.push(text)
    chrome.storage.local.set({
      colors: colors
    })
  }
}

function removeColorFromTerminal(key_where, value_where) {
  let itemIndex = colors.findIndex(i => i[key_where] === value_where)
  if (itemIndex !== -1) {
    colors.splice(itemIndex, 1)
    chrome.storage.local.set({
      colors: colors
    })
  }
}

/*
* COLOR-PARSER class
*/
function colorParser(value) {
  this.text = value
  this.color = "#ffffff"
  this.parse()
}

colorParser.prototype.getMaxPriority = function(items) {
  let max_priority = 0
  for (let i of items) {
    if (i.priority === undefined) {
      i.priority = 1
    }
    if (i.priority > max_priority) {
      max_priority = i.priority
    }
  }
  return max_priority
}

colorParser.prototype.parse = function() {
  let items = colors.filter(i => (i.text.find(t => this.text === t)) || (i.text.find(t => this.text.includes(t)) && i.IfContains === true))
  if (items.length > 0) {
    this.max_priority = this.getMaxPriority(items)
    this.item = items.find(i => i.priority === this.max_priority)
    this.color = this.item.color
  }
}

colorParser.prototype.colorised = function(ele) {
  ele.css({ color: this.color })
}
