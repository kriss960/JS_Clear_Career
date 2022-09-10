import { register } from '../api/users.js';
import {html} from '../libs.js';

const registerTemplate = (onSubmit) => html`
<section id="register">
    <div class="form">
    <h2>Register</h2>
    <form @submit=${onSubmit} class="login-form">
        <input
        type="text"
        name="email"
        id="register-email"
        placeholder="email"
        />
        <input
        type="password"
        name="password"
        id="register-password"
        placeholder="password"
        />
        <input
        type="password"
        name="re-password"
        id="repeat-password"
        placeholder="repeat password"
        />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
    </form>
    </div>
</section>
`;

export function registerView(ctx){
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(ev){
        ev.preventDefault();
        const formData = new FormData(ev.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('re-password').trim();

        if(email == '' || password == ''){
            return alert('All field are required');
        }

        if(password != repass){
            return alert('Passswords dont maatch');
        }

        await register(email,password);
        ctx.updateNav();
        ctx.page.redirect('/offers');
    }
}