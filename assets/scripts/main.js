var value = 0;
$('.nav').click(function(){
	switch (value) {
		case 0 :
			$('.nav--off-window').show();
			$('header, section, footer').addClass('menu-active');
			value = 1;
			console.log('show');
			break;
		case 1 :
			$('.nav--off-window').hide();
			$('header, section, footer').removeClass('menu-active');
			value = 0;
			console.log('hide');
			break;
	}
});
var mode = 2;
$('.block-item').click(function(){	
	var id = $(this).attr('id');
	
	console.log(id + '  the value = '+ mode);
	
	switch (mode) {
		case 2:	
			$('.block-item').hide();
			$(this).show();
			console.log('vanish');
			mode = 3;
		break;
		case 3:
		$('.block-item').show();
			console.log('appear');
			mode = 2;
		break;
	}
});
var postid = [];
// var posts = [
// 		post = {
// 			name:'Datavisualisation',
// 			paragraph: 'bitches bitch like to bitch about those bitches',
// 			images:'bitches bitch'
// 		},
// 		post = {
// 			name:'Resizer',
// 			paragraph: 'bitches bitch like to bitch about those bitches',
// 			images:'bitches bitch'
// 		},
// 		post = {
// 			name:'Melkweg',
// 			paragraph: 'bitches bitch like to bitch about those bitches',
// 			images:'bitches bitch'
// 		},
// 		post = {
// 			name:'Score app',
// 			paragraph: 'bitches bitch like to bitch about those bitches',
// 			images:'bitches bitch'
// 		},
// 		post = {
// 			name:'Eikema reintegratie',
// 			paragraph: 'bitches bitch like to bitch about those bitches',
// 			images:'bitches bitch'
// 		}
// 	];
var posts = [
	{
		name:'Datavisualisation',
		paragraph: 'bitches bitch like to bitch about those bitches',
		images:'bitches bitch'
	},
	{
		name:'Resizer',
		paragraph: 'bitches bitch like to bitch about those bitches',
		images:'bitches bitch'
	}
];
var html = template(posts);
var source = $('#item-template').html();
var template = Handlebars.compile(source);

for (var i = 0, len = posts.length; i < len; i++) {
	posts[i];
	console.log(post[i]);
	postid.push(posts[i]);
	console.log(posts[1].name);
}; 

// setTimeout('window.location.reload();', 60000);
// var source = $('datavis-template').html();
// var template = Handlebars.compile(source);
// var data = added;

// var x = d3.scale.linear()
//     .domain([ 0, d3.max(allValues)])
//     .range([ 0, 250]);

//   d3.select(".removed")
//   .selectAll("div")
//     .data(additions)
//   .enter().append("div")
//     .style("width", function(d) {  return x(d) + "px"; })
//      .on("mouseover", function(d){
//         d3.select(this)
//           .append("span")
//           .style("position","absolute")
//           .style("color","white")
//           .text(function(d){ return "lines added: "+ d + "author:" + author;})
//     })
//     .on("mouseout", function(d){
//         d3.selectAll("span")
//           .remove();
//     });

// d3.select(".added")
//   .selectAll("div")
//     .data(removals)
//   .enter().append("div")
//     .style("width", function(d) { return x(d) + "px"; })
//     .on("mouseover", function(d){
//       d3.select(this)
//         .append("span")
//         .style("position","absolute")
//         .style("color","white")
//         .text(function(d) { return "lines removed: "+ d;});
//     })
//     .on("mouseout", function(d){
//       d3.selectAll("span")
//         .remove();
//     });

// // d3.select(".author")
// //   .selectAll("div")
// //     .data(author)
// //   .enter().append("p");

// // console.log('comments' + comments);
// console.log('added ' + additions);
// console.log('removed ' + removals);
// console.log('all' + allValues);
// // this didnt work because it wasnt renderd as an string.
// // the fix was to create a string out of the variables author.
// // what i want
// // [ {name: author, name: author, name: author, name: author} ]
// console.log(author);

