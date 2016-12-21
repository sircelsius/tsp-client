var grpc = require('grpc');

var tsp = grpc.load(__dirname + '/proto/tsp_service.proto').com.celsius.tsp.proto;

var client = new tsp.TravellingSalesmanProblemService('localhost:8980', grpc.credentials.createInsecure());

var size = Math.floor((Math.random() * 100) + 1);
var vertices = [];
var edges = [];
var weight;
var vertex;
var edge;

for( var i = 1; i < size; i++) {
    vertices.push(new tsp.Vertex(i));
}

for( var i = 1; i < size; i++) {
    for( var j = 1; j < i; j++) {
        weight = Math.floor((Math.random() * 50) + 1);
        edges.push(new tsp.Edge(i,j, weight));
        edges.push(new tsp.Edge(j,i, weight));
    }
}

var start = Math.floor((Math.random() * (size - 1)) + 1);
var end = Math.floor((Math.random() * (size - 1)) + 1);
if(end === start) {
    if(end < size - 1 ) {
        end = size - 1;
    }
}

var problem = new tsp.TravellingSalesmanProblem( 
    vertices,
    edges,
    start,
    end,
    false);

console.log('\nProblem is:\n' + JSON.stringify(problem));

var call = client.solve(problem, function(error, solution) {
    error && console.error('\nServer threw exception:\n' + JSON.stringify(error));
    solution && console.log('\nSolution is:\n' + JSON.stringify(solution));
});
