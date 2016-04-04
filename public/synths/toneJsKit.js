

//create one of Tone's built-in synthesizers and connect it to the master output
var toneJsBass = new Tone.MonoSynth({
    "filter" : {
        "type" : "lowpass",
        "Q" : 2
    },
    "filterEnvelope" : {
        "attack" : 0.02,
        "decay" : 0.1,
        "sustain" : 0,
        "release" : 0.9,
    },
    "envelope" : {
        "attack" : 0.02,
        "decay" : 0.4,
        "sustain" : 0,
        "release" : 0.9,
    }
}).toMaster();
toneJsBass.play=function(a){
  toneJsBass.triggerAttackRelease(a, "8n");
}

// //play a middle c for the duration of an 8th note
// //play a note every quarter-note
// var seq=["C2","C3","D2","F2","F#2"]
// var tt=0;
// var loop = new Tone.Loop(function(time){
//   tt++;
//     synth.triggerAttackRelease(seq[tt%seq.length], "8n", time);
// }, "4n");
//
// //loop between the first and fourth measures of the Transport's timeline
// loop.start("1m");
// Tone.Transport.start();
