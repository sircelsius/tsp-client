var grpc = require('grpc');

var tsp = grpc.load(__dirname + '/proto/tsp_service.proto').com.celsius.tsp.proto;

var client = new tsp.TravellingSalesmanProblemService('localhost:8980', grpc.credentials.createInsecure());

var edge = new tsp.Edge(1,2,3);
var edge2 = new tsp.Edge(2,3,2);
var edge3 = new tsp.Edge(2,4,1);
var edge4 = new tsp.Edge(3,4,3);
var edge5 = new tsp.Edge(4,3,2);

var vertex = new tsp.Vertex(1);
var vertex2 = new tsp.Vertex(2);
var vertex3 = new tsp.Vertex(3);
var vertex4 = new tsp.Vertex(4);

var problem = new tsp.TravellingSalesmanProblem( 
    [vertex, vertex2, vertex3, vertex4],
    [edge, edge3, edge2,edge4, edge5],
    1, 1 , false);

console.log(JSON.stringify(problem));

var call = client.solve(problem, function(error, solution) {
    console.error(error);
    console.log(solution);
});
