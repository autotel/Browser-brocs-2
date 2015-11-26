

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioCtx = new AudioContext();
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();
oscillator.start();
gainNode.gain.value=0;
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);


playEnvelope=function(envelope, who){
	/*//console.log("playing");
	//console.log(who);
	//console.log(envelope);*/
	var now=audioCtx.currentTime;
	who.cancelScheduledValues(now);
	for(var keyframe in envelope){
		//console.log("("+envelope[keyframe]+",now+"+parseFloat(keyframe)+")");
		who.linearRampToValueAtTime(parseFloat(envelope[keyframe]),now+parseFloat(keyframe));
	};
};
//this plays an array of envelopes. These ,ust have a to:audioParam attr and a envs attribute, containing the envelopest to each audioparam
playMultiEnvelope=function(envelopes){
	for(b=0;b<envelopes.length;b++){//for each controller part
		//for(a=1;a<envelopes[b].length;a++){//for each envelope (0 index is for target)
			playEnvelope(envelopes[b].envs,envelopes[b].to);
		//}
	}
};


var envs={
	testenv:[{to:gainNode.gain,envs:{'0':1,'0.32':0}},
			 {to:oscillator.frequency,envs:{'0':440,'0.32':200}}],
	testfnv:[{to:gainNode.gain,envs:{'0':1,'0.52':0}},
			 {to:oscillator.frequency,envs:{'0':330,'0.32':90}}],
	testgnv:[{to:gainNode.gain,envs:{'0':1,'0.12':0}},
			 {to:oscillator.frequency,envs:{'0':90,'0.32':880}}],
	testhnv:[{to:gainNode.gain,envs:{'0':1,'0.32':0}},
			 {to:oscillator.frequency,envs:{'0':90,'0.32':200}}],
	testinv:[{to:gainNode.gain,envs:{'0':1,'0.52':0}},
			 {to:oscillator.frequency,envs:{'0':440,'0.12':880}}],
	testjnv:[{to:gainNode.gain,envs:{'0':1,'0.52':0}},
			 {to:oscillator.frequency,envs:{'0':440,'0.12':800}}]
};


$(".trigger").on("mousedown",function(e){
	playMultiEnvelope(envs[$(this).data("env")]);
	/*//console.log("d");
	var ttime=audioCtx.currentTime;
	gainNode.gain.setValueAtTime(1, audioCtx.currentTime + 0.01);
	gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime+0.2);
	oscillator.frequency.linearRampToValueAtTime(e.clientX, audioCtx.currentTime + 0.01);
	oscillator.frequency.linearRampToValueAtTime(440, audioCtx.currentTime+0.2);
	//console.log("d");*/
});
