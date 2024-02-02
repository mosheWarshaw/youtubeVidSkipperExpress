import express from "express";
import multer from "multer";
import {compilePug} from "./js/general/compilePug.mjs";
import {getPage} from "./js/responses/get/getPage.mjs";
import {compiledHome, compiledAccount, compiledAdd, compiledContact} from "./js/general/compilePug.mjs";
import {checkIfLoggedIn} from "./js/general/checkIfLoggedIn.mjs";
import {postAccount} from "./js/responses/post/account/account.mjs";
import {getPlay} from "./js/responses/get/play.mjs";
import {checkAddForSqlInjection, insertVideo, insertSeconds, postAdd} from "./js/responses/post/add.mjs";
import {checkPlayForSqlInjection, postPlay} from "./js/responses/post/play.mjs";
import {postContact} from "./js/responses/post/contact/contact.mjs";

export {router};

const router = express.Router();
const formHandler = multer();
compilePug();


const getHome = getPage.bind({compiledPage: compiledHome});
router.get("/", getHome);
router.get("/home", getHome);

const getAccount = getPage.bind({compiledPage: compiledAccount});
router.get("/account", getAccount);
router.post("/account", formHandler.none(), postAccount);

const getAdd = getPage.bind({compiledPage: compiledAdd})
router.get("/add", checkIfLoggedIn, getAdd);
router.post("/add", checkIfLoggedIn, formHandler.none(), checkAddForSqlInjection, insertVideo, insertSeconds, postAdd);

router.get("/play", checkIfLoggedIn, getPlay);
router.post("/play", express.json(), checkIfLoggedIn, checkPlayForSqlInjection, postPlay);

const getContact = getPage.bind({compiledPage: compiledContact});
router.get("/contact", checkIfLoggedIn, getContact);
router.post("/contact", checkIfLoggedIn, formHandler.none(), postContact);