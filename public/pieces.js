/*building pieces for brocs online*/
	kinds={normal:""};
//node is the cicle underneath the broc piece that is dragged to chain brocs
function Node(ind){
	//only to identify it in the console
	this.name="node";
	//numeric index, for debugging purposes
	this.ind=ind;
	//the broc object that this node belongs to
	this.broc;
	//the visible representation in two
	this.sprite=two.makeCircle(0,0,brocSize*1.2);
	//being in a layer allows it to be always under the brocs
	this.sprite.addTo(layer[2]);
	//the jquery element of this node's sprite
	this.$elem=$(domElem(this.sprite));
	//main allows reference within jquery functions and others
	main=this;
	//Functions that are triggered by the draggable class
	this.onMouseUp=function(who){
		//who is the subject over which mouse was released
		//if is a broc, connect to it. If is empty area, create one and ocnnect to it
		if(who instanceof (Broc) ){
			this.broc.sons.push(who);
			sock(this.broc,"sons",who.name);
		}else{
			nb=addBroc();
			this.broc.sons.push(nb);
			nb.move({x:pointer.pos.x,y:pointer.pos.y});
			console.log(nb.name);
		}
		this.move(this.broc.pos);
	}
	/*
	this.onMove=function(){
		if(this.alive){
			sock(this,"pos",this.pos);
		}
	}*/
	this.visible=function(val){
		if(val){
			console.log(val);
			this.sprite.fill="rgba(127,255,255,0.7)";
			this.sprite.stroke="black";
		}else{
			console.log(val);
			//this.sprite.fill="transparent";
			this.sprite.stroke="transparent";
			//pendant: make the abspos function once an unpack
			this.active=false;
		}
	}
	this.ishover=function(){
		this.paint();
		return(((1<<0)&this.selectflag) !=  0)|(((1<<0)&this.broc.selectflag) !=  0);
	}
};
function Broc(ind){
	this.name="broc:"+ind;
	this.sons=[];
	this.node;
	par=this;
	this.node=new Node(a);
	this.node.init();
	this.node.broc=this;
	this.ind=ind;
	this.sprite=new Two.Path(ngon(0,0,6,brocSize),true,false);
	// this.sprite=two.makeCircle(0,0,brocSize);
	this.sprite.addTo(layer[1]);
	this.rad=brocSize;
	two.add(this.sprite);
	this.kind=kinds.normal;
	this.pos={
		x:Math.random()*100,
		y:Math.random()*200
	}
	this.init();//drawingorder
	//this.sprites.push(this.node);
	//this.sprite=two.makeGroup(this.sprites);
	main=this;
	this.onMove=function(){
		//console.log(main.pos);
		//main.pos
		if(this.alive){
			this.node.move({x:pointer.pos.x,y:pointer.pos.y});
			sock(this,"pos",this.pos);
		}
	};
	this.onRemove=function(){
		if(this.alive){
		this.node.remove();
		$(this.node.$elem.selector).fadeOut();//pendiente: nodes aren't deleting
		}
	}
	this.onMouseDown=function(){
		if(this.isselected()){
			this.trigger();
		}else{
			this.setselected(true)
			this.node.setselected(true);
			ui.edit(this);
		}
	}
	this.removeSon=function(s){
		console.log("pendiente")
	};
	this.refreshlines=function(){
		if(this.alive){
			for(s=0;s<this.sons.length;s++){
				//the line should be a class on it's own.
				if(this.sons[s].alive){
					startx=this.pos.x;
					starty=this.pos.y;
					endx=this.sons[s].pos.x;
					endy=this.sons[s].pos.y;
					//the two circles can either be deleted and recreated, or moved.
					if(this.sons[s].handle){
						this.sons[s].handle.translation.x=(startx+endx)/2;
						this.sons[s].handle.translation.y=(starty+endy)/2;
					}else{
						this.sons[s].handle=two.makeCircle((startx+endx)/2,(starty+endy)/2,10);
					}
					//I can't see how to move two lines. I jsut delete them and re-create them. Would be nice to move
					two.remove(this.sons.line);
					this.sons.line=new Two.Line(startx,starty,endx,endy).addTo(redframe);
				}else{
					this.removeSon(s);
				}
			}
		}
	};
	this.node.move(this.pos);
	this.setapunto=function(val,f){
		if(this.alive){
			this.selectflag &= ~(1<<4);//clear
			this.selectflag |= (val<<4);
			this.paint();
			this.triggerNow=false;
			if(f)
				this.nextStepFunction=f;
		}
	}
	//function to make in the next metro
	this.nextStepFunction=false;
	this.trigger=function(emit=true){
		if(this.alive){
			if(emit)
				sock(this,"trigger");
			this.setapunto(true,this.soundTrigger);
		}
	};
	this.triggerNow=false;
	this.untrigger=function(){
		if(this.alive){
			//ger rid of pendant actions
			if(this.nextStepFunction && this.triggerNow){
				this.nextStepFunction();
				//trigger each son
				for(a=0;a<this.sons.length;a++){
					this.sons[a].trigger(false);
				}
				this.nextStepFunction=false;
				this.setapunto(false);
			}
		}
	}
	this.metro=function(){
		//do the saved function, delete it and append new function if there is
		//stf ensures that this step is not the same in which nextstepfunction was assigned
		if(this.alive){
			this.triggerNow=true;
		}
	}
	this.soundTrigger=function(){
			basicSynth.playMultiEnvelope(randomProperty(basicSynth.envs));
	}
}
$(document).ready(function(){
	Broc.prototype=new Draggable();
	Node.prototype=new Draggable();
});
