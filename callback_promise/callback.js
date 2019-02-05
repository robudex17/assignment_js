const button = document.querySelector("button");
const div = document.querySelector("div");

const setText = (text) => {
  div.textContent = text
}

const checkAuth = cb => {
  setText('Checking Auth...')
  setTimeout(() => {
    cb(true);
  }, 2000);
};

const fetchUser = cb => {
  setText('Fetching User...')
  setTimeout(() => {
    cb({ name: "Max" });
  }, 2000);
};

button.addEventListener("click", () => {
  checkAuth(auth => {
    if (auth) {
      fetchUser(user => {
        setText(user.name)
      });
    }
  });
});
