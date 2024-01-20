
const privateFonctions = ["execute", "_getProto", "_sendResponse", "_getParameter", "_getParameters"]

function command(args) {

  this.responseDiv = $('#responseDiv')
  this.cmd = args[0]
  args.splice(0, 1)
  this.rawArgs = args.slice()
  this.args = args.slice()
  this.parameters = {
    length: 0
  }
  for (let i = 0; i<this.args.length; i++) {
    if (this.args[i].includes("--") && i+1 < this.args.length) {
      this.parameters[this.args[i].substr(2)] = this.args[i+1]
      this.parameters.length += 1
      this.args.splice(i, 1)
    }
  }

}

command.prototype.execute = function() {
  if (privateFonctions.includes(this.cmd)) {
    this._sendResponse(`mince, tu ne peux pas appeler la commande privée ${this.cmd}`)
  } else if (this.cmd in this._getProto()) {
    this[this.cmd]()
  } else {
    this._sendResponse(`oups, connais pas la commande ${this.cmd}`)
  }
}

/*
* Fonctions internes aux commandes
*/

command.prototype["_getProto"] = function() {
  return Object.getPrototypeOf(this)
}

command.prototype["_sendResponse"] = function(res, className) {
  this.responseDiv.html(`<p class="response ${className || ""}"> > ${res} </p>`)
}

command.prototype["_getParameters"] = function() {
  let keys = Object.keys(this.parameters)
  let lengthIndex = keys.findIndex(k => k === "length")
  keys.splice(lengthIndex, 1)
  return keys
}

command.prototype["_getParameter"] = function(n) {
  if (n < this._getParameters().length) {
    return this._getParameters()[n]
  } else {
    return []
  }
}

/*
* Fonctions externes
*/
command.prototype["print"] = function() {
  this._sendResponse(this.args.join(' '))
}

command.prototype["add-rules"] = function() {
  this._sendResponse("add-rules call")
}

command.prototype["close"] = function() {
  console.log("add-rules call")
}

command.prototype["add-color"] = function() {
  console.log("add-rules call")
}

command.prototype["set-color"] = function() {
  console.log("add-rules call")
}

command.prototype["remove-color"] = function() {
  command.prototype["remove-color"].prototype["help"] = "remove-color syntax: </br> remove-color --key value"
  if (this.rawArgs.length >= 2) {
    if (this.parameters.length >= 1) {
      let key = this._getParameter(0)
      removeColorFromTerminal(key, this.parameters[key])
    } else if (this.args.length >= 2) {
      removeColorFromTerminal(this.args[0], this.args[1])
    }
    this._sendResponse(`La couleur où le champ ${this.rawArgs[1]} était présente, a bien été supprimé`, "success")
  } else {
    this._sendResponse(command.prototype["remove-color"].prototype["help"], "error")
  }
}

command.prototype["importe"] = function() {
  console.log("add-rules call")
}

command.prototype["add-aliases"] = function() {
  console.log("add-rules call")
}

command.prototype["debug-mode"] = function() {
  console.log("add-rules call")
}
