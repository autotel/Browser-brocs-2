/*building pieces for brocs online*/


	//this will store the kind specific functions
	kinds={normal:""};
	//a broc block



	checkBrocConnectors=function(){
	var start = new Date().getTime();
	for(n in brocs){
		if(brocs[n].checkConnectors(brocs[n])){
		  console.log("f");
		};
	};
		var end = new Date().getTime();
		var time = end - start;
		console.log('Execution time: ' + time);
	};




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

	this.connectors=Array(6);
	par=this;
	Con=function(){
		this.pos=a;
		this.ind=ind;
		this.par=par;
		this.absPos=function(){return sumPos(hexPos[this.pos],this.par.pos)};
		this.sprite=two.makeCircle(this.absPos().x,this.absPos().y,connectorSize);
		this.refresh=function(){	this.sprite.translation.x=this.absPos().x;this.sprite.translation.y=this.absPos().y;};//pendant: make the abspos function once an unpack
		this.son=false;
	}
	for(a=0;a<this.connectors.length;a++){//we maybe not need an object....
		this.connectors[a]=new Con();
	}
	this.sprite=two.makeGroup(this.sprites);
	this.init();
	this.checkConnectors=function(){
		//console.log("check connector");
		for(c=0;c<this.connectors.length;c++){
			//console.log(this.connectors[c].absPos());
			//console.log("number"+c);
			n=0;

			for(b=0;b<brocs.length;b++){
				//console.log(Math.abs(this.connectors[c].absPos().x-brocs[b].pos.x));
				if(this.connectors[c].ind!=brocs[b].ind)
				//pendant: this method detects sqares. we need to detect the exact shape
				if(Math.abs(this.connectors[c].absPos().x-brocs[b].pos.x)<brocSize&&Math.abs(this.connectors[c].absPos().y-brocs[b].pos.y)<brocSize){
					n++;
				}
			}
			if(n>0){
				this.connectors[c].sprite.fill="#F00";
			}else{
				this.connectors[c].sprite.fill="#FFF";
			}
		}

		return false;
	}
	this.moving=function(){
		for(c=0;c<this.connectors.length;c++){
			this.connectors[c].refresh();
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
