const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const fs = require('fs');


app.use(bodyParser.json())

app.get('/api/account', (req, res) => {
	fs.readFile('./data.json', 'utf8', (error, jsonFile) => {
		if (error) return console.log(error);
		const jsonData = JSON.parse(jsonFile);
		res.send(jsonData)
	});

})
app.post('/api/post', (req, res) => {
	var newData = req.body
	fs.readFile('./data.json', 'utf8', (error, oldData) => {
		let parsedData = JSON.parse(oldData);
		parsedData.push(newData)
		fs.writeFile('./data.json', JSON.stringify(parsedData), (err) => {
			if (err) throw err;
		})
		console.log(newData)
	})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))