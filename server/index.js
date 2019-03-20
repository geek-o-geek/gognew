const fs = require("fs")
const Joi = require('joi')
const express = require('express')
const app = express();

const { posts } = require('./posts')
const POST_FOLDER = '/posts/' 

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
        cred_mail : 'arjun.sisodia8@gmail.com',
        cred_password: '9971468852@',
        sender_mail: email,
        receiver_mail: 'arjun.sisodia8@gmail.com',
        subject: `Enquiry: ${name}`,
        email_body: subject ,
        is_html: 0
    }
    mail.send_mail(objct)

    /* ends */

      /* sending to potential customer */
      const { thankyou_mail } = require("./thankyou_mail");
      
      const objctt = {
        cred_mail : 'arjun.sisodia8@gmail.com',
        cred_password: '9971468852@',
        sender_mail: 'arjun.sisodia8@gmail.com',
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
    res.status(200).send('Successfully posted')
    writestream.on('close', () => {
        console.log('all done')
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is listening at port ${PORT}`))