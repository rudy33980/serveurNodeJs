const { createServer } = require("node:http");
const fs = require("node:fs");
const { join } = require("node:path");
const { parse } = require("node:url");
const { log } = require("node:console");
const port = 8000;

const server = createServer((req, res) => {
  const urlPath = parse(req.url).path;
  if (urlPath === "" || urlPath === "/" || urlPath === "/index.html") {
    const filePath = join(__dirname, "../views/index.html");
    fs.readFile(filePath, (err, data) =>
      res.writeHead(200, { "Content-Type": "text/html" }).end(data)
    );
    // on va cherché le fichier à l'adresse , on le met dans la variable data et on l'envoie au client
  } else {
    const formData = parse(req.url, true).query
    res.writeHead(200, {"Content-Type": "text/plain"})
    res.end(`You ordered ${formData.quantity} ${formData.fruit} !`);
  }
});

server.listen(port, () => console.log("Listening on http://localhost:" + port));
