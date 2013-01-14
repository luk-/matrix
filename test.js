var assert = require('assert')
var Graph = require('./main')

var matrix = [ 
  [ 0, 1, 1, 0, 1 ],
  [ 0, 1, 0, 0, 1 ],
  [ 1, 0, 0, 0, 1 ],
  [ 0, 0, 0, 1, 0 ],
  [ 0, 0, 1, 0, 0 ] ]

var matrix_out = [ 
  [ 0, 2, 2, 0, 4 ],
  [ 0, 2, 0, 0, 4 ],
  [ 7, 0, 0, 0, 4 ],
  [ 0, 0, 0, 9, 0 ],
  [ 0, 0, 10, 0, 0 ] ]

var coords = 
  { '0': 
     [ [ 0, 0 ],
       [ 0, 3 ],
       [ 1, 0 ],
       [ 1, 2 ],
       [ 1, 3 ],
       [ 2, 1 ],
       [ 2, 2 ],
       [ 2, 3 ],
       [ 3, 0 ],
       [ 3, 1 ],
       [ 3, 2 ],
       [ 3, 4 ],
       [ 4, 0 ],
       [ 4, 1 ],
       [ 4, 3 ],
       [ 4, 4 ] ],
    '2': [ [ 0, 1 ], [ 0, 2 ], [ 1, 1 ] ],
    '4': [ [ 0, 4 ], [ 1, 4 ], [ 2, 4 ] ],
    '7': [ [ 2, 0 ] ],
    '9': [ [ 3, 3 ] ],
    '10': [ [ 4, 2 ] ] }


var output = new Graph(matrix)

assert.deepEqual(output.matrix, matrix_out, 'matrix does not match')
assert.deepEqual(output.coords, coords, 'coordinates do not match')
