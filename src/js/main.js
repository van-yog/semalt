"use strict";

let response = {
  result: {
    sitemap: [
      {
        path: "http://savetubevideo.com/sitemap.xml",
        lastSubmitted: "2019-06-07T08:48:32.279Z",
        lastCheck: "2019-06-08T09:12:11.123Z",
        urls: 10000000,
        isPending: true,
        isSitemapsIndex: true,
        warnings: 0,
        errors: 0,
      },
      {
        path: "http://savetubevideo.com/video.xml",
        lastSubmitted: "2019-12-06T09:31:43.263Z",
        lastCheck: "2019-06-09T06:56:32.333Z",
        urls: 20000,
        isPending: true,
        isSitemapsIndex: false,
        warnings: 6,
        errors: 10,
      },
      {
        path: "http://savetubevideo.com/test.php",
        lastSubmitted: "2020-01-19T05:18:11.221Z",
        lastCheck: "2020-01-20T01:01:12.213Z",
        urls: 500000,
        isPending: true,
        isSitemapsIndex: false,
        warnings: 0,
        errors: 0,
      },
    ],
  },
};

let isOpenPopUp = false;

let url = "https://semalt.tech/dev/api/v1/example/test/";
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });

// ccess to fetch at 'https://semalt.tech/dev/api/v1/example/test/' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

let sitemaps = response.result.sitemap;

// Pop Up for URLS
let urlId = document.querySelector("#urlId");
urlId.addEventListener("focus", showUrlPopUp);
urlId.addEventListener("change", useFilter);

let restBtn = document.querySelector("#restBtn");
restBtn.addEventListener("click", resetPopUp);

let applyBtn = document.querySelector("#applyBtn");
applyBtn.addEventListener("click", applyPopUp);

// Pop Up for STATUS
let statusId = document.querySelector("#statusId");
statusId.addEventListener("focus", showStatusPopUp);

let statusPopUpId = document.querySelector("#statusPopUpId");
statusPopUpId.addEventListener("click", setStatusPopUp);

// Create and format RESPONSE DATA
startCreateTable(sitemaps);

// Remove ROW
let removeBtn = document.querySelectorAll(".result__remove-btn");
console.log("removeBtn", removeBtn);

removeBtn.forEach((btn) => {
  console.log("dsfs");
  btn.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.parentElement.classList.add("result__remove");
    setTimeout(() => {
      e.target.parentElement.parentElement.parentElement.remove();
    }, 500);
  });
});

function startCreateTable(sitemaps) {
  sitemaps.forEach((sitemap, index) => createRow(sitemap, index));
}

function createRow(sitemap, index) {
  let li = document.createElement("li");
  li.classList.add("result__row", "data-from-server");
  li.setAttribute("data-row-id", index + 1);

  //   Create checkbox
  let checkboxDiv = document.createElement("div");
  checkboxDiv.classList.add("result_checkbox-wrapper");
  let checkboxInput = document.createElement("input");
  checkboxInput.setAttribute("type", "checkbox");
  checkboxInput.classList.add("result__checkbox");

  checkboxDiv.append(checkboxInput);
  li.append(checkboxDiv);

  //   Create sitemap path and format it
  let format = formatPath(sitemap.path);
  let path = cerateData(format);
  path.classList.add("result__sitemap");

  let pathA = document.createElement("a");
  pathA.href = sitemap.path;
  console.log("createRow -> pathA.src", pathA.src);
  console.log("createRow -> sitemap.path", sitemap.path);

  pathA.setAttribute("target", "_blank");
  pathA.classList.add("result__sitemap-img");
  let pathImg = document.createElement("img");
  pathImg.src = "./src/icon/filter-sitemap.png";
  pathImg.setAttribute("alt", "sitemap");

  pathA.append(pathImg);

  path.firstChild.append(pathA);
  li.append(path);

  //   Create index
  let i = cerateData(index + 1);
  i.classList.add("result__col");
  li.append(i);

  //   Create and format date
  let date = formatDate(sitemap.lastSubmitted);
  let lastSubmitted = cerateData(date);
  lastSubmitted.classList.add("result__col");
  li.append(lastSubmitted);

  let dateCheck = formatDate(sitemap.lastCheck);
  let lastCheck = cerateData(dateCheck);
  lastCheck.classList.add("result__col");
  li.append(lastCheck);

  //   Format info about errors
  let errorStatus = checkStatus(sitemap.errors);
  let errors = cerateData(errorStatus);
  errors.classList.add("result__col");
  let errorStyle = errorStatus === "Success" ? "result__success" : "result__errors";
  errors.classList.add(errorStyle);
  errorStatus === "Success"
    ? li.setAttribute("data-row-status", "Success")
    : li.setAttribute("data-row-status", "Errors");

  li.append(errors);

  //   Format count of urls
  let url = formatUrls(sitemap.urls);
  let urls = cerateData(url);
  urls.classList.add("result__col");
  li.append(urls);

  let recrawlDiv = document.createElement("div");
  recrawlDiv.classList.add("result__col");

  let recrawlBtn = document.createElement("button");
  recrawlBtn.classList.add("result__recrawl-btn");
  recrawlBtn.innerText = "Recrawl";

  recrawlDiv.append(recrawlBtn);
  li.append(recrawlDiv);

  let removeBtnDiv = document.createElement("div");
  let removeBtn = document.createElement("button");
  let removeP = document.createElement("p");
  let removeBtnImg = document.createElement("img");
  let removeBtnImgHover = document.createElement("img");

  removeBtnDiv.classList.add("result__col");
  removeBtn.classList.add("result__remove-btn");
  removeP.classList.add("result__remove-warning");
  removeBtnImg.classList.add("result__remove-img");
  removeBtnImgHover.classList.add("result__remove-hover");

  removeP.innerText = "Remove from Search Control";
  removeBtnImg.src = "./src/icon/filter-remove.png";
  removeBtnImgHover.src = "./src/icon/filter-remove-hover.png";
  removeBtnImg.setAttribute("alt", "remove");
  removeBtnImgHover.setAttribute("alt", "remove");

  removeBtn.append(removeP);
  removeBtn.append(removeBtnImgHover);
  removeBtn.append(removeBtnImg);
  removeBtnDiv.append(removeBtn);
  li.append(removeBtnDiv);

  let result = document.querySelector("#resultId");
  result.append(li);
}

function cerateData(data) {
  let div = document.createElement("div");
  div.innerHTML = `<p>${data}</p>`;
  return div;
}

function checkStatus(errors) {
  if (!errors) return "Success";
  else return `${errors} errors`;
}

function formatUrls(count) {
  return count.toLocaleString("en-IN");
}

function formatDate(date) {
  let d = new Date(date);
  let dates = d.toDateString().split(" ");

  return `${dates[1]} ${dates[2]},<br> ${dates[3]}`;
}

function formatPath(path, pathDel = "http://savetubevideo.com") {
  if (!path) {
    console.log("No path to format");
    return;
  }
  return path.slice(pathDel.length, path.length + 1);
}

function showUrlPopUp() {
  let popUp = document.querySelector("#urlPopUpId");
  popUp.classList.add("show");
}

function resetPopUp(e) {
  e.preventDefault();

  let radio = document.querySelectorAll("input[name='url-radio']");
  radio.forEach((r) => (r.checked = false));

  let popUp = document.querySelector("#urlPopUpId");
  popUp.classList.remove("show");
}

function applyPopUp(e) {
  e.preventDefault();

  let popUp = document.querySelector("#urlPopUpId");
  popUp.classList.remove("show");

  let radio = document.querySelectorAll("input[name='url-radio']");

  // Ищем какой фильтр по URL установлен
  let filter;
  radio.forEach((elem) => {
    if (elem.checked) filter = elem.value;
  });
  console.log("applyPopUp -> radio", radio);

  let containFilter = [];

  // Находим все данные полученные с сервера, которые уже отсортированы по Status
  let li = document.querySelectorAll(".data-from-server");
  console.log("applyPopUp -> filteredByStatus", li);

  let urlFilterInput = document.querySelector("#urlId");
  let valueOfFilter = urlFilterInput.value;
  console.log("applyPopUp -> valueOfFilter", valueOfFilter);

  for (let i = 0; i < li.length; i++) {
    if (li[i].classList.contains("hide")) {
      console.log(" ЭТОТ ЭЛЕМЕНТ СКРЫТ ", li[i]);
      continue;
    }

    console.dir(li[i]);

    if (filter === "notContain") {
      let contain = sitemaps[i].path.includes(valueOfFilter);
      if (contain) li[i].classList.add("hide");
    }

    if (filter === "Contain") {
      let contain = sitemaps[i].path.includes(valueOfFilter);
      if (!contain) li[i].classList.add("hide");
    }

    if (filter === "Exact" && sitemaps[i].path === valueOfFilter) {
      li[i].classList.add("hide");
    }
  }
}

function showStatusPopUp() {
  let statusPopUpId = document.querySelector("#statusPopUpId");
  statusPopUpId.classList.add("show");
}

function setStatusPopUp(e) {
  let statusId = document.querySelector("#statusId");
  statusId.value = e.target.innerText;

  e.target.parentElement.classList.remove("show");
  showFilteredStatus(statusId.value);
}

function showFilteredStatus(status) {
  let li = document.querySelectorAll("[data-row-id");

  if (status === "All sitemaps") {
    li.forEach((el) => el.classList.remove("hide"));
    return;
  }

  li.forEach((el) => {
    if (el.dataset.rowStatus === status) {
      el.classList.remove("hide");
    } else el.classList.add("hide");
  });
}

function removeRow(removeBtn) {
  removeBtn.forEach((btn) => {
    console.log("dsfs");
    btn.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.parentElement.classList.add("result__remove");
      setTimeout(() => {
        e.target.parentElement.parentElement.parentElement.remove();
      }, 500);
    });
  });
}

function useFilter() {
  let radio = document.querySelectorAll("input[name='url-radio']");
  let filter;
  radio.forEach((elem) => {
    if (elem.checked) filter = elem.value;
  });
  console.log("applyPopUp -> radio", radio);
  console.log("applyPopUp -> filter", filter);
}
