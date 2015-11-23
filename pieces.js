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
	this.onRelease=function(who){
		if(who instanceof (Broc) )
		this.broc.sons.push(who);
		// console.log(who);
		this.move(this.broc.pos);
		// console.log("this:");
		// console.log(this);
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
		}
	}
	//pendant: make the abspos function once an unpack
	this.active=false;
};

$(document).ready(function(){
	Broc.prototype=new Draggable();
	Node.prototype=new Draggable();
});

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
	this.sound=envs.testfnv;
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
		//oldmousedown();
		if(this.isselected()){
			playMultiEnvelope(this.sound);
		}else{
			this.setselected(true)
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
				this.sons.line=new Two.Line(this.pos.x,this.pos.y,this.sons[s].pos.x, this.sons[s].pos.y).addTo(layer[3]);
		}
	};
}




/*var pat = new Two.Path(ngon(0,0,6,30),true,false);
	var pat2 = new Two.Path(ngon(0,0,7,30),true,false);
	two.add(pat);
	two.add(pat2);
	hand=new Draggable(12,12,pat);
	hand2=new Draggable(0,12,pat2);*/
