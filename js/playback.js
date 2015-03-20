var editor;

var events;
var pop;
var offset = 1;
var vid;

function preload() {
  events = loadJSON('../assets/events_fulltext.json');
}

function setup() {

  // Basic ACE setup
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/github");
  editor.getSession().setMode("ace/mode/javascript");
  editor.$blockScrolling = Infinity;
  editor.setBehavioursEnabled(false);

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
   
  vid = document.getElementById("testvideo");
  // vid.onclick = function() {
  //   console.log('testclick');
  // }
  // vid.oncanplay = function() { 
  //   //var pop = Popcorn.smart("#video", 'https://vimeo.com/71597763');
    pop = Popcorn("#testvideo");

    function updateEditor(todo) {
      return function() {
        if (todo.action === 'run') {
          runIt();
        } else {
          editor.setValue(todo.contents);
          editor.clearSelection();
          editor.gotoLine(todo.cursor.row+1, todo.cursor.column+1, false);
        }
        // var action = todo.action;
        // if (action === 'insertText') {
        //   editor.moveCursorToPosition(todo.range.start);
        //   editor.insert(todo.text);
        // } else if (action === 'insertLines') {
        //   editor.moveCursorToPosition(todo.range.start);
        //   editor.insert('\ntesting');
        // } else if (action === 'removeText') {
        //   console.log(todo.range);
        //   editor.removeSelectionMarker(todo.range);
        // }
      }
      
    }
    
    for (var i = 0; i < events.length; i++) {
      pop.cue((events[i].time/1000-offset), updateEditor(events[i]));
    }

    // The run button
    var run = getElement('run');
    run.mousePressed(runIt);
    for (var i = 0; i < events.length; i++) {
      pop.cue(events[i].time/1000, updateEditor(events[i]));
    }
    pop.play();

      initSeriously();

  //}
}

function runIt() {
  // Using Jquery to update the src
  // From: https://github.com/processing/p5.js-website/blob/master/js/examples.js
  $('#sketchFrame').attr('src', $('#sketchFrame').attr('src'));
  var ev = {};
  ev.action = 'run';
  events.push(ev);
}
