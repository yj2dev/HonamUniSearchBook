const header = document.querySelector("header");
const bookBtn = document.querySelector("#getBook");
let cnt = 0;
document.addEventListener("scroll", (e) => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    console.log("Y: ", scrollY);
    console.log("Inner: ", innerHeight);
    console.log("Y + Inner: ", scrollY + innerHeight);
    cnt += 1;
    console.log(cnt);
  }
});

header.addEventListener("click", () => {
  location.href = "/";
});

function rental(cno) {
  console.log(cno);
  axios
    .get(`/search/postman/${cno}`)
    .then((res) => {
      const data = res.data;
      let isrental = document.getElementById(`${cno}`);
      console.log("isrental : ", isrental);
      isrental.innerHTML = data;
      console.log("cno : ", cno);
      console.log("data : ", data);
      console.log("load success");
    })
    .catch((err) => {
      console.error(err);
    });
}
