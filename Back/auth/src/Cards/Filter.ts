export function setupFilter(onFilter: (filters: any) => void) {
    const filterButton = document.querySelector('.ready-btn-block button');
    filterButton?.addEventListener('click', () => {
      const filters = {
        brand: (document.querySelector('.filter-type-1 input[placeholder="Любая"]') as HTMLInputElement)?.value || '',
        priceFrom: (document.querySelector('.filter-type-2 input[placeholder="От"]') as HTMLInputElement)?.value || '',
        priceTo: (document.querySelectorAll('.filter-type-2 input[placeholder="До"]')[0] as HTMLInputElement)?.value || '',
        yearFrom: (document.querySelectorAll('.filter-type-2 input[placeholder="От"]')[1] as HTMLInputElement)?.value || '',
        yearTo: (document.querySelectorAll('.filter-type-2 input[placeholder="До"]')[1] as HTMLInputElement)?.value || '',
        mileageFrom: (document.querySelectorAll('.filter-type-2 input[placeholder="От"]')[2] as HTMLInputElement)?.value || '',
        mileageTo: (document.querySelectorAll('.filter-type-2 input[placeholder="До"]')[2] as HTMLInputElement)?.value || '',
        transmission: (document.querySelectorAll('.filter-type-1 input[placeholder="Любая"]')[1] as HTMLInputElement)?.value || '',
        driveType: (document.querySelectorAll('.filter-type-1 input[placeholder="Любая"]')[2] as HTMLInputElement)?.value || '',
        engineType: (document.querySelectorAll('.filter-type-1 input[placeholder="Любая"]')[3] as HTMLInputElement)?.value || '',
        engineVolumeFrom: (document.querySelectorAll('.filter-type-2 input[placeholder="От"]')[3] as HTMLInputElement)?.value || '',
        engineVolumeTo: (document.querySelectorAll('.filter-type-2 input[placeholder="До"]')[3] as HTMLInputElement)?.value || '',
        powerFrom: (document.querySelectorAll('.filter-type-2 input[placeholder="От"]')[4] as HTMLInputElement)?.value || '',
        powerTo: (document.querySelectorAll('.filter-type-2 input[placeholder="До"]')[4] as HTMLInputElement)?.value || '',
        fuelConsumptionFrom: (document.querySelectorAll('.filter-type-2 input[placeholder="От"]')[5] as HTMLInputElement)?.value || '',
        fuelConsumptionTo: (document.querySelectorAll('.filter-type-2 input[placeholder="До"]')[5] as HTMLInputElement)?.value || '',
        accelerationFrom: (document.querySelectorAll('.filter-type-2 input[placeholder="От"]')[6] as HTMLInputElement)?.value || '',
        accelerationTo: (document.querySelectorAll('.filter-type-2 input[placeholder="До"]')[6] as HTMLInputElement)?.value || '',
        ownersFrom: (document.querySelectorAll('.filter-type-2 input[placeholder="От"]')[7] as HTMLInputElement)?.value || '',
        ownersTo: (document.querySelectorAll('.filter-type-2 input[placeholder="До"]')[7] as HTMLInputElement)?.value || '',
        seats: (document.querySelectorAll('.filter-type-1 input[placeholder="Любая"]')[4] as HTMLInputElement)?.value || '',
        body: (document.querySelectorAll('.filter-type-1 input[placeholder="Любая"]')[5] as HTMLInputElement)?.value || '',
        steering: (document.querySelectorAll('.filter-type-1 input[placeholder="Любая"]')[6] as HTMLInputElement)?.value || '',
        color: (document.querySelectorAll('.filter-type-1 input[placeholder="Любая"]')[7] as HTMLInputElement)?.value || ''
      };
      onFilter(filters);
    });
  }