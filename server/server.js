const fs = require("fs")
const Joi = require('joi')
const jwt = require("jsonwebtoken")
const express = require('express')
const app = express();

const { posts } = require('./posts')
const utils = require("./utils.js")
const { POST_FOLDER, ADMIN_USER, ADMIN_PASS, ADMIN_MAIL, ADMIN_MAIL_PASS, SECRET_KEY, UNAUTHORISED } = utils

app.use(express.json())

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if ('OPTIONS' == req.method) {
           res.sendStatus(200);
        }
        else {
           next();
        }
}); 

/* login for post creator */
app.post('/api/login', (req, res) => { 
    const { username, password } = req.body
    if(username == ADMIN_USER && password == ADMIN_PASS){
        const token = jwt.sign({ username: username, password: password }, SECRET_KEY)
        res.status(200).send({token: token})
    }else{
        res.status(201).send(UNAUTHORISED)
    }
})

/* contact form mailer*/
app.post('/api/contact', (req, res) =>{
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        subject: Joi.string().required()
    }
    const { error } = Joi.validate(req.body, schema)
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }

    const {name, email, subject} = req.body;
    
    const mail = require("./send_mail");
    /* sending to admin */
    const objct = {
        cred_mail : ADMIN_MAIL,
        cred_password: ADMIN_MAIL_PASS,
        sender_mail: email,
        receiver_mail: ADMIN_MAIL,
        subject: `Enquiry: ${name}`,
        email_body: subject ,
        is_html: 0
    }
    mail.send_mail(objct)

    /* ends */

      /* sending to potential customer */
      const { thankyou_mail } = require("./thankyou_mail");
      
      const objctt = {
        cred_mail : ADMIN_MAIL,
        cred_password: ADMIN_MAIL_PASS,
        sender_mail: ADMIN_MAIL,
        receiver_mail: email,
        subject: `Thankyou ${name} from geekOstack`,
        email_body: thankyou_mail.toString(),
        is_html: 1
    }
    const resultt = mail.send_mail(objctt)
    if(resultt)
        res.status(200).send("Mail sent")
    else
        res.status(400).send('Mail not sent')
      /* ends */
})

/* get topics list by course */
app.get('/api/gettopics/:topic', (req, res) => {
    const topic = req.params.topic.toLowerCase();
    const result = posts[topic];
    if(!result) {
        const no_result = { uri: "noresult", highlight: "Nothing matches, please use keywords to refine your search..."}
        return res.status(404).send(no_result)
    }
    res.status(200).send(result);
})

/* get topics list by course */
app.get('/api/searchresult/:searchterm', (req, res) => { 
    const searchterm = req.params.searchterm.toLowerCase();
    let arr = [] 
    for(let key in posts){
        let value = posts[key]
        value.forEach(obj => obj['type'] = key)
        arr.push(...value)
    }   
    let result = []
    arr.forEach(obj => {
        if(obj.highlight.indexOf(searchterm) >= 0)
            result.push(obj)
    })
    if(result.length == 0) {
        const no_result = [{ uri: "noresult", highlight: "No result found" }]
        return res.status(200).send(no_result)
    }
    res.status(200).send(result);
})


/* get specific topic by id */
app.get('/api/gettopics/:topic/:id', (req, res) => {
    const topic = req.params.topic.toLowerCase();
    const post = posts[topic].find(p => p.id === parseInt(req.params.id))
    if(!post) {
        return res.status(404).send("Not found")
    }
    const file = `./posts/${post.uri}.json`

    const stream = fs.createReadStream(file, {encoding: 'utf8'});
    let data = ''
    stream.on('data', (chunks) => {
        res.send(chunks)
    })
    stream.on('error', (err) => {
        console.log(err)
    })
    stream.on('end', () => {
        console.log(`File streaming ended`)
    })
})

/* create a post */
app.post('/api/createpost', (req, res) => {
    const schema = {
        heading: Joi.string().required(),
        tags: Joi.required(),
        content: Joi.string().required()
    }
    const { error } = Joi.validate(req.body, schema)
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }

    const file = `./posts/${req.body.heading}.json`
    const writestream = fs.createWriteStream(file, {flags: 'w'})

    writestream.write(JSON.stringify(req.body));
    writestream.end('');
    
    writestream.on('close', () => {
        console.log('all done')
    })

    const { heading, tags, content } = req.body
    let tagBasedPosts = posts[tags] || []
    let length = tagBasedPosts.length

    let pushObj = { 
        id: length+1, 
        uri: heading, 
        highlight: content.substr(0, Math.floor(content.length/3)) 
    } 
    
    tagBasedPosts.push(pushObj)   

    let obj = Object.assign({}, posts)
    obj[tags] = tagBasedPosts
    obj = JSON.stringify(obj)

    const str = `let posts = ${obj}
    module.exports = {'posts': posts}`

    fs.writeFile('posts.js', str, function(){console.log('done')})   
    res.status(200).send('Successfully posted')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is listening at port ${PORT}`))