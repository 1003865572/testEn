var person = []
var person_id = 9999;
var fixedTableData = []

for (var i=0; i < 6; i++) {
	fixedTableData.push({
			id:i,
			diskName:'磁盘'+i,
			memory:'2T',
			column1:'3',
			column2:'4',
			column3:'5',
			column4:'6',
			column5:'7',
			column6:'8'
	})
}

var getData = function() {
 	return person
}

var express    = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

//设置跨域访问
app.all('*', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		res.header("X-Powered-By",' 3.2.1')
		res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//查
app.get('/api/getData', function (req, res) {
	person = []
	for (var i=0; i < 6; i++) {
		person[i] = {id: 'id'+i, name: 'NAME：'+i, age: i+10 }
	}
	setTimeout(function() {
		// res.status(500)
		// res.send({message: 'server mock error'})
		res.send(person)
	}, 1500)
})

app.get('/api/getFixedData', function(req, res) {
	setTimeout(function() {
		res.send(fixedTableData)
	}, 1500)
})

//删  id = ?
app.post('/api/del', function(req, res){
	for (var i = 0; i < person.length; i++){
		if(person[i].id === req.body.id) {
			person.splice(i, 1)
		}
	}
	res.send(getData());
})

app.post('/api/mockPull', function(req, res){
	person.unshift({ id: 'id' + person.length, name: person.length, age: person[0].age - 1 })
	setTimeout(function() {
		// res.send(person)
		res.status(500)
		res.send({message: 'server mock error'})
	}, 1000)
})

app.post('/api/mockFixedPull', function(req, res) {
	fixedTableData.unshift({
		id: fixedTableData.length,
		diskName:'磁盘'+fixedTableData.length,
		memory:'2T',
		column1:'3',
		column2:'4',
		column3:'5',
		column4:'6',
		column5:'7',
		column6:'8'
	})
	setTimeout(() => {
		res.send(fixedTableData);
	}, 1000)
})

app.post('/api/mockFixedPush', function(req, res) {
	for(var i=0; i < 7; i++) {
		fixedTableData.push({
			id: fixedTableData.length,
			diskName:'磁盘'+fixedTableData.length,
			memory:'2T',
			column1:'3',
			column2:'4',
			column3:'5',
			column4:'6',
			column5:'7',
			column6:'8'
		})
	}
	setTimeout(() => {
		res.send(fixedTableData);
	}, 1000)
})


//增
app.post('/api/save', function(req, res){
	var reqObj = req.body;
	person_id++
	person.push({ id: person_id, name: reqObj.name, age: reqObj.age })
	res.send(person);
})


app.post('/api/mockPush', function(req, res) {
	var len = person.length
	for (var i = len; i < len + 5; i++) {
		person_id++
		person.push({ id: 'id' + person_id, name: person_id, age: i })
	}
	setTimeout(() => {
		res.send(person);
	}, 1000)
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
