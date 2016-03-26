function Ui(){
  this.edit=function(who){
    $("#params").html('');

    // console.log(who);
    $("#params").append('<div class="floating broc-editor">'
    +'<div class="title">'+who.name+'</div>'
    +'<p>BasicSynth</p>'
    +'<div class="button basicSynth envelopeSelector" data-value="minikick" data-target="'+who.name+'">Mini kick</div>'
    +'<div class="button basicSynth envelopeSelector" data-value="minisnare" data-target="'+who.name+'">Mini snare</div>'
    +'<div class="button basicSynth envelopeSelector" data-value="minihh" data-target="'+who.name+'">Mini hihat open</div>'
    +'<div class="button basicSynth envelopeSelector" data-value="minihho" data-target="'+who.name+'">Mini hihat close</div>'
    +'</div>');
    $("#params .basicSynth.envelopeSelector").on("click",function(){
      $(".envelopeSelector").removeClass("selected");
      $(this).addClass("selected");
      name=$(this).attr("data-value");
      who.envName=name;
      who.soundTrigger=function(){
        basicSynth.playMultiEnvelope(basicSynth.envs[this.envName])
      };
      basicSynth.playMultiEnvelope(basicSynth.envs[name]);
      onSelection();
    })
////////////////////Append the toneJsKit ones
    $("#params").append('<div class="floating broc-editor">'
    +'<p>BasicSynth</p>'
    +'<div class="button toneJsKit envelopeSelector" data-value="C2" data-target="'+who.name+'">C3</div>'
    +'<div class="button toneJsKit envelopeSelector" data-value="D2" data-target="'+who.name+'">D3</div>'
    +'<div class="button toneJsKit envelopeSelector" data-value="E2" data-target="'+who.name+'">E3</div>'
    +'<div class="button toneJsKit envelopeSelector" data-value="F2" data-target="'+who.name+'">F3</div>'
    +'</div>');
    $("#params .toneJsKit.envelopeSelector").on("click",function(){
      console.log("lerp");
      $(".envelopeSelector").removeClass("selected");
      $(this).addClass("selected");
      name=$(this).attr("data-value");
      who.envName=name;
      who.soundTrigger=function(){
        toneJsBass.play(this.envName);
      };
      toneJsBass.play(name);
      onSelection();
    });
    $("#params").append('<pre id="playingFunction" style="width:300px" contentEditable="true"></pre>');
    function onSelection(){
      $("pre#playingFunction").text(who.soundTrigger.toString());
      $("pre#playingFunction");
    }
  }
}
ui=new Ui()
