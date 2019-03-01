function Rectangle(x, y, w, h, ss) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.strokeStyle = ss;
}

Rectangle.prototype.draw = function (context) {
	context.beginPath();
	context.rect(this.x, this.y, this.width, this.height);
	context.strokeStyle = this.strokeStyle;
	context.stroke();
	context.closePath();
}