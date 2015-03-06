var editor;
var run;
var dims = [];

function setup() {
  // Basic ACE setup
  editor = ace.edit("editor");
  //editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");
  
  // Injecting JavaScript into iFrame with Jquery
  // This is from p5.js web site
  // https://github.com/processing/p5.js-website/blob/master/js/examples.js
  $('#sketchFrame').load(function() {
    var exampleCode = editor.getSession().getValue();
    if (exampleCode.indexOf('new p5()') === -1) {
      exampleCode += '\nnew p5();';
    }
    if (dims.length < 2) {
      var re = /createCanvas\((.*),(.*)\)/g;
      var arr = exampleCode.split(re);
     $('#sketchFrame').height(arr[2]+'px');
   } else {
     $('#sketchFrame').height(examples.dims[1]+'px');
   }

    var userScript = $('#sketchFrame')[0].contentWindow.document.createElement('script');
    userScript.type = 'text/javascript';
    userScript.text = exampleCode;
    userScript.async = false;
    $('#sketchFrame')[0].contentWindow.document.body.appendChild(userScript);
  });

  noCanvas();
  runIt();
  run = getElement('run');
  run.mousePressed(runIt);
}

function runIt() {
  // Using Jquery to update the src
  // From: https://github.com/processing/p5.js-website/blob/master/js/examples.js
  $('#sketchFrame').attr('src', $('#sketchFrame').attr('src'));
}
