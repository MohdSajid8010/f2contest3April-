
const url = "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";

async function getmenu() {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    // console.log(data.length); 25
    // console.log( data[0].name);
    showData(data);//arr

    return data;


}


let menuEl = document.getElementById("menu_");
function showData(arr) {

    menuEl.innerHTML = "";
    arr.forEach(obj => {
       menuEl.innerHTML+=` <div class="item">
                <img src="${obj.imgSrc}" alt="">
               <div class="name">
               <div>${obj.name}</div>
               <div>$${obj.price}</div>
               </div>
            </div>`

    });
}

function rand_no(n) {
    return Math.floor(Math.random() * n);
}

function takeOrder(data_meals) {
    let promise = new Promise((resolve, reject) => {
        console.log("\ntaking order...");
        setTimeout(() => {
            let n = data_meals.length;
            let bg1 = data_meals[rand_no(n)];
            let bg2 = data_meals[rand_no(n)];

            let bg3 = data_meals[rand_no(n)];

            let obj = {
                burger1: bg1,
                burger2: bg2,
                burger3: bg3
            };

            resolve(obj);
        }, 2500)
    })
    return promise;
}

function orderPrep(ord_obj) {

    let promise = new Promise((resolve, reject) => {
        console.log("\norder is being prepare...");
        setTimeout(() => {
            ord_obj.order_status = true;
            resolve(ord_obj)
        }, 1500);
    })
    return promise;
}

function payOrder(ord_obj) {
    let promise = new Promise((resolve, reject) => {
        console.log("\ntaking payment...");
        setTimeout(() => {
            ord_obj.paid = true;
            resolve(ord_obj);
        }, 1000)
    })
    return promise;
}

function thankyouFnc() {
    console.log("thankyou for eating with us today!");
    alert("\nthankyou for eating with us today!");
}

async function async_code() {

    try {

        let data_meals = await getmenu();
        // console.log(data_meals);
        let randomBurgorObj = await takeOrder(data_meals);
        console.log("order is:", randomBurgorObj);


        let ord_obj = { order_status: false, paid: false };

        ord_obj = await orderPrep(ord_obj);
        console.log(ord_obj);

        ord_obj = await payOrder(ord_obj);
        console.log(ord_obj);


        if (ord_obj.paid == true) {

            thankyouFnc();
        }
    } catch(err) {

        console.log("something went wrong!",err);
    }

}
// async_code();

document.getElementById("btn").addEventListener("click", async_code);