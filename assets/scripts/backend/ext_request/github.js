//github request module
module.exports.create = function(request, response){
	var unirest = require('unirest');
	//github request repos
	var username = "JesseE";
	var password = "Eikema22";
	var header = {'user-agent': 'node.js'};
	var repository = "data-entry";
	var branch = "master";

	var commitsHash = [];
	var commitContainer = [];
	var checker = [];
	var gitStats = [];
	var gitMessage = [];
	commitsHash.length = 30;
	var commitContainerNumber = {};
	commitContainerNumber.length = 90;

	getAllCommitPageOne();
	// get all commit hashes
	function getAllCommitPageOne (){ unirest.get('https://api.github.com/repos/JesseE/'+repository+'/commits?page=1>sha=master').auth({
	    user: username,
	    pass: password,
	    sendImmediately: true
	}).headers(header).end(function(response){
	    for(var i = 0, len = commitsHash.length; i < len; ++i){
	        commitContainer.push(response.body[i].sha);
	    }
	    getAllCommitPageTwo();   
	    });
	};
	function getAllCommitPageTwo (){ unirest.get('https://api.github.com/repos/JesseE/'+repository+'/commits?page=2>sha=master').auth({
	    user: username,
	    pass: password,
	    sendImmediately: true
	}).headers(header).end(function(response){
	    for(var i = 0, len = commitsHash.length; i < len; ++i){
	        commitContainer.push(response.body[i].sha);
	    }
	    getAllCommitPageThree();
	    });
	};
	function getAllCommitPageThree (){ unirest.get('https://api.github.com/repos/JesseE/'+repository+'/commits?page=3>sha=master').auth({
	    user: username,
	    pass: password,
	    sendImmediately: true
	}).headers(header).end(function(response){
	    for(var i = 0, len = commitsHash.length; i < len; ++i){
	        commitContainer.push(response.body[i].sha);
	    }
	    
	    getAllStats();  
	    });
	};
	//addtions deletions total adjustments in a commit
	function getAllStats () { 
	    for(var i = 0, len = commitContainerNumber.length; i < len; ++i){
	        unirest.get('https://api.github.com/repos/JesseE/'+repository+'/commits/'+commitContainer[i]).auth({
	            user: username,
	            pass: password,
	            sendImmediately: true
	        }).headers(header).end(function(response){
	            gitStats.push(response.body.stats);   
	        });
	    };
	    getAllMessage();
	};
	// commit comments
	function getAllMessage () { 
	    for(var i = 0, len = commitContainerNumber.length; i < len; ++i){
	        unirest.get('https://api.github.com/repos/JesseE/'+repository+'/commits/'+commitContainer[i]).auth({
	            user: username,
	            pass: password,
	            sendImmediately: true
	        }).headers(header).end(function(response){  
	           // var object = {"comment" : response.body.commit.message};     
	           console.log(gitStats);
	            var object = response.body.commit.message;
	            gitMessage.push(object);        
	        });
	    };
	};
};