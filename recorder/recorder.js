var editor;

var recording = false;

var events = [];
var json;

function toggleRecording() {
  recording = !recording;
  var record = getElement('record');
  if (recording) {
    record.html('stop recording');
    editor.setTheme("ace/theme/cobalt");
  } else {
    record.html('start recording');    
    editor.setTheme("ace/theme/github");

  }

}

function editorChange(e) {
  if (recording) {
    var ev = {};
    ev.time = millis();
    ev.action = e.data.action;
    ev.range = e.data.range;
    ev.text = e.data.text;
    events.push(ev);
  
    json = JSON.stringify(events, null, 2);
    var output = getElement('recording');
    output.html(json);
  }


}

function editorSelection(e) {
  //console.log(e);
}

function editorCursor(e) {
  //console.log(e);
}



function setup() {

  // Basic ACE setup
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/github");
  editor.getSession().setMode("ace/mode/javascript");
  
  editor.getSession().on('change', editorChange);
  editor.getSession().selection.on('changeSelection', editorSelection);
  editor.getSession().selection.on('changeCursor', editorCursor);

  
  // Injecting JavaScript into iFrame with Jquery
  // This is from p5.js web site
  // https://github.com/processing/p5.js-website/blob/master/js/examples.js
  $('#sketchFrame').load(function() {
    var dims = [];
    var exampleCode = editor.getSession().getValue();
    if (exampleCode.indexOf('new p5()') === -1) {
      exampleCode += '\nnew p5();';
    }
    if (dims.length < 2) {
      var re = /createCanvas\((.*),(.*)\)/g;
      var arr = exampleCode.split(re);
      $('#sketchFrame').height(arr[2]+'px');
    } else {
      $('#sketchFrame').height(dims[1]+'px');
    }

    var userScript = $('#sketchFrame')[0].contentWindow.document.createElement('script');
    userScript.type = 'text/javascript';
    userScript.text = exampleCode;
    userScript.async = false;
    $('#sketchFrame')[0].contentWindow.document.body.appendChild(userScript);
  });

  noCanvas();

  // Run what is in there
  runIt();

  // The run button
  var run = getElement('run');
  run.mousePressed(runIt);

  // The record button
  var record = getElement('record');
  record.mousePressed(toggleRecording);
}

function runIt() {
  // Using Jquery to update the src
  // From: https://github.com/processing/p5.js-website/blob/master/js/examples.js
  $('#sketchFrame').attr('src', $('#sketchFrame').attr('src'));
}
