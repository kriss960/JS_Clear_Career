import { logout } from './api/users.js';
import {page, render} from './libs.js';
import { getUserData } from './util.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { offersView } from './views/offers.js';
import { registerView } from './views/register.js';


//get the main element
const main = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click',onLogout);

page(addToContext);
page('/', homeView);
page('/offers', offersView);
page('/register', registerView);
page('/login', loginView);
page('/create', createView);
page('/offer/:id', detailsView);
page('/edit/:id', editView);

//Start Application
updateNav();
page.start();

function addToContext(ctx, next){
    ctx.render = renderMain;
    ctx.updateNav = updateNav;
    next();
}

function renderMain(tempalte){
    render(tempalte,main);
}

function updateNav(){
    const user = getUserData();

    if(user){
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';       
    }else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

function onLogout(){
    logout();
    updateNav();
    page.redirect('/offers');
}