"use strict";
export function setupFilter(onFilter) {
    const filterButton = document.querySelector('.ready-btn-block button');
    filterButton === null || filterButton === void 0 ? void 0 : filterButton.addEventListener('click', () => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
        const filters = {
            brand: ((_a = document.querySelector('.filter-type-1 input[placeholder="Любая"]')) === null || _a === void 0 ? void 0 : _a.value) || '',
            priceFrom: ((_b = document.querySelector('.filter-type-2 input[placeholder="От"]')) === null || _b === void 0 ? void 0 : _b.value) || '',
            priceTo: ((_c = document.querySelectorAll('.filter-type-2 input[placeholder="До"]')[0]) === null || _c === void 0 ? void 0 : _c.value) || '',
            yearFrom: ((_d = document.querySelectorAll('.filter-type-2 input[placeholder="От"]')[1]) === null || _d === void 0 ? void 0 : _d.value) || '',
            yearTo: ((_e = document.querySelectorAll('.filter-type-2 input[placeholder="До"]')[1]) === null || _e === void 0 ? void 0 : _e.value) || '',
            mileageFrom: ((_f = document.querySelectorAll('.filter-type-2 input[placeholder="От"]')[2]) === null || _f === void 0 ? void 0 : _f.value) || '',
            mileageTo: ((_g = document.querySelectorAll('.filter-type-2 input[placeholder="До"]')[2]) === null || _g === void 0 ? void 0 : _g.value) || '',
            transmission: ((_h = document.querySelectorAll('.filter-type-1 input[placeholder="Любая"]')[1]) === null || _h === void 0 ? void 0 : _h.value) || '',
            driveType: ((_j = document.querySelectorAll('.filter-type-1 input[placeholder="Любая"]')[2]) === null || _j === void 0 ? void 0 : _j.value) || '',
            engineType: ((_k = document.querySelectorAll('.filter-type-1 input[placeholder="Любая"]')[3]) === null || _k === void 0 ? void 0 : _k.value) || '',
            engineVolumeFrom: ((_l = document.querySelectorAll('.filter-type-2 input[placeholder="От"]')[3]) === null || _l === void 0 ? void 0 : _l.value) || '',
            engineVolumeTo: ((_m = document.querySelectorAll('.filter-type-2 input[placeholder="До"]')[3]) === null || _m === void 0 ? void 0 : _m.value) || '',
            powerFrom: ((_o = document.querySelectorAll('.filter-type-2 input[placeholder="От"]')[4]) === null || _o === void 0 ? void 0 : _o.value) || '',
            powerTo: ((_p = document.querySelectorAll('.filter-type-2 input[placeholder="До"]')[4]) === null || _p === void 0 ? void 0 : _p.value) || '',
            fuelConsumptionFrom: ((_q = document.querySelectorAll('.filter-type-2 input[placeholder="От"]')[5]) === null || _q === void 0 ? void 0 : _q.value) || '',
            fuelConsumptionTo: ((_r = document.querySelectorAll('.filter-type-2 input[placeholder="До"]')[5]) === null || _r === void 0 ? void 0 : _r.value) || '',
            accelerationFrom: ((_s = document.querySelectorAll('.filter-type-2 input[placeholder="От"]')[6]) === null || _s === void 0 ? void 0 : _s.value) || '',
            accelerationTo: ((_t = document.querySelectorAll('.filter-type-2 input[placeholder="До"]')[6]) === null || _t === void 0 ? void 0 : _t.value) || '',
            ownersFrom: ((_u = document.querySelectorAll('.filter-type-2 input[placeholder="От"]')[7]) === null || _u === void 0 ? void 0 : _u.value) || '',
            ownersTo: ((_v = document.querySelectorAll('.filter-type-2 input[placeholder="До"]')[7]) === null || _v === void 0 ? void 0 : _v.value) || '',
            seats: ((_w = document.querySelectorAll('.filter-type-1 input[placeholder="Любая"]')[4]) === null || _w === void 0 ? void 0 : _w.value) || '',
            body: ((_x = document.querySelectorAll('.filter-type-1 input[placeholder="Любая"]')[5]) === null || _x === void 0 ? void 0 : _x.value) || '',
            steering: ((_y = document.querySelectorAll('.filter-type-1 input[placeholder="Любая"]')[6]) === null || _y === void 0 ? void 0 : _y.value) || '',
            color: ((_z = document.querySelectorAll('.filter-type-1 input[placeholder="Любая"]')[7]) === null || _z === void 0 ? void 0 : _z.value) || ''
        };
        onFilter(filters);
    });
}
