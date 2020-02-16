const i18n = require("i18n");
global = Object.assign(global, require("./global")(i18n));

const dotenv = require('dotenv').config();
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const xss = require('xss-clean');

const app = express();
const router = express.Router();

const routes = require("./routes");
const cloudinary = require("./cloudinary");
const locales = require("./locales")(i18n);
const transform = require("./transform");
const cookies = require("./cookies")(router, i18n);

/* Security */
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({limit: '1mb', extended: true}));
app.use(xss());

/* Setup EJS */
app.use(express.static(global.utils.dirPath));
app.set("views", path.join(global.utils.dirPath, "templates"));
app.set("view engine", "ejs");

app.use(cookies());
app.use(locales);

/* Routes */
/* Main router */
app.use('/', routes.home(router, cloudinary));

/* Front */
app.use('/back', routes.front.home(router));
app.use('/saints', routes.front.saints());
app.use('/cosmos', routes.front.cosmos());
app.use('/install-game', routes.front.installGame());

/* API */
app.use('/api', routes.API.saints());
app.use('/api', routes.API.tags());
app.use('/api', routes.API.skills());
app.use('/api', routes.API.cosmos());
app.use('/api', routes.API.controllers());
/* API Partials */
app.use('/api', routes.API.partials.addSkillSuggestionPriority());
app.use('/api', routes.API.partials.linkedModifiedSkill());
app.use('/api', routes.API.partials.autocompleteSuggestion());
app.use('/api', routes.API.partials.addThumbnailCosmoSuggestion());
app.use('/api', routes.API.partials.generateModal());
app.use('/api', routes.API.partials.addCosmosSuggestion());
app.use('/api', routes.API.partials.addSkillsSuggestion());
/* Back-end processes */
app.use('/api', routes.API.compositeImages());

/* Back */
app.use('/back', routes.back.home(router));

app.use('/back', routes.back.addCosmo());
app.use('/back', routes.back.editCosmo());
app.use('/back', routes.back.manageCosmos());

app.use('/back', routes.back.addSkill());
app.use('/back', routes.back.editSkill());
app.use('/back', routes.back.manageSkills());

app.use('/back', routes.back.addSaint());
app.use('/back', routes.back.editSaint());
app.use('/back', routes.back.manageSaints());

/* 404 */
app.use(function (req, res) {
    return res.status(404).render('exceptions/404');
});

/* Extends the app helpers functions with custom ones */
app.locals = Object.assign(app.locals, require("./helpers"));

module.exports = app;
