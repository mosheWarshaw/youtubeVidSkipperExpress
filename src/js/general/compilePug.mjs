import pug from  "pug";
export {
    compilePug,
    compiledHomeFunc,
    compiledHome,
    compiledAccountFunc,
    compiledAccount,
    compiledPlayFunc,
    compiledPlay,
    compiledAddFunc,
    compiledAdd,
    compiledContactFunc,
    compiledContact,
    compiledRedirectMessage
};

let compiledHomeFunc;
let compiledHome;
let compiledAccountFunc;
let compiledAccount;
let compiledPlayFunc;
let compiledPlay;
let compiledAddFunc;
let compiledAdd;
let compiledContactFunc;
let compiledContact;
let compiledRedirectMessage;

function compilePug(){
    compiledHomeFunc = pug.compileFile("pug/home.pug");
    compiledHome = compiledHomeFunc();
    compiledAccountFunc = pug.compileFile("pug/account.pug");
    compiledAccount = compiledAccountFunc();
    compiledPlayFunc = pug.compileFile("pug/play.pug");
    compiledPlay = compiledPlayFunc();
    compiledAddFunc = pug.compileFile("pug/add.pug");
    compiledAdd = compiledAddFunc();
    compiledContactFunc = pug.compileFile("pug/contact.pug");
    compiledContact = compiledContactFunc();
    compiledRedirectMessage = pug.compileFile("pug/redirectMessage.pug")();
}