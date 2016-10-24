var grpc = require('grpc');

var tsp = grpc.load(__dirname + '/proto/tsp_service.proto').com.celsius.tsp.proto;

var client = new tsp.TravellingSalesmanProblemService('localhost:8980', grpc.credentials.createInsecure());

var vertex = new tsp.Vertex(1);
var vertex2 = new tsp.Vertex(2);
var vertex3 = new tsp.Vertex(3);
var vertex4 = new tsp.Vertex(4);
var vertex5 = new tsp.Vertex(5);
var vertex6 = new tsp.Vertex(6);

var edge12 = new tsp.Edge(1,2,2);
var edge16 = new tsp.Edge(1,6,1);
var edge21 = new tsp.Edge(2,1,2);
var edge23 = new tsp.Edge(2,3,2);
var edge25 = new tsp.Edge(2,5,1);
var edge32 = new tsp.Edge(3,2,2);
var edge34 = new tsp.Edge(3,4,1);
var edge43 = new tsp.Edge(4,3,1);
var edge45 = new tsp.Edge(4,5,2);
var edge56 = new tsp.Edge(5,6,2);
var edge54 = new tsp.Edge(5,4,2);
var edge52 = new tsp.Edge(5,2,1);
var edge65 = new tsp.Edge(6,5,2);
var edge61 = new tsp.Edge(6,1,1);


var problem = new tsp.TravellingSalesmanProblem( 
    [vertex, vertex2, vertex3, vertex4, vertex5, vertex6],
    [
        edge12,
        edge16,
        edge21,
        edge23,
        edge25,
        edge32,
        edge34,
        edge43,
        edge45,
        edge56,
        edge54,
        edge52,
        edge65,
        edge61
    ],
    0, 11111, false);

console.log('\nProblem is:\n' + JSON.stringify(problem));

var call = client.solve(problem, function(error, solution) {
    console.error('\nServer threw exception:\n' + JSON.stringify(error));
    console.log('\nSolution is:\n' + JSON.stringify(solution));
});
