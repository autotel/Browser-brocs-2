var layer=[];
$(document).ready(function(){
  refreshlines=function(){
  	 layer[3].remove(redframe);
  	 	redframe=two.makeGroup();
  	 	redframe.addTo(layer[3]);
  	 	for (var b = 0; b < brocs.length; b++) {
  	 		brocs[b].refreshlines();
  	 	};
  };
	//pendiente: to solve the drawing order issue with lines,
	// make a subgroup within group three so we can delete that one, and keep this layer under.
	layer[2]=two.makeGroup();
	layer[1]=two.makeGroup();
	layer[0]=two.makeGroup();
	layer[3]=two.makeGroup();
	//layer that is redrawn every frame
	redframe=two.makeGroup();
	redframe.addTo(layer[3]);

	$("#canvas").on('dragstart', function (e) {
  e.preventDefault();  // cancel the native drag event chain
//  console.log("dragstart");
	}).on("mousemove", function(e){

			pointer.mouseMove();
	    pointer.pos.x=e.clientX-$(this).offset().left;
	   	pointer.pos.y=e.clientY-$(this).offset().top;
			refreshlines();
	}).on("mousedown",function(){
		//  for (var b = 0; b < brocs.length; b++) {
		//  	brocs[b].setselected(false);
		//  }
		for (var b = 0; b < brocs.length; b++) {
			brocs[b].exitclick();
			brocs[b].node.exitclick();
		};
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

  applyers=new Array(Object.keys(envs).length);
  for (var b = 0; b < applyers.length; b++) {
		applyers[b]=new Applyer(b,{x:40*b+20,y:720});
    applyers[b].sound=envs[Object.keys(envs)[b]];
	};


	var metro=new Metro(-1,200,function(){
		for (var b = 0; b < brocs.length; b++) {
			brocs[b].untrigger();
		};
		//on tick
		for (var b = 0; b < brocs.length; b++) {
			brocs[b].metro();
		};

	},function(){
		//en finish; never

	});
	function interact() {
		if (pkeys[38]) { //up key
		}
		if (pkeys[40]) { //down key
		}
		if (pkeys[39]) { //up key
		}
		if (pkeys[37]) { //down key
		}
		if (pkeys[46]) { //down key
			//pointer.selected.delete();
			//if(pointer.selected.ind)
			brocs[pointer.selected.ind].remove().sock(this,"del");
		}
	}
	var pkeys=[];
	window.onkeydown = function (e) {
	    var code = e.keyCode ? e.keyCode : e.which;
			console.log(code);
	    pkeys[code]=true;
			interact();
	}
	window.onkeyup = function (e) {
	  var code = e.keyCode ? e.keyCode : e.which;
	  pkeys[code]=false;
		interact();
	};
});
