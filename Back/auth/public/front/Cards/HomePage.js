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
        console.log('Данные с бэка:', ads);
        const adList = document.querySelector('.offers');
        if (!adList) {
            console.error('.offers нету');
            return;
        }
        if (ads.length === 0) return; // Если нет картОЧЕК, то не грузит снова ------- NONE WORKING?
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
    const section = document.createElement('section');
    section.className = 'cards';

    const container = document.createElement('div');
    container.className = 'container';

    const offers = document.createElement('div');
    offers.className = 'offers';
    // offers.style.display = 'flex';
    // offers.style.flexWrap = 'wrap';
    // offers.style.gap = '20px';

    container.appendChild(offers);
    section.appendChild(container);
    document.body.appendChild(section);

    setupInfiniteScroll(offers, loadAds);
    setupFilter((newFilters) => {
        filters = newFilters;
        page = 1;
        offers.innerHTML = '';
        loadAds();
    });
    loadAds();
});
