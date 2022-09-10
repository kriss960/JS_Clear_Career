import { get, post, del, put } from "./api.js";

export async function getAllOffers(){
    return get('/data/offers?sortBy=_createdOn%20desc');
}
export async function getOfferById(id){
    return get('/data/offers/'+id);
}

export async function getOfferByOwner(ownerId){
    return get(`/data/offers?where=_ownerId%3D%22${ownerId}%22&sortBy=_createdOn%20desc`);
}

export async function updateOfferById(offer,id){
    return put('/data/offers/'+id,offer);
}

export async function isUserApplied(id,userId){
    return get(`/data/applications?where=offerId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function getApplicationsCount(id){
    return get(`/data/applications?where=offerId%3D%22${id}%22&distinct=_ownerId&count`);
}

export async function applyToOffer(id){
    return post(`/data/applications`,{bookId: id});
}


export async function createOffer(offer){
    return post('/data/offers', offer);
}

export async function deleteOffer(id){
    return del('/data/offers/'+id);
}