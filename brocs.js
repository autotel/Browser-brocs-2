
$(document).ready(function(){
	$("#canvas").on("mousemove", function(e){
	    pointer.pos.x=e.clientX-$(this).offset().left;
	   	pointer.pos.y=e.clientY-$(this).offset().top;
	   	if(pointer.dragging){
	   		pointer.dragging.move(pointer.pos.x,pointer.pos.y);
				for (var b = 0; b < brocs.length; b++) {
					brocs[b].checkConnectors();
				}
			}

	});
	brocs=new Array(4);

	for (var b = 0; b < brocs.length; b++) {
		brocs[b]=new Broc(b);
//Broc.prototype=new Draggable(0,0,brocs[i]);in practice works but is conceptually wrong
	};


});
