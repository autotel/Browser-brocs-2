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




function Broc(){
	this.sprite=new Two.Path(ngon(0,0,6,brocSize),true,false);
	this.rad=brocSize;
	this.sprites=[this.sprite];
	//this.sprites.push(this.sprite);
	two.add(this.sprite);
	this.kind=kinds.normal;
	this.pos={
		x:Math.random()*800,
		y:Math.random()*600
	}
	this.whenMoving();
	this.Connector=function(pos){
		this.pos=pos;
		this.clickCall=function(){
			console.log("Called");
		};
		/*this.checkConnector=function(caller){
			ret=false;
			n=0;
			//console.log(this.pos);
			for(b in brocs){
				for(c in brocs[b].connectors){
					console.log("-----------a-----------");
					console.log(this.pos);
					console.log(caller.pos);
					console.log(sumPos(this.pos,caller.pos));
					if(brocs[b].connectors[c].amiHere(sumPos(this.pos,caller.pos))){
						n++;
					}
				}
			}
			if(n>1){//it always find at least one: himself
				ret=true;
				return n;

			}else{
				return false;
			}
		};*/

	};
	this.connectors=Array(6);
	this.Connector.prototype=new Clickable();
	for(a=0;a<this.connectors.length;a++){
		this.connectors[a]=new this.Connector(hexPos[a]);
		this.connectors[a].sprite.translation=this.pos;
		this.connectors[a].init();
		this.sprites.push(this.connectors[a].sprite);
	}

	this.sprite=two.makeGroup(this.sprites);
	this.init();
	this.checkConnectors=function(caller){
		ret=false;
		n=0;
		for(n in this.connectors){
			for(b in brocs){
				tpos=sumPos(this.connectors[n].pos,this.pos);
				console.log(tpos);
				if(Math.abs(tpos.x-brocs[b].pos.x)<this.rad&&Math.abs(tpos.y-brocs[b].pos.y)<this.rad){
					n++;
				}
			}
		}
		if(n>1){return n}else{return ret;}
	}
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
