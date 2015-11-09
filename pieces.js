/*building pieces for brocs online*/


	//this will store the kind specific functions
	kinds={normal:""};
	//a broc block


function Broc(){
	this.sprite=new Two.Path(ngon(0,0,6,30),true,false);
	this.sprites=[this.sprite];
	//this.sprites.push(this.sprite);
	two.add(this.sprite);
	this.kind=kinds.normal;
	this.pos={
		x:Math.random()*800,
		y:Math.random()*600
	}
	function Connector(){
		this.clickCall=function(){
			console.log("Called");
		}
	}
	Connector.prototype=new Clickable();
	this.connectors=Array(6);
	for(a=this.connectors.length;a>0;a--){
		this.connectors[a]=new Clickable({x:Math.cos(((a+0.5)/6)*(Math.PI*2))*30,y:Math.sin(((a+0.5)/6)*(Math.PI*2))*30});
		this.connectors[a].sprite.translation=this.pos;
		this.connectors[a].init();
		this.sprites.push(this.connectors[a].sprite);
	}
	this.sprite=two.makeGroup(this.sprites);
	this.init();
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
