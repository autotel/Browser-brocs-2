/*building pieces for brocs online*/


	//this will store the kind specific functions
	kinds={normal:""};

function Node(ind){
	this.name="node"+ind;
	this.pos=a;
	this.ind=ind;
	this.par=par;
	this.broc;
	this.sprite=two.makeCircle(0,0,brocSize*1.2);
	this.sprite.addTo(layer[2]);
	this.$elem=$(domElem(this.sprite));
	main=this;
	//these are triggered by their draggable bit
	this.moving=function(){
		//if(pos){
			//this.sprite.scale=Math.abs(this.pos.x-this.broc.pos.x);
		//}
	};
	//these are triggered by their draggable bit
	//who is the subject over which mouse was released
	this.onMouseUp=function(who){
		if(who instanceof (Broc) ){
			this.broc.sons.push(who);
		}
		this.move(this.broc.pos)
	}
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

$(document).ready(function(){
	Broc.prototype=new Draggable();
	Node.prototype=new Draggable();
});
//testing purposes, from http://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
var randomProperty = function (obj) {
	var keys = Object.keys(obj)
	return obj[keys[ keys.length * Math.random() << 0]];
};

function Broc(ind){
	this.name="broc"+ind;
	this.sons=[];
	this.node;
	par=this;
	this.node=new Node(a);
	this.node.init();
	this.node.broc=this;
	this.ind=ind;
	this.sprite=new Two.Path(ngon(0,0,6,brocSize),true,false);
	this.sprite.addTo(layer[1]);
	this.rad=brocSize;
	this.sound=randomProperty(envs);

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
		this.node.move({x:pointer.pos.x,y:pointer.pos.y});
	};
	this.onMouseDown=function(){
		if(this.isselected()){
			this.trigger();
		}else{
			this.setselected(true)
			this.node.setselected(true);
		}
	}
	// this.select=function(val){
	// 	if(val){
	// 		this.selected=true;
	// 		this.node.visible(true);
	// 		//this.node.move({x:pointer.pos.x,y:pointer.pos.y});
	// 	}else{
	// 		this.selected=false;
	// 		this.node.visible(false);
	// 	}
	// }
	this.refreshlines=function(){
		for(s=0;s<this.sons.length;s++){
			//if(this.sons.line)
					two.remove(this.sons.line);
				this.sons.line=new Two.Line(this.pos.x,this.pos.y,this.sons[s].pos.x, this.sons[s].pos.y).addTo(redframe);
		}
	};
	this.node.move(this.pos);

	this.setapunto=function(val,f){
		this.selectflag &= ~(1<<4);//clear
		this.selectflag |= (val<<4);
		this.paint();
		this.triggerNow=false;
		if(f)
		this.nextStepFunction=f;
	}
	//function to make in the next metro
	this.nextStepFunction=false;
	this.trigger=function(){
		this.setapunto(true,this.soundTrigger);
	};
	this.triggerNow=false;
	this.untrigger=function(){
		//ger rid of pendant actions
		if(this.nextStepFunction && this.soundTrigger){
			this.nextStepFunction();
			//trigger each son
			for(a=0;a<this.sons.length;a++){
				this.sons[a].trigger();
			}
			this.nextStepFunction=false;
			this.setapunto(false);
		}
	}
	this.metro=function(){
		//do the saved function, delete it and append new function if there is
		//stf ensures that this step is not the same in which nextstepfunction was assigned

		this.triggerNow=true;
	}
	this.soundTrigger=function(){
		playMultiEnvelope(this.sound);
	}
}




/*var pat = new Two.Path(ngon(0,0,6,30),true,false);
	var pat2 = new Two.Path(ngon(0,0,7,30),true,false);
	two.add(pat);
	two.add(pat2);
	hand=new Draggable(12,12,pat);
	hand2=new Draggable(0,12,pat2);*/
