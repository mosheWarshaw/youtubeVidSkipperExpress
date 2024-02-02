export {getPage};

function getPage(req, res){
    res.send(this.compiledPage);
}