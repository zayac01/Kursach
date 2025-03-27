import { Ad } from './Ad';
  import { createAdCard } from './AdCard';
  import { createAdFullView } from './AdFullView';
  import { setupInfiniteScroll } from './InfiniteScroll';
  import { setupFilter } from './Filter';
  
  let page = 1;
  const pageSize = 10;
  let filters: any = {};
  
  async function loadAds() {
    const queryParams = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      ...(filters.brand && { brand: filters.brand }),
      ...(filters.priceFrom && { priceFrom: filters.priceFrom }),
      ...(filters.priceTo && { priceTo: filters.priceTo }),
      ...(filters.yearFrom && { yearFrom: filters.yearFrom }),
      ...(filters.yearTo && { yearTo: filters.yearTo }),
      ...(filters.mileageFrom && { mileageFrom: filters.mileageFrom }),
      ...(filters.mileageTo && { mileageTo: filters.mileageTo }),
      ...(filters.transmission && { transmission: filters.transmission }),
      ...(filters.driveType && { driveType: filters.driveType }),
      ...(filters.engineType && { engineType: filters.engineType }),
      ...(filters.engineVolumeFrom && { engineVolumeFrom: filters.engineVolumeFrom }),
      ...(filters.engineVolumeTo && { engineVolumeTo: filters.engineVolumeTo }),
      ...(filters.powerFrom && { powerFrom: filters.powerFrom }),
      ...(filters.powerTo && { powerTo: filters.powerTo }),
      ...(filters.fuelConsumptionFrom && { fuelConsumptionFrom: filters.fuelConsumptionFrom }),
      ...(filters.fuelConsumptionTo && { fuelConsumptionTo: filters.fuelConsumptionTo }),
      ...(filters.accelerationFrom && { accelerationFrom: filters.accelerationFrom }),
      ...(filters.accelerationTo && { accelerationTo: filters.accelerationTo }),
      ...(filters.ownersFrom && { ownersFrom: filters.ownersFrom }),
      ...(filters.ownersTo && { ownersTo: filters.ownersTo }),
      ...(filters.seats && { seats: filters.seats }),
      ...(filters.body && { body: filters.body }),
      ...(filters.steering && { steering: filters.steering }),
      ...(filters.color && { color: filters.color })
    });
    const response = await fetch(`http://localhost:5500/ads?${queryParams}`);
    if (!response.ok) throw new Error('Ошибка загрузки объявлений');
    const ads: Ad[] = await response.json();
    const adList = document.querySelector('.ad-list');
    if (ads.length === 0) return; // No more ads to load
    ads.forEach(ad => {
      const card = createAdCard(ad, () => showFullAd(ad));
      adList?.appendChild(card);
    });
    page++;
  }
  
  function showFullAd(ad: Ad) {
    const fullView = createAdFullView(ad, () => fullView.remove());
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
  
    setupInfiniteScroll(adList, loadAds);
    setupFilter((newFilters) => {
      filters = newFilters;
      page = 1;
      adList.innerHTML = '';
      loadAds();
    });
  
    loadAds(); // Initial load
  });