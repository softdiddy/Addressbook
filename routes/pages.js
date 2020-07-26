const express =require('express');
const mysql =require('mysql');
const router=express.Router();


router.get('/', (req,res) => {
	const db=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'addressbook'
		});
		
		db.connect( (error) => {
			if(error){
				console.log(error);
			}else{
				console.log("Database Connected");
			}
		})
	db.query('SELECT *FROM contactinformation', (error, rows,fields)=>{
		if(error){
			console.log(error);
		}else{
			
			res.render('index',{
			datarow:rows,
			msg:""
	});
		}
	})
	
});


router.post('/addNewContact', (req,res) => {
	const { fullname,phoneno,address,email } =req.body;
	 if(fullname == ''){
		 return res.render('index', {
		 msg:"Please enter Contact fullname"
	});	
			 
	}else if(phoneno == ''){
		 return res.render('index', {
		 msg:"Please enter Contact Phone Number"
	});	
			 
	}else if(address == ''){
		 return res.render('index', {
		 msg:"Please enter Contact Address"
	});			 
	}else if(email == ''){
		 return res.render('index', {
		 msg:"Please enter Contact Email"
	});			 
	}else{
		const db=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'addressbook'
		});
		
		db.connect( (error) => {
			if(error){
				console.log(error);
			}else{
				console.log("Database Connected");
			}
		})
		db.query('INSERT INTO contactinformation SET ?', 
		{contact_fullname:fullname,contact_address:address,contact_phoneNo:phoneno,contact_email:email}, 
		(error,results) => {
			if(error){
				console.log(error);
			}else{
				res.redirect('/');
			}
		})
		
	}
	 
});

router.get('/delete/:contactId', (req,res)=>{
	const db=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'addressbook'
		});
		
		db.connect( (error) => {
			if(error){
				console.log(error);
			}else{
				console.log("Database Connected");
			}
		})
	const contactId =req.params.contactId;
	db.query('DELETE FROM contactinformation WHERE ?', 
		{contact_id:contactId}, 
		(error,results) => {
			if(error){
				console.log(error);
			}else{
				res.redirect('/');
			}
		})
});

router.get('/edit/:contactId', (req,res) =>{
		const db=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'addressbook'
		});
		
		db.connect( (error) => {
			if(error){
				console.log(error);
			}else{
				console.log("Database Connected");
			}
		})
	const contactId=req.params.contactId;
	db.query('SELECT *FROM contactinformation WHERE ?',
	{contact_id:contactId}, 
	(error,rows)=>{
		if(error){
			console.log(error);
		}else{
			
			res.render('editContact',{
			datarow:rows[0],
			msg:""
	});
		}
	})
});


router.post('/updatecontact/:contactId', (req,res) => {
	const { fullname,phoneno,address,email } =req.body;
	const contactId =req.body.contactID;
	 if(fullname == ''){
		 return res.render('index', {
		 msg:"Please enter Contact fullname"
	});	
			 
	}else if(phoneno == ''){
		 return res.render('index', {
		 msg:"Please enter Contact Phone Number"
	});	
			 
	}else if(address == ''){
		 return res.render('index', {
		 msg:"Please enter Contact Address"
	});			 
	}else if(email == ''){
		 return res.render('index', {
		 msg:"Please enter Contact Email"
	});			 
	}else{
		const db=mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'',
			database:'addressbook'
		});
		db.connect( (error) => {
			if(error){
				console.log(error);
			}else{
				console.log("Database Connected");
			}
		})
	
	db.query("UPDATE contactinformation SET contact_fullname='" + fullname + "',contact_address='" + 
	address + "',contact_phoneNo='" + phoneno + "',contact_email='" + email + "' WHERE ?", 
		
		{contact_id:contactId}, 
		(error,results) => {
			if(error){
				console.log(error);
			}else{
				res.redirect('/');
			}
		})	
	}
});
module.exports=router;