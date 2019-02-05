const fs  = require('fs');

requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    console.log(url);
   

    if(url === '/') {
        res.write('<html>');
        res.write('<title>This is assignment1 </title>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>');
        res.write('</html>');
       return  res.end();
    }
    if (url ==='/users'){
        res.write('<html>');
        res.write('<title>This is assignment1 </title>');
        res.write('<body><ul><li>User1</li><li>User2</li></ul></body>');
        res.write('</html>');
       return  res.end();
    }

    if(url === '/create-user' && method==="POST") {
        const body = [];
        req.on('data', (chunk) =>{
            body.push(chunk); //the stream chunk
        });
        req.on('end', () => {
           const parsedBody = Buffer.concat(body).toString();
           const message = parsedBody.split('=')[1];
           console.log(message);
           fs.appendFileSync('user.text', parsedBody);
        });
    }

    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<body><h1>Hello NodeJs Users</h1></body>');
    res.write('</html>');
    res.end();
}

module.exports = requestHandler;