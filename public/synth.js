

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioCtx = new AudioContext();
//maybe each broc should have one voice on its own
var Sine=function(){
	this.oscillator = audioCtx.createOscillator();
	this.vca = audioCtx.createGain();
	this.oscillator.start();
	this.vca.gain.value=0;
	this.oscillator.connect(this.vca);
	this.vca.connect(audioCtx.destination);
}
var sine=new Sine();
var Noise=function(){
	//create sound modules
	this.vca=audioCtx.createGain();
	this.noise=new NoiseGen(audioCtx,"white") ,
	this.filter=audioCtx.createBiquadFilter(),
	//connect sound modules
	this.filter.type = "bandpass";
	this.vca.gain.value=0;
	this.noise.connect(this.filter);
	this.filter.connect(this.vca);
	this.vca.connect(audioCtx.destination);
	this.noise.start();
}
var noise=new Noise();
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
	testenv:[{to:sine.vca.gain,envs:{'0':0.3,'0.32':0}},
				{to:sine.oscillator.frequency,envs:{'0':440,'0.32':200}},
			 	{to:noise.filter.frequency,envs:{'0':800,'0.32':200}},
				{to:noise.vca.gain,envs:{'0':1,'0.32':0}}],
	testfnv:[{to:sine.vca.gain,envs:{'0':1,'0.52':0}},
				{to:sine.oscillator.frequency,envs:{'0':330,'0.32':90}},
				{to:noise.filter.frequency,envs:{'0':800,'0.32':200}},
				{to:noise.vca.gain,envs:{'0':1,'0.32':0}}]
};


$(".trigger").on("mousedown",function(e){
	playMultiEnvelope(envs[$(this).data("env")]);
	/*//console.log("d");
	var ttime=audioCtx.currentTime;
	sine.vca.gain.setValueAtTime(1, audioCtx.currentTime + 0.01);
	sine.vca.gain.linearRampToValueAtTime(0, audioCtx.currentTime+0.2);
	sine.oscillator.frequency.linearRampToValueAtTime(e.clientX, audioCtx.currentTime + 0.01);
	sine.oscillator.frequency.linearRampToValueAtTime(440, audioCtx.currentTime+0.2);
	//console.log("d");*/
});
