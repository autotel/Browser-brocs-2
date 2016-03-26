

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioCtx = new AudioContext();

basicSynth=new BasicSynth();
basicSynth.init();


// 
// $(".trigger").on("mousedown",function(e){
// 	basicSynth.playMultiEnvelope(envs[$(this).data("env")]);
// 	/*//console.log("d");
// 	var ttime=audioCtx.currentTime;
// 	sine.vca.gain.setValueAtTime(1, audioCtx.currentTime + 0.01);
// 	sine.vca.gain.linearRampToValueAtTime(0, audioCtx.currentTime+0.2);
// 	sine.oscillator.frequency.linearRampToValueAtTime(e.clientX, audioCtx.currentTime + 0.01);
// 	sine.oscillator.frequency.linearRampToValueAtTime(440, audioCtx.currentTime+0.2);
// 	//console.log("d");*/
// });
