import { applyToOffer, deleteOffer, getApplicationsCount, getOfferById, isUserApplied } from '../api/offers.js';
import {html} from '../libs.js'
import { getUserData } from '../util.js';

const detailsTemplate = (offer,totalApplications, isOwner,ableToApply,onDelete,onApply) => html`
<section id="details">
    <div id="details-wrapper">
    <img id="details-img" src=${offer.imageUrl} alt="example1" />
    <p id="details-title">${offer.title}</p>
    <p id="details-category">
        Category: <span id="categories">${offer.category}</span>
    </p>
    <p id="details-salary">
        Salary: <span id="salary-number">${offer.salary}</span>
    </p>
    <div id="info-wrapper">
        <div id="details-description">
            <h4>Description</h4>
            <span>${offer.description}</span>
        </div>
        <div id="details-requirements">
        <h4>Requirements</h4>
        <span
            >${offer.requirements}</span
        >
        </div>
    </div>
    <p>Applications: <strong id="applications">${totalApplications}</strong></p>

    <!--Edit and Delete are only for creator-->
    <div id="action-buttons">
    ${isOwner ? html `<a href="/edit/${offer._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : ''} 

        <!--Bonus - Only for logged-in users ( not authors )-->
        ${(ableToApply) ? html `<a @click=${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>` : ""}         
    </div>
    </div>
</section>
`;

export async function detailsView(ctx){
    const offer = await getOfferById(ctx.params.id);
    const totalApplications  =  await getApplicationsCount(ctx.params.id);
    const user = getUserData();
    const isOwner = offer._ownerId == user?.id
    let ableToApply = false;

    if(user && !isOwner){
        ableToApply = await isUserApplied(ctx.params.id,user.id) == 0;
    }

    ctx.render(detailsTemplate(offer,totalApplications,isOwner,ableToApply,onDelete,OnApply));

    async function onDelete(){
        if(confirm('Are you sure?')){
            await deleteOffer(ctx.params.id);
            ctx.page.redirect('/offers')
        }
    }

    async function OnApply(){
        await applyToOffer(ctx.params.id);
        ctx.render(detailsTemplate(offer,totalApplications+1,isOwner,false,onDelete,OnApply));
    }
}

