function setup() {
  // put setup code here
  var test = {x: 'test'};
  var json = JSON.stringify(test,null,2);
  save(test,'test.json');
}

function draw() {
  // put drawing code here
}