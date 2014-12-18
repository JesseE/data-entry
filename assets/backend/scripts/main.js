// setTimeout('window.location.reload();', 60000);

var x = d3.scale.linear()
    .domain([ 0, d3.max(allValues)])
    .range([ 0, 250]);

  d3.select(".removed")
  .selectAll("div")
    .data(additions)
  .enter().append("div")
    .style("width", function(d) {  return x(d) + "px"; })
     .on("mouseover", function(d){
        d3.select(this)
          .append("span")
          .style("position","absolute")
          .style("color","white")
          .text(function(d){ return "lines added: "+ d + "author:" + author;})
    })
    .on("mouseout", function(d){
        d3.selectAll("span")
          .remove();
    });

d3.select(".added")
  .selectAll("div")
    .data(removals)
  .enter().append("div")
    .style("width", function(d) { return x(d) + "px"; })
    .on("mouseover", function(d){
      d3.select(this)
        .append("span")
        .style("position","absolute")
        .style("color","white")
        .text(function(d) { return "lines removed: "+ d;});
    })
    .on("mouseout", function(d){
      d3.selectAll("span")
        .remove();
    });

// d3.select(".author")
//   .selectAll("div")
//     .data(author)
//   .enter().append("p");

// console.log('comments' + comments);
console.log('added ' + additions);
console.log('removed ' + removals);
console.log('all' + allValues);
// this didnt work because it wasnt renderd as an string.
// the fix was to create a string out of the variables author.
// what i want
// [ {name: author, name: author, name: author, name: author} ]
console.log(author);
