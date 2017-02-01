var xmlns = "http://www.w3.org/2000/svg";
var phi = (Math.sqrt(5)-1)/2;

var alphabet = 'abcdefghijklmnopqrstuvwxyz';

function makeSymbol_number(n) {
	var g = document.createElementNS(xmlns,'g');
	g.setAttribute('id','s'+n);
	var t = '<circle class="symbol" cx="0" cy="0" r="1" style="fill: hsl('+n*phi*360+',100%,50%)"></circle>';
	t += '<text x="0" y="0.5">'+(n+1)+'</text>';
	g.innerHTML = t;
	document.querySelector('svg#cards .symbols').appendChild(g);
}

var emoji = ['270F','1F683','1F621','270B','1F34C','1F48B','1F34D','2708','2709','1F6BD','1F347','1F349','1F649','1F344','1F335','26FA','1F414','1F368','1F31B','1F638','23F0','1F680','2714','2615','1F4A9','2764','1F428','1F341','1F30F','2693','1F385','1F3B8','1F381','1F457','2614','260E','1F6A9','1F687','1F691','26C4','26BD','231A','1F352','1F378','26FD','1F422','2702','2744','1F6B2','1F3A5','1F345','1F354','1F40C','1F6A2','2716','1F4A3','1F695','1F645','267B'];
function makeSymbol_emoji(n) {
	var g = document.createElementNS(xmlns,'g');
	g.setAttribute('id','symbol'+n);
	var t = '<use x="-0.85" y="-0.85" width="1.7" height="1.7" xlink:href="#'+emoji[n]+'"></use>';
	g.innerHTML = t;
	document.querySelector('svg#cards .symbols').appendChild(g);

}

var sixty = Math.PI/3;
function makeCard(id,symbols) {
	var s = document.createElementNS(xmlns,"g");
	s.setAttribute('id',id);
	var t = '<circle cx="0" cy="0" r="1" class="outline" stroke="black" stroke-width="0.03" fill="white"></circle>';
	var n,scale,translate;
	if(symbols.length==3) {
		n = 3;
		scale = 0.44;
		translate = 1.2;
	} else if(symbols.length==8) {
		n = 7;
		scale = 0.28;
		translate = 2.4;
	}
	for(var i=0;i<symbols.length;i++) {
		var transform = 'scale('+scale+')';
		if(n==3 || i>0) {
			var rotate = (i*360/n);
			transform += ' translate('+translate+') rotate('+rotate+' -'+translate+' 0) rotate(-90)';
		}
		t += '<use x="0" y="0" transform="'+transform+'" xlink:href="#'+symbols[i]+'"></use>'
	}
	s.innerHTML = t;
	document.querySelector('svg#cards defs').appendChild(s);
	return s;
}

// make the next level of Droste Dobble cards
function droste(from,to,geometry) {
	var div = document.createElement('div');
	if(from=='symbol') {
		geometry.map(function(js,i){
			makeCard(to+i,js.map(function(j){return from+j}));
		})
	} else {
		geometry.map(function(_,i){
			var o = [];
			geometry.forEach(function(c,j){
				if(c.indexOf(i)>=0) {
					o.push(from+j);
				}
			});
			makeCard(to+i,o);
		})
	}
	return div;
}


var geometries = {
	dobble: [
		[0, 1, 2, 3, 4, 5, 6, 56], 
		[0, 7, 14, 21, 28, 35, 42, 49], 
		[0, 8, 16, 24, 32, 40, 48, 50],
		[0, 9, 18, 27, 29, 38, 47, 51],
		[0, 10, 20, 23, 33, 36, 46, 52],
		[0, 11, 15, 26, 30, 41, 45, 53],
		[0, 12, 17, 22, 34, 39, 44, 54],
		[0, 13, 19, 25, 31, 37, 43, 55],
		[1, 7, 20, 26, 32, 38, 44, 55],
		[1, 8, 15, 22, 29, 36, 43, 49],
		[1, 9, 17, 25, 33, 41, 42, 50],
		[1, 10, 19, 21, 30, 39, 48, 51],
		[1, 11, 14, 24, 34, 37, 47, 52],
		[1, 12, 16, 27, 31, 35, 46, 53],
		[1, 13, 18, 23, 28, 40, 45, 54],
		[2, 7, 19, 24, 29, 41, 46, 54],
		[2, 8, 14, 27, 33, 39, 45, 55],
		[2, 9, 16, 23, 30, 37, 44, 49],
		[2, 10, 18, 26, 34, 35, 43, 50],
		[2, 11, 20, 22, 31, 40, 42, 51],
		[2, 12, 15, 25, 28, 38, 48, 52],
		[2, 13, 17, 21, 32, 36, 47, 53],
		[3, 7, 18, 22, 33, 37, 48, 53],
		[3, 8, 20, 25, 30, 35, 47, 54],
		[3, 9, 15, 21, 34, 40, 46, 55],
		[3, 10, 17, 24, 31, 38, 45, 49],
		[3, 11, 19, 27, 28, 36, 44, 50],
		[3, 12, 14, 23, 32, 41, 43, 51],
		[3, 13, 16, 26, 29, 39, 42, 52],
		[4, 7, 17, 27, 30, 40, 43, 52],
		[4, 8, 19, 23, 34, 38, 42, 53],
		[4, 9, 14, 26, 31, 36, 48, 54],
		[4, 10, 16, 22, 28, 41, 47, 55],
		[4, 11, 18, 25, 32, 39, 46, 49],
		[4, 12, 20, 21, 29, 37, 45, 50],
		[4, 13, 15, 24, 33, 35, 44, 51],
		[5, 7, 16, 25, 34, 36, 45, 51],
		[5, 8, 18, 21, 31, 41, 44, 52],
		[5, 9, 20, 24, 28, 39, 43, 53],
		[5, 10, 15, 27, 32, 37, 42, 54],
		[5, 11, 17, 23, 29, 35, 48, 55],
		[5, 12, 19, 26, 33, 40, 47, 49],
		[5, 13, 14, 22, 30, 38, 46, 50],
		[6, 7, 15, 23, 31, 39, 47, 50],
		[6, 8, 17, 26, 28, 37, 46, 51],
		[6, 9, 19, 22, 32, 35, 45, 52],
		[6, 10, 14, 25, 29, 40, 44, 53],
		[6, 11, 16, 21, 33, 38, 43, 54],
		[6, 12, 18, 24, 30, 36, 42, 55],
		[6, 13, 20, 27, 34, 41, 48, 49],
		[7, 8, 9, 10, 11, 12, 13, 56],
		[14, 15, 16, 17, 18, 19, 20, 56],
		[21, 22, 23, 24, 25, 26, 27, 56],
		[28, 29, 30, 31, 32, 33, 34, 56],
		[35, 36, 37, 38, 39, 40, 41, 56],
		[42, 43, 44, 45, 46, 47, 48, 56],
		[49, 50, 51, 52, 53, 54, 55, 56]
	],
	fano: [
		[0,1,5],
		[1,3,6],
		[3,4,5],
		[2,5,6],
		[0,2,3],
		[1,2,4],
		[0,4,6]
	]
};

var formats = {
	'a0': ['841mm','1189mm'],
	'a1': ['594mm','841mm'],
	'a2': ['420mm','594mm'],
	'a3': ['297mm','420mm'],
	'a4': ['210mm','297mm'],
	'a5': ['148mm','210mm'],
	'a6': ['105mm','148mm'],
	'a7': ['74mm','105mm'],
	'a8': ['52mm','74mm'],
	'a9': ['37mm','52mm'],
	'a10': ['26mm','37mm'],
	'square': ['500px','500px']
}

function make_element(name,attributes,content) {
	var e = document.createElement(name);
	for(var key in attributes) {
		e.setAttribute(key,attributes[key]);
	}
	if(content!==undefined) {
		e.innerHTML = content;
	}
	return e;
}

function Dobbler() {
	var d = this;
	document.addEventListener('DOMContentLoaded', function(){ d.go() }, false);
}
Dobbler.prototype = {

	geometryName: 'dobble',
	depth: 2,
	page: null,
	rows: 5,
	cols: 4,
	formatName: 'a4',


	make_symbols: function() {
		for(var i=0;i<57;i++) {
			makeSymbol_emoji(i);
		}
	},

	load_settings: function() {
		if(document.location.search) {
			var bits = document.location.search.slice(1).split('&');
			var width,height;
			bits.map(function(bit) {
				var item = bit.split('=');
				var name = decodeURIComponent(item[0]);
				var value = decodeURIComponent(item[1]);
				if(value!='') {
					switch(name) {
					case 'geometry':
						value = value.toLowerCase();
						if(value in geometries) {
							this.geometryName = value;
						}
						break;
					case 'depth':
						this.depth = Math.max(parseInt(value),1);
						break;
					case 'page':
						this.page = Math.max(parseInt(value),0);
						break;
					case 'rows':
						this.rows = Math.max(parseInt(value),1);
						break;
					case 'cols':
						this.cols = Math.max(parseInt(value),1);
						break;
					case 'single':
						this.rows = 1;
						this.cols = 1;
						if(this.page===null) {
							this.page = 0;
						}
						break;
					case 'format':
						value = value.toLowerCase();
						if(value in formats) {
							this.formatName = value;
						}
						break;
					case 'width':
						width = value;
						break;
					case 'height':
						height = value;
						break;
					}
				}
			},this);
		}
		this.geometry = geometries[this.geometryName];
		if(width!==undefined && height!==undefined) {
			this.format = [width,height];
		} else {
			this.format = formats[this.formatName];
		}
	},

	setup_form: function() {
		var form = document.querySelector('#options');
		
		for(var geometry in geometries) {
			form.querySelector('select[name=geometry]').appendChild(make_element('option',{value:geometry},geometry));
		}
		form.querySelector('select[name=geometry]').value = this.geometryName;

		form.querySelector('input[name=depth]').value = this.depth;
		form.querySelector('input[name=page]').value = this.page;
		form.querySelector('input[name=rows]').value = this.rows;
		form.querySelector('input[name=cols]').value = this.cols;

		for(var format in formats) {
			form.querySelector('select[name=format]').appendChild(make_element('option',{value:format},format));
		}
		form.querySelector('select[name=format]').value = this.formatName;
	},

	show_pages: function() {
		var from = 'symbol';
		var div;
		alphabet.split('').slice(0,this.depth).map(function(to) {
			droste(from,to,this.geometry)
			from = to;
		},this);

		if(this.page===null) {
			for(var page=0;page*this.rows*this.cols<this.geometry.length;page+=1) {
				this.show_grid(page);
			}
		} else {
			this.show_grid(this.page);
		}
	},

	show_grid: function(page) {
		var rows = this.rows,
			cols = this.cols,
			width = this.format[0],
			height = this.format[1],
			depth = this.depth
		;

		var start = rows*cols*page;

		var output = document.querySelector('#output');

		var svg = document.querySelector('svg#cards').cloneNode(true);
		output.insertBefore(svg,output.firstChild);
		svg.setAttribute('class','page');
		svg.setAttribute('width',width);
		svg.setAttribute('height',height);
		svg.removeAttribute('id');

		var margin = 0.05;
		var offset = 1+margin;
		var space = 2*(1+margin);

		svg.setAttribute('viewBox','0 0 '+cols*space+' '+rows*space);

		for(var row=0;row<rows;row++) {
			for(var col=0;col<cols;col++) {
				var n = start+row*cols+col;
				var card = document.createElementNS(xmlns,"g");
				card.innerHTML = '<use x="'+(space*col+offset)+'" y="'+(space*row+offset)+'" transform="scale(1)" xlink:href="#'+alphabet[depth-1]+n+'"></use>';
				svg.appendChild(card);
			}
		}

		var link = document.createElement('a');
		var data = encodeURI(svg.outerHTML);
		link.setAttribute('href','data:text/plain;charset=utf-8,'+data);
		link.setAttribute('download','page'+page+'.svg');
		link.innerText = 'page '+page;
		output.insertBefore(link,svg);
	},


	go: function() {
		this.load_settings();
		this.setup_form();
		this.make_symbols();
		document.body.classList.remove('loading');
		this.show_pages();
	}
}

var dobbler = new Dobbler();
