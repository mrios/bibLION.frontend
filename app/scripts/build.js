//steal/js app/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('app/scripts/build.html',{to: 'app'});
});
