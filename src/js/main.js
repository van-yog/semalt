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

function checkStatus(errors) {
  console.log("checkStatus -> errors", errors);

  if (errors === 0) return "Success";
  else return `${errors} errors`;
}

function formatUrls(count) {
  return count.toLocaleString("en-IN");
}

formatDate(response.result.sitemap[1].lastSubmitted);

function formatDate(date) {
  let d = new Date(date);
  console.log(d.toDateString());
  let dates = d.toDateString().split(" ");
  return `${dates[1]} ${dates[2]},<br> ${dates[3]}`;
}

formatPath(response.result.sitemap[1].path, "http://savetubevideo.com");

function formatPath(path, pathDel = "http://savetubevideo.com") {
  if (!path) {
    console.log("No path to format");
    return;
  }
  console.log(path.slice(pathDel.length, path.length + 1));
  return path.slice(pathDel.length, path.length + 1);
}

let sitemaps = response.result.sitemap;
let url = "https://semalt.tech/dev/api/v1/example/test/";

console.dir(sitemaps);

let result = document.querySelector("#resultId");

sitemaps.forEach((sitemap, index) => createRow(sitemap, index));

function createRow(sitemap, index) {
  let li = document.createElement("li");
  li.classList.add("result__row");
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
  let errorStyle = errorStatus === "Success" ? "result__seccess" : "result__errors";
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
  recrawlBtn.classList.add("result__recrewl-btn");
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

  result.append(li);
}

function cerateData(data) {
  let div = document.createElement("div");
  div.innerHTML = `<p>${data}</p>`;
  return div;
}

let urlId = document.querySelector("#urlId");

urlId.addEventListener("focus", () => {
  let popUp = document.querySelector("#urlPopUpId");
  popUp.classList.add("show");
});

let restBtn = document.querySelector("#restBtn");
restBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let radio = document.querySelectorAll("input[name='url-radio']");
  radio.forEach((r) => (r.checked = false));
  let popUp = document.querySelector("#urlPopUpId");
  popUp.classList.remove("show");
  // console.log(radio);
});

let applyBtn = document.querySelector("#applyBtn");
applyBtn.addEventListener("click", (e) => {
  console.log("Aply btn");
  e.preventDefault();

  let radio = document.querySelectorAll("input[name='url-radio']");
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) console.log(radio[i].value);
  }

  let popUp = document.querySelector("#urlPopUpId");
  popUp.classList.remove("show");
});

// STATUS

let statusId = document.querySelector("#statusId");
statusId.addEventListener("focus", () => {
  let statusPopUpId = document.querySelector("#statusPopUpId");
  statusPopUpId.classList.add("show");
});

let statusPopUpId = document.querySelector("#statusPopUpId");
statusPopUpId.addEventListener("click", (e) => {
  console.dir(e);
  let statusId = document.querySelector("#statusId");
  statusId.value = e.target.innerText;

  e.target.parentElement.classList.remove("show");
  console.log("statusId.value", statusId.value);
  showFilteredStatus(statusId.value);
});

function showFilteredStatus(status) {
  console.log("showFilteredStatus -> status", status);

  let li = document.querySelectorAll("[data-row-id");
  console.log("showFilteredStatus -> li", li);

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

// Remove row
let removeBtn = document.querySelectorAll(".result__remove-btn");

removeBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.parentElement.classList.add("result__remove");
    setTimeout(() => {
      e.target.parentElement.parentElement.parentElement.remove();
    }, 500);
  });
});
