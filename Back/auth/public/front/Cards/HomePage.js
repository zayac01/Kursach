"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

import { createAdCard } from "./AdCard.js";
import { createAdFullView } from "./AdFullView.js";
import { setupInfiniteScroll } from "./InfiniteScroll.js";
import { setupFilter } from "./Filter.js";
let page = 1;
const pageSize = 10;
let filters = {};


// async function loadAds() {
//     try {
//         const queryParams = new URLSearchParams(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ page: String(page), pageSize: String(pageSize) }, (filters.brand && { brand: filters.brand })), (filters.priceFrom && { priceFrom: filters.priceFrom })), (filters.priceTo && { priceTo: filters.priceTo })), (filters.yearFrom && { yearFrom: filters.yearFrom })), (filters.yearTo && { yearTo: filters.yearTo })), (filters.mileageFrom && { mileageFrom: filters.mileageFrom })), (filters.mileageTo && { mileageTo: filters.mileageTo })), (filters.transmission && { transmission: filters.transmission })), (filters.driveType && { driveType: filters.driveType })), (filters.engineType && { engineType: filters.engineType })), (filters.engineVolumeFrom && { engineVolumeFrom: filters.engineVolumeFrom })), (filters.engineVolumeTo && { engineVolumeTo: filters.engineVolumeTo })), (filters.powerFrom && { powerFrom: filters.powerFrom })), (filters.powerTo && { powerTo: filters.powerTo })), (filters.fuelConsumptionFrom && { fuelConsumptionFrom: filters.fuelConsumptionFrom })), (filters.fuelConsumptionTo && { fuelConsumptionTo: filters.fuelConsumptionTo })), (filters.accelerationFrom && { accelerationFrom: filters.accelerationFrom })), (filters.accelerationTo && { accelerationTo: filters.accelerationTo })), (filters.ownersFrom && { ownersFrom: filters.ownersFrom })), (filters.ownersTo && { ownersTo: filters.ownersTo })), (filters.seats && { seats: filters.seats })), (filters.body && { body: filters.body })), (filters.steering && { steering: filters.steering })), (filters.color && { color: filters.color })));
//         const response = await fetch(`http://localhost:5500/ads?${queryParams}`);
//         if (!response.ok) {
//             throw new Error('Ошибка загрузки объявлений');
//         }
//         const ads = yield response.json();
//         console.log('Данные с бэкенда:', ads);
//         const adList = document.querySelector('.ad-list');
//         if (ads.length === 0)
//             return; // No more ads to load
//         ads.forEach(ad => {
//             const card = (0, createAdCard)(ad, () => showFullAd(ad));
//             adList === null || adList === void 0 ? void 0 : adList.appendChild(card);
//         });
//         page++;
//         return __awaiter(this, void 0, void 0, function* () {
//         });
//     } catch (error) {
//         console.log('loadAds ', error)
//     }
// }

async function loadAds() {
    try {
        const queryParams = new URLSearchParams({
            page: String(page),
            pageSize: String(pageSize),
            ...filters
        });
        const response = await fetch(`http://localhost:5500/ads?${queryParams}`);
        if (!response.ok) {
            throw new Error('Ошибка загрузки объявлений');
        }
        const ads = await response.json();
        console.log('Данные с бэкенда:', ads);
        const adList = document.querySelector('.ad-list');
        if (ads.length === 0) return; // No more ads to load
        ads.forEach(ad => {
            const card = createAdCard(ad, () => showFullAd(ad));
            adList?.appendChild(card);
        });
        page++;
    } catch (error) {
        console.error('loadAds ', error);
    }
}

function showFullAd(ad) {
    const fullView = (0, createAdFullView)(ad, () => fullView.remove());
    document.body.appendChild(fullView);
}
document.addEventListener('DOMContentLoaded', () => {
    const adList = document.createElement('div');
    adList.className = 'ad-list';
    adList.style.marginTop = '60px'; // Below header
    adList.style.display = 'flex';
    adList.style.flexWrap = 'wrap';
    adList.style.gap = '20px';
    document.body.appendChild(adList);
    (0, setupInfiniteScroll)(adList, loadAds);
    (0, setupFilter)((newFilters) => {
        filters = newFilters;
        page = 1;
        adList.innerHTML = '';
        loadAds();
    });
    loadAds(); // Initial load
});
