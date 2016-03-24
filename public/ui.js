function Ui(){
  this.edit=function(who){
    // console.log(who);
    $("#params").html('<div class="floating broc-editor">'
    +'<div class="title">'+who.name+'</div>'
    +'<p>Change my sound to</p>'
    +'<div class="button envelopeSelector" data-value="testenv" data-target="'+who.name+'">Kicky</div>'
    +'<div class="button envelopeSelector" data-value="testfnv" data-target="'+who.name+'">Snarey</div>'
    +'<div class="button envelopeSelector" data-value="minihh" data-target="'+who.name+'">Hihatish</div>'
    +'<div class="button envelopeSelector" data-value="minihho" data-target="'+who.name+'">Hihatish Long</div>'
    +'</div>');
    $("#params .envelopeSelector").on("click",function(){
      $(".envelopeSelector").removeClass("selected");
      $(this).addClass("selected");
      who.sound=envs[$(this).attr("data-value")];
      playMultiEnvelope(envs[$(this).data("value")]);
    })
  }
}
ui=new Ui()
