// step 1: the first thing we need to do is to import all the required modules
	const express =require('express');
	const mysql =require('mysql');
	const path =require('path');
	const bodyParser=require('body-parser');
//end of step 1

 
//////////////////////////////////////////////step 3: Manage routs//////////////////////////
	const app = express();
	app.set('view engine', 'ejs');
	app.use(bodyParser.json());

	
	app.use(bodyParser.urlencoded({ extended : false }));
	
	app.use('/', require('./routes/pages'));
	
	
//////////////////////////////////////////end of step 3 ///////////////////////////////////

//step 4: start server
	
	app.listen(5000, () => {
		console.log("addressbook server is started on port 5000");
	})
	
	
//end of step 4