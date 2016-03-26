
BasicSynth=function(){
	var Sine;
	var Noise;
	var envs;
}
BasicSynth.prototype.init=function(){
	console.log("init BasicSynth");
	//maybe each broc should have one voice on its own
	this.Sine=function(){
		this.oscillator = audioCtx.createOscillator();
		this.vca = audioCtx.createGain();
		this.oscillator.start();
		this.vca.gain.value=0;
		this.oscillator.connect(this.vca);
		this.vca.connect(audioCtx.destination);
	}
	this.sine=new this.Sine();
	this.Noise=function(){
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
	this.noise=new this.Noise();
	this.envs={
		minikick:[
			{
				to:this.sine.vca.gain,
				envs:{'0':0.3,'0.32':0}
			},{
				to:this.sine.oscillator.frequency,
				envs:{'0':440,'0.32':200}
			}
		],
		minisnare:[{to:this.sine.vca.gain,envs:{'0':1,'0.52':0}},
		{to:this.sine.oscillator.frequency,envs:{'0':330,'0.32':90}},
		{to:this.noise.filter.frequency,envs:{'0':800,'0.32':200}},
		{to:this.noise.vca.gain,envs:{'0':1,'0.32':0}}],
		minihh:[
		{to:this.noise.filter.frequency,envs:{'0':400,'0.32':200}},
		{to:this.noise.vca.gain,envs:{'0':2,'0.05':0}}],
		minihho:[
		{to:this.noise.filter.frequency,envs:{'0':400,'0.32':200}},
		{to:this.noise.vca.gain,envs:{'0':1,'0.2':0}}]
	};
}
//this plays an array of envelopes. These ,ust have a to:audioParam attr and a envs attribute, containing the envelopest to each audioparam
BasicSynth.prototype.playMultiEnvelope=function(envelopes){
	for(b=0;b<envelopes.length;b++){//for each controller part
		//for(a=1;a<envelopes[b].length;a++){//for each envelope (0 index is for target)
			this.playEnvelope(envelopes[b].envs,envelopes[b].to);
		//}
	}
};
BasicSynth.prototype.playEnvelope=function(envelope, who){
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
