//request js lib 
var unirest = require('unirest');
	var git = {};
	//github request repos
	git.username = "JesseE";
	git.password = "Eikema22";
	git.header = {'user-agent': 'node.js'};
	git.repository = "data-entry";
	git.branch = "master";
	git.done = false;
 
	git.commitsHash = [];
	git.commitContainer = [];
	git.checker = [];
	git.gitStats = [];
	git.gitMessage = [];

	git.commitsHash.length = 30;
	git.commitContainerNumber = {};
	git.commitContainerNumber.length = 90;
	// get all commit hashes
	getAllCommitPageOne();
	function getAllCommitPageOne (){ unirest.get('https://api.github.com/repos/JesseE/'+git.repository+'/commits?page=1>sha=master').auth({
	    user: git.username,
	    pass: git.password,
	    sendImmediately: true
	}).headers(git.header).end(function(response){
	    for(var i = 0, len = git.commitsHash.length; i < len; ++i){
	        git.commitContainer.push(response.body[i].sha);
	    }
	    getAllCommitPageTwo();   
	    });
	};
	function getAllCommitPageTwo (){ unirest.get('https://api.github.com/repos/JesseE/'+git.repository+'/commits?page=2>sha=master').auth({
	    user: git.username,
	    pass: git.password,
	    sendImmediately: true
	}).headers(git.header).end(function(response){
	    for(var i = 0, len = git.commitsHash.length; i < len; ++i){
	        git.commitContainer.push(response.body[i].sha);
	    }
	    getAllCommitPageThree();
	    });
	};
	function getAllCommitPageThree (){ unirest.get('https://api.github.com/repos/JesseE/'+git.repository+'/commits?page=3>sha=master').auth({
	    user: git.username,
	    pass: git.password,
	    sendImmediately: true
	}).headers(git.header).end(function(response){
	    for(var i = 0, len = git.commitsHash.length; i < len; ++i){
	        git.commitContainer.push(response.body[i].sha);
	    }
	    getAllStats();  
	    });
	};
	//addtions deletions total adjustments in a commit
	function getAllStats () { 
	    for(var i = 0, len = git.commitContainerNumber.length; i < len; ++i){
	        unirest.get('https://api.github.com/repos/JesseE/'+git.repository+'/commits/'+git.commitContainer[i]).auth({
	            user: git.username,
	            pass: git.password,
	            sendImmediately: true
	        }).headers(git.header).end(function(response){
	            git.gitStats.push(response.body.stats);   
	        });
	    };
	    getAllMessage();
	};
	// commit comments
	function getAllMessage () { 
	    for(var i = 0, len = git.commitContainerNumber.length; i < len; ++i){
	        unirest.get('https://api.github.com/repos/JesseE/'+git.repository+'/commits/'+git.commitContainer[i]).auth({
	            user: git.username,
	            pass: git.password,
	            sendImmediately: true
	        }).headers(git.header).end(function(response){  
	           // var object = {"comment" : response.body.commit.message};     
	            var object = response.body.commit.message;
	            object = object.replace(/(\r\n|\n|\r)/gm,"");
	            git.gitMessage.push(object); 
	            completeReq();  
	        });

	    };
	};
	function completeReq() {
	    done = true;
	};

module.exports = git;