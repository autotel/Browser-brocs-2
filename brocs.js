

var layer=[];
$(document).ready(function(){

	//layer three is redrawn every frame
	layer[3]=two.makeGroup();
	//pendiente: to solve the drawing order issue with lines,
	// make a subgroup within group three so we can delete that one, and keep this layer under.
	layer[2]=two.makeGroup();
	layer[1]=two.makeGroup();
	layer[0]=two.makeGroup();

	$("#canvas").on("mousemove", function(e){
	    pointer.pos.x=e.clientX-$(this).offset().left;
	   	pointer.pos.y=e.clientY-$(this).offset().top;
	   	if(pointer.dragging){
				two.remove(layer[3]);
				layer[3]=two.makeGroup();
				for (var b = 0; b < brocs.length; b++) {
					brocs[b].refreshlines();
				};
				//console.log(pointer.pos.x)
	   		pointer.dragging.move({x:pointer.pos.x,y:pointer.pos.y});
				for (var b = 0; b < brocs.length; b++) {
					//brocs[b].checkNodes();
				}
			}
	}).on("mousedown",function(){
		return false;
	}).on("mouseup",function(){
		/*this.main.dragging=false;
		this.main.release();*/
		//console.log("ff");
		pointer.mouseUp(this);
	});
	brocs=new Array(8);

	for (var b = 0; b < brocs.length; b++) {
		brocs[b]=new Broc(b);
//Broc.prototype=new Draggable(0,0,brocs[i]);in practice works but is conceptually wrong
	};


});
