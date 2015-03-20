function initSeriously() {
  console.log("Seriously is a go!");

  var seriously,
  chroma, target;

  seriously = new Seriously();

  target = seriously.target('#videoCanvas');
  chroma = seriously.effect('chroma');

  // if (Modernizr.video.webm && Modernizr.video.h264) {
  //   //console.log("Chrome");
  //   chroma.weight = .9;
  //   chroma.balance = 1;
  //   chroma.clipWhite = 1;
  //   chroma.clipBlack = 0;
  //   chroma.screen = [.2,1,.1,1];
  // } else if (!Modernizr.video.webm && Modernizr.video.h264) {
  //   //console.log("Safari");
  //   chroma.weight = 1.25;
  //   chroma.balance = 1;
  //   chroma.clipWhite = 1;
  //   chroma.clipBlack = 0;        
  //   chroma.screen = [.3,.9,.15,1];
  // } else if (Modernizr.video.webm && !Modernizr.video.h264) {
  //   //console.log("Firefox");
  //   chroma.weight = 1.05;
  //   chroma.balance = 1;
  //   chroma.clipWhite = 1;
  //   chroma.clipBlack = 0;        
  //   chroma.screen = [.14,.95,0,1];
  // }

  chroma.source = "#testvideo";
  target.source = chroma;
  chroma.screen = [0,1,0,1];
  seriously.go();
}