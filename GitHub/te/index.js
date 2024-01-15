import express from "express";
import fs from "fs/promises";

const app = express();

//På startsidan står det "Hello world"
app.get('/', async (request, response) => {             
  const buf = await fs.readFile("./static/index.html");
  /* console.log(buf); */

  const html = buf.toString();
  response.send(html);
});


 //Skriver man in /conny står det Hello conny
/* app.get('/conny', async (request, response) => {        
  const buf = await fs.readFile('./static/index.html');
  const html  = buf.toString();

  const changed = html.replace('world', 'conny');

  response.send(changed);
}); */


//Ändrar man '/conny' till '/:name' betyder det att request-objektet (dvs conny) kommer att ha request.params.name

app.get('/:name', async (request, response) => {
  const buf  = await fs.readFile('./static/index.html');
  const html = buf.toString();

  const changed = html.replace('world', request.params.name);
  response.send(changed);
});

app.use("/static", express.static("./static")); //ändrade till /static här och i html.index  
app.listen(3080);                               //för att hitta main.css  
//kan vara app.get istället för use