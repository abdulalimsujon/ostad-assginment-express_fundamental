


var express = require('express');
const res = require('express/lib/response');
var multer = require('multer');

const path = require("path");

const app = express();


app.use(express.static('public'));



app.post('/user', function (req, res) {
    const FirstName = req.query.FirstName;
    const LastName = req.query.LastName;

    res.send('First Name:' + FirstName + 'Last Name:' + LastName);

});

app.get('/user', function (req, res) {
    const FirstName = req.query.FirstName;
    const LastName = req.query.LastName;

    res.send({ 'First Name': FirstName, "Last Name": LastName })

});

app.post('/UserByHeader', function (req, res) {
    const FirstName = req.header("FirstName");
    const LastName = req.header("LastName");

    res.send('First Name:' + FirstName + 'Last Name:' + LastName);

});

app.get('/', function (req, res) {

    res.send('everything is ok')

})
app.post('/', function (req, res) {

    res.send('everything is ok')

})

// file download API

app.get('/downloadimage', function (req, res) {

    res.download('./uploads/fnd.jpg');


})

// upload png and jpg file  

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log('file ==>', file);
        cb(null, path.join(__dirname, "uploads"))
    }
}
)
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        // console.log(path)
        var ext = path.extname(file.originalname);
        if (ext === '.png' || ext === '.jpg') {
            callback(null, true)



        } else {
            callback(new Error('Only jpg and png images are allowed'))
        }


    },
}).single('mypic');

app.post('/uploadfile', function (req, res) {

    upload(req, res, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Image was uploaded");
        }
    })


})

// post multipart data 

app.post('/multipart', (req, res) => {
    const body = req.body;
    res.send(JSON.stringify(body))
})



app.listen(8000, function () {
    console.log('app is running on port ', 8000);
})