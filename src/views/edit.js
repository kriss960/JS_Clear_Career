import { getOfferById, updateOfferById } from '../api/offers.js';
import {html} from '../libs.js';

const editTemplate = (offer, onSubmit) => html`
        <section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
                .value=${offer.title}
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
                .value=${offer.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
                .value=${offer.category}
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
                .value=${offer.description}
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
                .value=${offer.requirements}
              ></textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
                .value=${offer.salary}
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

export async function editView(ctx){
    const offer = await getOfferById(ctx.params.id);
    ctx.render(editTemplate(offer, onSubmit));

    async function onSubmit(ev){
        ev.preventDefault();
        const formData = new FormData(ev.target);

        const title = formData.get('title').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const category = formData.get('category').trim();
        const description = formData.get('description').trim();
        const requirements = formData.get('requirements').trim();
        const salary = formData.get('salary').trim();
        

        if(title == '' || description == '' || imageUrl == ''
            || category == '' || requirements == '' || salary == ''){
            return alert('All field are required');
        }

        await updateOfferById({title,imageUrl,category,description,requirements,salary},ctx.params.id);
        ev.target.reset();
        ctx.page.redirect('/offer/'+ctx.params.id);
    }
}