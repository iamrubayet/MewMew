const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

function isValidMew(mew){
	return mew.name && mew.name.toString().trim() !== '' &&
	      mew.content && mew.content.toString().trim() !== '';
}



app.get('/',(req,res)=>{
	res.json({
		message: 'meower'

	});

});

app.post('/mews',(req,res)=>{
	if(isValidMew(req.body))
	{
		const mew = {
		name : req.body.name.toString(),
		content : req.body.content()

	};
	console.log(mew);

	}
	else
	{
		res.status(422);
		res.json({
			message: 'hey name and content are required'

		})

	}

});

app.listen(5000,()=>{
	console.log('http://localhost:5000');

});