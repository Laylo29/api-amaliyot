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

function getAll(api) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(api);
        const data = yield res.json();
        return data;
    });
}
let elProductList = document.querySelector(".list");
let elCategoryList = document.querySelector(".category-list");
if (elProductList && elCategoryList) {
    elProductList.innerHTML = `loading....`;
    elCategoryList.innerHTML = `loading....`;
}
getAll("https://dummyjson.com/products").then((res) => getProducts(res));
getAll("https://dummyjson.com/products/categories").then((res) => getCategoryProduct(res));
function getProducts(list) {
    if (elProductList)
        elProductList.innerHTML = ``;
    list.products.map((item) => {
        let elItem = document.createElement("li");
        elItem.innerHTML = `
        <div class="w-[350px] text-white bg-pink-200 shadow-lg shadow-pink-200 p-2 rounded-lg overflow-hidden ">
            <img class="mb-2" src="${item.images[0]}" alt="Product img" width="350" height="200" />
            <div class="px-2 pb-2">
                <h2 class="font-bold mb-[5px] text-[22px] ">${item.title}</h2>
                <p class="font-medium line-clamp-2 mb-[5px]">${item.description}{</p>
                <div class="flex items-center justify-between">
                    <strong>${item.category}</strong>
                    <strong>${item.price}</strong>
                </div>
            </div>
        </div>
        `;
        elProductList === null || elProductList === void 0 ? void 0 : elProductList.appendChild(elItem);
    });
}
function getCategoryProduct(list) {
    if (elCategoryList)
        elCategoryList.innerHTML = ``;
    list.splice(0, 10).map((item) => {
        let elButton = document.createElement("button");
        elButton.textContent = item.name;
        elButton.classList =
            "p-2 rounded-md cursor-pointer duration-300 hover:scale-[1.1] bg-slate-600 shadow-md  shadow-slate-200 text-white font-semibold ";
        elCategoryList === null || elCategoryList === void 0 ? void 0 : elCategoryList.appendChild(elButton);
        elButton.addEventListener("click", () => {
            if (elProductList)
                elProductList.innerHTML = `<img class="scale-[1.4] mx-auto" src="./images/loading.gif" alt="loading" width="300" height="300" />`;
            getAll(`https://dummyjson.com/products/category/${item.slug}`).then((res) => getProducts(res));
        });
    });
}
//# sourceMappingURL=main.js.map