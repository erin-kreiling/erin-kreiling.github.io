
var margin = {left:100, right:10, top:10, bottom: 150};

var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

//changing the svg to have a group <g> tag
var group = d3.select("#chart-area")
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", 
					"translate(" + margin.left + ", " + margin.top + ")");
//x label
group.append("text")
		.attr("x", width/2)
		.attr("y", height+140)
		.attr("font-size", "20px")
		.attr("text-anchor", "middle")
		.text("Use of Weapons by Country");
		
//y label
group.append("text")
		.attr("x", -(height/2))
		.attr("y", -60)
		.attr("font-size", "20px")
		.attr("text-anchor", "middle")
		.attr("transform", "rotate(-90)")
		.text("Height (m)");


var list = [];

d3.csv("/DATS6401_FinalProject/data/weaponry.csv", function(data) { 
	var attack = {country:data.Country, firearm:data.Firearm_Attacks};
	list.push(attack);
});

	
	list.forEach(function(d){
		d.firearm = +d.firearm; //casting; same as parseInt(d.height)
		//bardata.push(d.name);
	});

	
	//let's use the map function instead of bardata
	var x = d3.scaleBand()
				.domain(list.map(function(d){ return d.country }))
				.range([0,width])
				.paddingInner(0.3)
				.paddingOuter(0.3);
	
	
	//working with scales
	var y = d3.scaleLinear()
				.domain([0, d3.max(list, 
							function(d){ return d.firearm}) + 20]) 
						//use max() instead of a hard coded value
				.range([height,0]);
	
	//Axes generators
	var xAxisCall = d3.axisBottom(x);
	group.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0, " + height + ")")
		.call(xAxisCall)
		.selectAll("text")
			.attr("y", "10")
			.attr("x", "-5")
			.attr("text-anchor", "end")
			.attr("transform", "rotate(-40)");
	
	var yAxisCall = d3.axisLeft(y)
						.ticks(5)
						.tickFormat(function(d){ return d + "m" });
	group.append("g")
		.attr("class", "y axis")
		.call(yAxisCall);
	
	var rects = group.selectAll("rect")
					.data(list)
				.enter()
					.append("rect")
					.attr("x", function(d,i){ return x(d.country) })
					.attr("y", function(d){ return y(d.firearm) })
					.attr("width", x.bandwidth())
					.attr("height", function(d){ return firearm-y(d.firearm) })
					.attr("fill", "purple")


