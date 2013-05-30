function pp(object, depth, embedded) {
    typeof(depth) == "number" || (depth = 0)
    typeof(embedded) == "boolean" || (embedded = false)
    var newline = false
    var spacer = function(depth) { var spaces = ""; for (var i=0;i<depth;i++) { spaces += "  "}; return spaces }
    var pretty = ""
    if (      typeof(object) == "undefined" ) { pretty += "undefined" }
    else if ( typeof(object) == "boolean" ||
        typeof(object) == "number" ) {    pretty += object.toString() }
    else if ( typeof(object) == "string" ) {    pretty += "" + object + "" }
    else if (        object  == null) {         pretty += "null" }
    else if ( object instanceof(Array) ) {
        if ( object.length > 0 ) {
            if (embedded) { newline = true }
            var content = ""
            for (var i in object) {var item = object[i]; content += pp(item, depth+1) + ",\n" + spacer(depth+1) }
            content = content.replace(/,\n\s*$/, "").replace(/^\s*/,"")
            pretty += "[ " + content + "\n" + spacer(depth) + "]"
        } else { pretty += "[]" }
    }
    else if (typeof(object) == "object") {
        if ( Object.keys(object).length > 0 ){
            if (embedded) { newline = true }
            var content = ""
            for (var key in object) {
                content += spacer(depth + 1) + key.toString() + ": " + pp(object[key], depth+2, true) + ",\n"
            }
            content = content.replace(/,\n\s*$/, "").replace(/^\s*/,"")
            pretty += "{ " + content + "\n" + spacer(depth) + "}"
        } else { pretty += "{}"}
    }
    else { pretty += object.toString() }
    return ((newline ? "\n" + spacer(depth) : "") + pretty)
}