"use strict";
// 1
// function userLists(){
//     let requist = new XMLHttpRequest();

//     requist.addEventListener("load", function() {
//         let textPasuxi = this.responseText;
//         let pasuxiJs = JSON.parse(textPasuxi);

//         let ul = document.createElement("ul");

//         pasuxiJs.data.forEach(element => {
//         let li = document.createElement('li');
//         li.textContent = `${element.name} ${element.year}`;
//         ul.appendChild(li);
//     });
       
//        document.getElementById("userinformation").appendChild(ul);
//     });


//     requist.addEventListener("error", function(){
//         let p = document.createElement("p");
//         p.textContent = "Page Not Found";

//         document.getElementById("userinformation").appendChild(p);
//     });
//     requist.open("GET", "https://reqres.in/api/unknown");
//     requist.send();
// };

// userLists();

// <<<<<<<<<< მუშაობს იდეალურად >>>>>>>>>>




// Fetch < method 



let currentPage = 1;
let totalPages;

function getUsersFunction(page) {
    fetch("https://reqres.in/api/users?page=2" +  page, {
        method: "GET",
    })
    .then(function (responsetextinfo) {
        if (responsetextinfo.status !== 200){
            throw responsetextinfo.status;
        }
        return responsetextinfo.json();
    })
    .then(function (resposnseJsData) {
        const fragment = new DocumentFragment();


        resposnseJsData.data.foreach((element) => {
            let li = document.createElement("li");
            let img = document.createElement("img");
            img.classList.add("src");
            li.textContent = `${element.first_name} ${element.last_name}`
            fragment.appendChild(li);
        });
        document.getElementById("users-list").innerHTML = " ";
        document.getElementById("users-list").appendChild(fragment);
        totalPages = resposnseJsData.total_pages;
    })
    .catch(function (error) {
        if(error == 404) {
            let p = document.createElement("p");
            p.textContent = "Page Not found";

            document.getElementById("userinformation").appendChild(p);
        }
        else if (error == 500) {
            let p = document.createElement("p");
            p.textContent = "Server Error";

            document.getElementById("userinformation").appendChild(p);
        }
    });
}

document.getElementById('loadprevius').addEventListener('click', function() {
    if (currentPage == 1) {
      return;
    }
    currentPage -= 1;
    getUsersFunction(currentPage);
  })
  
  document.getElementById('loadnext').addEventListener('click', function() {
    if (currentPage == totalPages) {
      return;
    };
    currentPage += 1;
    getUsersFunction(currentPage);
  })
  
  getUsersFunction(currentPage);



