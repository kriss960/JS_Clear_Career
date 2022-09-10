import { getAllOffers } from '../api/offers.js';
import {html} from '../libs.js'

const offersTemplate = (offers) => html`
        <section id="dashboard">
          <h2>Job Offers</h2>

          <!-- Display a div with information about every post (if any)-->
        ${offers.length == 0 ? html `<h2>No offers yet.</h2>` 
        : offers.map(offerCard)}   
        </section>
`;

const offerCard = (offer) => html`
<div class="offer">
<img src=${offer.imageUrl} alt="example2" />
<p>
    <strong>Title: </strong
    ><span class="title">${offer.title}</span>
</p>
<p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
<a class="details-btn" href="/offer/${offer._id}">Details</a>
</div>
`;

export async function offersView(ctx){
    const offers = await getAllOffers();
    ctx.render(offersTemplate(offers));
}