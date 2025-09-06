const url = "https://cab471f3a833235def30.free.beeceptor.com/api/users/";

let originalData = null;
let id = null;
let action = "POST";

//clear form
function clearForm() {
  document.getElementById("product").value = "";
  document.getElementById("price").value = "";
}

//GET (Read)
function getData() {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      action = "POST";
      id = null;
      originalData = JSON.parse(JSON.stringify(data));
      genTable(data);
    });

  function genTable(data) {
    let str = "";

    data.forEach((ele) => {
      str += `<tr>
                     <td>${ele.name}</td>
                     <td>${ele.price}</td>
                     <td><button class='modify' data-id=${ele.id}  data-action= 'PATCH'>Change Price</button></td>
                     <td><button class='delete' data-id=${ele.id}  data-action= 'DELETE'>Remove Item</button></td>
                    </tr>`;
    });

    document.querySelector("tbody").innerHTML = str;
  }
}

getData();

//POST (Create)
function submitData(e) {
  e.preventDefault();
  const product = document.getElementById("product").value;
  const price = document.getElementById("price").value;

  if (action === "POST") {
    //POST
    const payload = JSON.stringify({
      price: price,
      name: product,
    });

    fetch(url, {
      method: "POST",
      body: payload,
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        getData();
        clearForm();
      });
  } else if (action === "PATCH") {
    //PATCH
    const payload = JSON.stringify({
      price: price,
      name: product,
    });

    fetch(`${url}${id}`, {
      method: "PATCH",
      body: payload,
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        getData();
        clearForm();
      });
  }
}
const form = document.querySelector("form");
form.addEventListener("submit", submitData);

const tbody = document.querySelector("tbody");

tbody.addEventListener("click", function (e) {
  id = e.target.getAttribute("data-id");
  action = e.target.getAttribute("data-action");
  const selectedData = originalData.find((ele) => ele.id === id);
  if (action === "PATCH") {
    document.getElementById("product").value = selectedData.name;
    document.getElementById("price").value = selectedData.price;
  } else if (action === "DELETE") {
    fetch(`${url}${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        getData();
        clearForm();
      });
  }
});
