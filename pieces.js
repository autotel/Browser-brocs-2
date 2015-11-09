//building pieces for brocs online
var Broc=function(){
	this.sprite=new Two.Path(ngon(0,0,6,30),true,false);
	two.add(this.sprite);
	this.handle=new Handle(12,12,this.sprite);
}
/*var pat = new Two.Path(ngon(0,0,6,30),true,false);
	var pat2 = new Two.Path(ngon(0,0,7,30),true,false);
	two.add(pat);
	two.add(pat2);
	hand=new Handle(12,12,pat);
	hand2=new Handle(0,12,pat2);*/