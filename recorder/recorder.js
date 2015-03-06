var editor;

var recording = false;

var events = [];
var eventsJSON;

function toggleRecording() {
  recording = !recording;
  var record = getElement('record');
  if (recording) {
    record.html('stop recording');
    editor.setTheme("ace/theme/cobalt");
  } else {
    record.html('start recording');    
    editor.setTheme("ace/theme/github");
    eventsJSON = JSON.stringify(events, null, 2);
    var output = getElement('recording');
    output.html(eventsJSON);
    save(events,'events.json');
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
  }


}

function editorSelection(e) {
  //console.log(e);
}

function editorCursor(e) {
  //console.log('cursor');
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
    var re = /createCanvas\((.*),(.*)\)/g;
    var arr = exampleCode.split(re);
    $('#sketchFrame').width(arr[1]+'px');
    $('#sketchFrame').height(arr[2]+'px');

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

  var load = getElement('load');
  load.mousePressed(function() {
      addExample('sine.js');
  });
}

// From: https://github.com/processing/p5.js-website/blob/master/js/examples.js
function addExample(file) {
  loadStrings('sine.js',done);
  function done(data) {
    var code = data.join('\n');
    editor.setValue(code);
  }
}

function runIt() {
  // Using Jquery to update the src
  // From: https://github.com/processing/p5.js-website/blob/master/js/examples.js
  $('#sketchFrame').attr('src', $('#sketchFrame').attr('src'));
  var ev = {};
  ev.action = 'run';
  events.push(ev);
}
