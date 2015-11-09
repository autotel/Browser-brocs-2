$(document).ready(function(){
	$("#canvas").on("mousemove", function(e){
	    pointer.pos.x=e.clientX-$(this).offset().left;
	   	pointer.pos.y=e.clientY-$(this).offset().top;
	   	if(pointer.dragging)
	   		pointer.dragging.move(pointer.pos.x,pointer.pos.y);
	});
	brocs=new Array(32);

	for (var i = brocs.length; i > 0; i--) {
		brocs[i]=new Broc();
//Broc.prototype=new Draggable(0,0,brocs[i]);in practice works but is conceptually wrong
	};


});
