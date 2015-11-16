/*building pieces for brocs online*/


	//this will store the kind specific functions
	kinds={normal:""};
	//a broc block



	checkBrocConnectors=function(){
	var start = new Date().getTime();
	for(n in brocs){
		if(brocs[n].checkNodes(brocs[n])){
		  console.log("f");
		};
	};
		var end = new Date().getTime();
		var time = end - start;
		console.log('Execution time: ' + time);
	};

connectors={};
function Connector(a,b){
	this.sprite=two.makeCircle((a.pos.x+b.pos.x)/2,(a.pos.y+b.pos.y)/2,connectorSize);
	this.sprite.fill="#FF0";
	this.remove=function(){
		$("#"+this.sprite.id).detach();
		console.log("jj");
	}
}

connectors=[];

function Broc(ind){
	this.ind=ind;
	this.sprite=new Two.Path(ngon(0,0,6,brocSize),true,false);
	this.rad=brocSize;
	this.sprites=[this.sprite];
	//this.sprites.push(this.sprite);
	two.add(this.sprite);
	this.kind=kinds.normal;
	this.pos={
		x:Math.random()*100,
		y:Math.random()*200
	};

	this.nodes=Array(6);
	par=this;
	Node=function(){
		this.pos=a;
		this.ind=ind;
		this.par=par;
		this.absPos=function(){return sumPos(hexPos[this.pos],this.par.pos)};
		this.sprite=two.makeCircle(this.absPos().x,this.absPos().y,connectorSize);
		this.refresh=function(){
			this.sprite.translation.x=this.absPos().x;
			this.sprite.translation.y=this.absPos().y;
		};//pendant: make the abspos function once an unpack
		this.son=false;
		this.visible=false;
	}
	for(a=0;a<this.nodes.length;a++){//we maybe not need an object....
		this.nodes[a]=new Node();
	}
	this.sprite=two.makeGroup(this.sprites);
	this.init();
	this.checkNodes=function(){
		//console.log("check connector");
		//pendant: these could be much more efficient if one brocs ouldnt check back what was already checked y the other
		for(c=0;c<this.nodes.length;c++){
			//console.log(this.nodes[c].absPos());
			//console.log("number"+c);
			n=0;
			who={};
			for(b=0;b<brocs.length;b++){
				//console.log(Math.abs(this.nodes[c].absPos().x-brocs[b].pos.x));
				if(this.nodes[c].ind!=brocs[b].ind)
				//pendant: this method detects sqares. we need to detect the exact shape
				if(Math.abs(this.nodes[c].absPos().x-brocs[b].pos.x)<brocSize&&Math.abs(this.nodes[c].absPos().y-brocs[b].pos.y)<brocSize){
					n++;
					who=brocs[b];
				}
			}
			if(n>0){
				this.nodes[c].sprite.fill="transparent";
				this.nodes[c].sprite.stroke="rgba(0,0,0,0.6)";
				// if(typeof connectors[this.ind+"_"+c]=='undefined')
				// connectors[this.ind+"_"+c]=new Connector(this,who);
			}else{
				this.nodes[c].sprite.fill="transparent";
				this.nodes[c].sprite.stroke="transparent";

			}

		}

		return false;
	}
	this.moving=function(){
		for(c=0;c<this.nodes.length;c++){
			this.nodes[c].refresh();
		}
	};
}
$(document).ready(function(){
	Broc.prototype=new Draggable();
});



/*var pat = new Two.Path(ngon(0,0,6,30),true,false);
	var pat2 = new Two.Path(ngon(0,0,7,30),true,false);
	two.add(pat);
	two.add(pat2);
	hand=new Draggable(12,12,pat);
	hand2=new Draggable(0,12,pat2);*/
