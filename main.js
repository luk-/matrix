module.exports = function (matrix, options) {
  return new Graph(matrix, options)
}

var Graph = function (matrix, options) {
  this.matrix = label_nodes(matrix)
}

Graph.prototype.coords = {}


function label_nodes (input) {

  // start with a label higher than the input array marks
  var label = 2
  var sets = []

  // make a quick deep copy of the input matrix array
  var matrix = []
  for (var i = 0; i < input.length; i++) {
    matrix[i] = input[i].slice()
  }
  
  // considering the first array as a row
  for (var i = 0; i < matrix.length; i++) {
  
    for (var j = 0; j < matrix[0].length; j++) {
  
      if (matrix[i][j] === 1) {
        matrix[i][j] = label
        label++
      }
  
      var neighbors = {}

      // north check
      if (i !== 0 && matrix[i][j] >= 1) {
        if (matrix[i - 1][j] > 1) {
          var l = Math.min(matrix[i - 1][j], matrix[i][j])
          add_set(matrix[i][j], l, sets)
          add_set(matrix[i - 1][j], l, sets)
          matrix[i][j] = l
          matrix[i - 1][j] = l
          neighbors.n = l
        }
      }
      
      // west check
      if (j !== 0 && matrix[i][j] >= 1) {
        if (matrix[i][j - 1] > 1) {
          if (neighbors.n) {
            var l = Math.min(matrix[i][j - 1], matrix[i][j], neighbors.n)
            matrix[i - 1][j] = l
          } else {
            var l = Math.min(matrix[i][j - 1], matrix[i][j])
          }
          add_set(matrix[i][j - 1], l, sets)
          add_set(matrix[i][j], l, sets)
          matrix[i][j] = l
          matrix[i][j - 1] = l
        }
      }

  
    }
  }

  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[0].length; j++) {
      if (sets[matrix[i][j]]) {
        var region = Math.min.apply(Math, sets[matrix[i][j]])
        matrix[i][j] = Math.min.apply(Math, sets[region])
      }
      add_coord(matrix[i][j], [i, j])
    }
  }
  return matrix
}

function add_coord (label, coord) {
  // checking if the label already exists in the coordinates obj
  if (!Graph.prototype.coords[label]) {
    Graph.prototype.coords[label] = [coord]
  } else {
    Graph.prototype.coords[label].push(coord)
  } 
}

function add_set(parent, child, set) {
  // overwriting areas with relationships not previously set
  if (!Array.isArray(set[parent])) {
    set[parent] = []
    set[parent].push(child)
  }
  else {
    set[parent].push(child)
  }
}
