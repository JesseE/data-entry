// nav functionality
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
$('a.active').hover(function(){
    switch (value) {
        case 0 :
            $('.nav--secundairy').hide();
            $('header, section, footer').removeClass('menu-active');
            value = 1;
            console.log('show');
            break;
        case 1 :
            $('.nav--secundairy').show();
            $('header, section, footer').addClass('menu-active');
            value = 0;
            console.log('hide');
            break;
    }
});
var mode = 2;

// skills visualisation

var data = [
	{name: "GIT", score: 4},
 	{name: "Javascript", score: 8},
  	{name: "SASS", score: 8},
   	{name: "Node", score: 16}
];

var dataScore = [];
var dataName = [];
for (var i = 0, len = data.length; i < len; i ++){
	data[i];
	dataScore.push(data[i].score);
	dataName.push(data[i].name);
}
console.log(dataName);

var width = 320,
    barHeight = 20;

var x = d3.scale.linear()
    .domain([0, d3.max(dataScore)])
    .range([0, width]);

var chart = d3.select(".block-list--tools-container")
    .attr("width", width)
    .attr("height", barHeight * dataScore.length);

var bar = chart.selectAll("g")
    .data(dataScore)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; })
    .attr("fill", "white");

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return  width-500; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .attr("class", "block-list--tools-container__bar")
    .data(dataName)
    .text(function(d) { return d; });

// git activity visualisation

var gitData = addData;
console.log(gitData);

var x2 = d3.scale.linear()
    .domain([0, d3.max(gitData)])
    .range([0, width]);

var chartZ = d3.select(".git-feed .added")
    .attr("width", width)
    .attr("height", barHeight * gitData.length);

var barB = chartZ.selectAll("g")
    .data(gitData)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; })
    .attr("fill", "white")
        .on("mouseover", function(d) {
        console.log(this);
        d3.select(this)
            .style("fill", "#71B0C2")
    })
    .on("mouseout", function(d) {
        d3.select(this)
            .style("fill", "white")
    });

barB.append("rect")
    .attr("width", x2)
    .attr("height", barHeight - 1);

var gitData2 = removedData;
var minWidth = 320;
var x3 = d3.scale.linear()
    .domain([0,d3.max(gitData2)])
    .range([0,minWidth ]);

var chartX = d3.select(".git-feed .removed")
    .attr("width", 320)
    .attr("height", barHeight * gitData2.length);

var barC = chartX.selectAll("g")
    .data(gitData2)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; })
    .attr("fill", "white")
    .on("mouseover", function(d) {
        console.log(this);
        d3.select(this)
            .style("fill", "#A61B0C")
            .append("div span")
            .style("color","white")
            .style("width", 100)
            .text(function(d){ return "comment:" + d +addedComments;});
    })
    .on("mouseout", function(d) {
        d3.select(this)
            .style("fill", "white")
        d3.selectAll("g div")
            .remove();
    });

barC.append("rect")
    .attr("width", x3)
    .attr("height", barHeight - 1);

//reszier


/*
 *  Anti aliasing images
 *  Author: Jesse
 *
 */

var ratio;

function setAntiAlias(newImg, storage, i){

    //canvas context
    var ctx = newImg.getContext("2d");
    //source of the canvas
    var newImgSource = newImg.toDataURL();

    var oc = document.createElement('canvas');
    var octx = oc.getContext('2d');

    // in order to retrieve newly create canvas with and height turn in to an image tag and give it source
    newImg = new Image();
    newImg.src = newImgSource;

    //get the original uploaded image dimensions
    var originalImage = new Image();
    originalImage.src = oriDimensions[i];

    setRatio(newImg, originalImage);

    setNewCanvas(originalImage, ratio, newImg, ctx, oc, octx);

    drawImageContainer(originalImage, ratio, newImg, ctx, oc, octx);
}
// the ratio is retrieved by doing the following:  √(300/1600)
    // 1000px / 100px  = ratio 0.1
    // x * x  = 0.1
    // x^2 = 0.1
    // x = √0.1
    // newH / origH = R
    // 3√r = Rd
    // x * x * x = 0.1
    // x^3 = 0.1
    // x = 3√0.1
// if more steps are taken to redraw the canvas in the canvas so does the square root change to 3√(300/1600) , 4√(300/1600)
function setRatio(newImg, originalImage) {
    ratio = Math.sqrt(newImg.height / originalImage.height);
}
function setNewCanvas(originalImage, ratio, newImg, ctx, oc) {
    //width and height of the new canvas
    oc.width = originalImage.width * ratio;
    oc.height = originalImage.height * ratio;
}
function drawImageContainer(originalImage, ratio, newImg, ctx ,oc ,octx) {
    //draw canvas into canvas
    //redrawing canvas in steps to let the interpolation work with softer transitions

    //step one
    octx.drawImage(originalImage, 0,0, oc.width, oc.height);
    //step two
    octx.drawImage(oc, 0, 0, oc.width * ratio, oc.height * ratio);
    //step three
    ctx.drawImage(oc, 0, 0, oc.width * ratio, oc.height * ratio,
                     0, 0, newImg.width, newImg.height);
}
/*
 *  filehandling and reset values
 *  Author: Jesse
 *
 */
function clearCollection(){
    $("canvas").remove();
    //clear storage array's in order to remove filled array's
    dataStorage.length = 0;
    storage.length = 0;
    $("#images").remove();
    $("#images img").remove();
    $("#loader").css("width","0%");
    inputWidth.value = "";
    inputHeight.value = "";
    $("#items div").remove();
    $(".dimensions").remove();
    console.log(storage);
    console.log(dataStorage);
}

//collecting all the uploaded images
function uploadCollection(e){
    for(var i = 0, len = e.target.files.length; i < len; i++){
        storage.push(e.target.files[i]);
    }
}
//when resize function needs to be called collect al the images first
function originalCollection(storage, antiAlias, cropFunction) {
    //clear mother of children in order to add new ones
    var mother = document.getElementById("items");
    mother.innerHTML = "";

    if(cropFunction == true) {
        for(var i = 0, len = storage.length; i < len; i++){
            cropImage(storage, i, antiAlias);
        }
    } else {
        for(var i = 0, len = storage.length; i < len; i++){
            manipulateImages(storage, i, antiAlias);
        }
    }
}
//preview of selected files
function handleFileSelect(e) {
    //collect uploaded files
    var files = e.target.files;

    // loop through each one and add preview
    // this loop works asynchronus
    // this loop wil finish first and for each item in the loop create an onload function which has an anonymous invoking function whitin that uses  the paramater
    // theFile in order to acces the name of the file in the filereader.
    // for each item uploaded it returns the templating function and pushes each location of the file to the Dimensions array

    for (var i = 0, len = e.target.files.length; i < len; i++) {
        //bucket of files
        var f = files[i];
        //use the filereader api to get info about file
        var reader = new FileReader;
        //on file load
        reader.onload = (function(theFile) {
            return function(e) {
                //push the original dimensios of uploaded image to array
                oriDimensions.push(e.target.result);
                //template preview for each uploaded image
                var div = document.createElement('div');
                div.setAttribute("id", "images");
                div.innerHTML = ['<img src="', e.target.result,
                                '" title="', escape(theFile.name), '"/>'].join('');
                // document.getElementById('imagecollection__list').appendChild(div, null);
            };
        })(f);
        reader.readAsDataURL(f);
    }
}
/*
 *  Adding filedetection functionality
 *  Author: Jesse
*/
//return the canvas images collection to detect wich file type is needed
function detectFileType(newImg, i){
    loader(i);
    switch(storage[i].type) {
        case "image/jpeg":
            var DataURLJPG = newImg.toDataURL("image/jpeg");
            dataStorage.push(DataURLJPG);
        break;
        case "image/png":
            var DataURLPNG = newImg.toDataURL();
            dataStorage.push(DataURLPNG);
        break;
    }
}
//simple loader counts the amount of placed images from storage
function loader(i){
    console.log(storage.length);
    $("#items,.input__dimensions").hide();
    var index = $("#items canvas").length;
    $('.loader__progress-bar').css("width" ,""+(index/storage.length)*100 +"%");
    if(((index/storage.length)*100) == 100) {
        $('.loader').css("top","20px");
        $('.pen,.passer,.ruler,.circular-ruler,.triangle-ruler,.image-stack').hide();
        $('.ananas,.slippers,.guitar,.badje,.cropped-images,.back,.ending,.download').show();
    }

}
/*
 *  global variables
 *  Author: Jesse
*/
// creating globals to be called in the desired functions
var inputWidth = document.getElementById('widthVal');
var inputHeight = document.getElementById('heightVal');
var oriDimensions = [];
var storage = [];
var dataStorage = [];
var antiAlias = false;
var cropFunction = false;

document.getElementById("file-input").onchange = function(e){
    clearCollection();
    animateCssLeft();
    handleFileSelect(e);
    uploadCollection(e);
};
// document.getElementById("resize").onclick = function(){
//  resizeFunction = true;
//  // cropFunction = true;
//  antiAlias = true;
//  //animateCss();
//  dataStorage.length = 0;
//  originalCollection(storage, antiAlias);
//  //backToTop();
//  };
// document.getElementById("crop").onclick = function(){
//  console.log(storage);
//  dataStorage.length = 0;
//  // antiAlias = true;
//  cropFunction = true;
//  animateCss();
//  originalCollection(storage, cropFunction, antiAlias);
// };
document.getElementById('download').onclick = function(){
    toZip(dataStorage);
};
document.getElementById("clear").onclick = function() {
    clearCollection();
    document.getElementById("file-input").value="";
};
// document.getElementById("antialias").onclick = function(){
//  // still a bug here
//  // dataStorage.length = 0;
//  antiAlias = true;
//  animateCss();
//  originalCollection(storage, antiAlias);
//  backToTop();
// };
// document.getElementById('to-top').onclick = function() {
//     backToTop();
// };
/*
 *  Adding resizablity and cropping functions
 *  Author: Jesse
 *
 */
//resize the images with the javascript external lib loadImage();
function manipulateImages(storage, i, antiAlias) {
    loadImage(
        storage[i],
        function(newImg){
            templatingCanvas(newImg, storage, i, antiAlias);
        },
        {
            minWidth: inputWidth.value,
            maxHeight: inputHeight.value,
            contain: true,
            canvas: true
        }
    );
}
//start the crop function
function cropImage(storage, i, antiAlias){
    loadImage(
        storage[i],
        function(newImg){
            templatingCanvas(newImg, storage, i, antiAlias);
        },
        {
            maxWidth: inputWidth.value,
            maxHeight: inputHeight.value,
            crop: true,
            canvas: true
        }
    );
}
/*
 *  save in zip
 *  Author: Jesse
*/
//return a zipped version of all the transformed images
function toZip() {
    var zip = new JSZip();

    for ( var i = 0, len = dataStorage.length; i < len; i++ ) {
        var strings = dataStorage[i].substr(dataStorage[i].indexOf(',')+1);
        var name = storage[i].name;
        zip.file(name, strings, {base64: true});
    }

    var url = window.URL.createObjectURL(zip.generate({type: "blob"}));
    location.href = url;
    return;
}
/*
 *  Templating and animation
 *  Author: Jesse
 *
 */
function templatingCanvas(newImg, storage, i, antiAlias) {
    //initiate antialiasing if set to true
    if (antiAlias == true) {
        setAntiAlias(newImg, storage, i);
        console.log(dataStorage);
    }

    var canvas = document.getElementById("canvas" + i);
    var item = document.createElement('div');
    var child = document.getElementById("item"+ i);
    var mother = document.getElementById("items");

    item.setAttribute("id", "item"+i);

    //add canvas to parent
    importCanvas(newImg, storage, i, item, mother, child);
    getDimensions(newImg, storage, i);
}
//import canvas to the scene and start to detect which file types are used
function importCanvas(newImg, storage, i, item, mother, child){
    mother.insertBefore(item, null).appendChild(newImg).setAttribute('id', 'canvas'+i);
    detectFileType(newImg, i, storage[i].type);
    console.log('JessMaster');
}
function getDimensions(newImg, storage, i) {
    //get the canvas el widht + height
    var canvas = document.getElementById("canvas" + i);
    var div = document.createElement('div');
    var item = document.getElementById("item" + i);

    setDimensions(newImg, i, div, item, canvas);
}
function setDimensions(newImg, i, div, item, canvas){
    //add the dimensions div el
    div.setAttribute("class", "dimensions");

    div.innerHTML = ['<p>actual width: <span class="highlight">',newImg.width,
                        'px</span>',' and actual height: <span class="highlight">',newImg.height,'px</span> </p>'].join('');

    //insert the width and height values
    item.setAttribute("class", "item");
    item.style.width = canvas.width;
    item.style.height = canvas.height;

    //insert in the div
    item.appendChild(div);
}
function animateCss(){
    $('#imagecollection').css({"left":"5%"});
}
function animateCssLeft(){
    $('.imagecollection').css({"left":"15%"});
}
function backToTop() {
    window.scrollTo(0,0);
}
//this needs to be refactord hard!

//app buttons
var inputValue = $(".input__browse");
var inputDimensions = $(".input__dimensions");
var inputButton = $(".input__button");
var cropButton = $(".input__crop");
var downloadButton = $(".download");
var introduction = $(".intro");

// reset dataStorage array
function clearDataStorage (){
    dataStorage.length = 0;
}
//if there are files
$("input:file").change(function(){
    var fileName = $(this).val();

    //if the files have filenames show different layout
    if(fileName) {
        inputDimensions.show();
        inputButton.show();
        cropButton.show();
        introduction.hide();
        inputValue.hide();

        // create the text block with the amount of files
        var div = document.createElement("div");
        div.setAttribute("class", "amount");
        if(storage.length > 0) {
            div.innerHTML = ["<p>"+storage.length+" files are ready to be resized</p>"];
            $('.additional-info').append(div);
        }

        //changed layout add classes to moved layout el
        $(".image-stack").show();
        $(".passer").addClass("passer-moved");
        $(".triangle-ruler").addClass("triangle-ruler-moved");
    }
});

// array of all the files uploaded
var imageProcessing = storage;


//on click events that change the layout of the page
// $('#crop').on("click", function(){
//  inputButton.hide();
//  cropButton.hide();
//  inputDimensions.hide();
//  $(".amount").hide();
//  $(".loader").show();
// });

$("#resize").on("click", function(){
    inputButton.hide();
    cropButton.hide();
    inputDimensions.hide();
    $(".amount").hide();
    $(".loader").show();
});
// start over button
$("a .back__start-over").on("click", function(){
    window.location.href = window.location;
    $('.passer,.triangle-ruler,.pen,.circular-ruler,.ruler,.input__browse,.intro').show();
    $('.ananas,.slippers,.guitar,.badje,.cropped-images,.download,.loader,.ending,.back,.image-stack').hide();
    $(inputDimensions).hide();
    $(".passer").removeClass("passer-moved");
    $(".triangle-ruler").removeClass("triangle-ruler-moved");
});
// back button
$("a .back__button").on("click", function(){
    $('.passer,.triangle-ruler,.pen,.circular-ruler,.ruler,.image-stack').show();
    $('.ananas,.slippers,.guitar,.badje,.cropped-images,.ending,.back,.loader,.download').hide();
    inputDimensions.show();
    inputButton.show();
    cropButton.show();
    var div = document.createElement("div");
        div.setAttribute("class", "amount");
        if(storage.length > 0) {
            div.innerHTML = ["<p>"+storage.length+" files are ready to be resized</p>"];
            $('.additional-info').append(div);
        }
});

// crop button active or none active
var cropEnabled = document.getElementById("crop").checked = "checked";

$(".input__crop").on("click", function(){
    console.log(cropEnabled);
    if( cropEnabled ){
        document.getElementById('crop-text').innerHTML = "resize & crop";
        $(".icon-label").addClass("pressed");
        $(".icon-label").addClass("active");
        cropEnabled = "";
    } else {
        $(".icon-label").removeClass("active");
        $(".icon-label").removeClass("pressed");
        document.getElementById('crop-text').innerHTML = "resize";
        cropEnabled = "checked";
    }
});

// resize or resize crop
$("#resize").on("click", function(){
    if(cropEnabled){
        //console.log(storage);
        dataStorage.length = 0;
        // antiAlias = true;
        cropFunction = true;
        originalCollection(storage, cropFunction, antiAlias);
    } else {
        dataStorage.length = 0;
        resizeFunction = true;
        // cropFunction = true;
        // antiAlias = true;
        originalCollection(storage, antiAlias);
    }
});

