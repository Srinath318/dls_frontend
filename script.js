const BASE_URL = "https://dlsbackend-production.up.railway.app";
let output = document.getElementById("output");

// GET RANDOM SECRET
function getRandom() {
  output.style.textAlign = "center";
  fetch(`${BASE_URL}/getRandom`)
    .then((res) => res.text())
    .then((data) => {
      output.innerText = data;
    });
}

// POST SECRET
function postSecret() {
  const secret = document.getElementById("secretInput").value.trim();

  // Validation
  if (secret === "") {
    alert("Secret cannot be empty.");
    return;
  }

  if (secret.length < 10) {
    alert("Type at least 10 characters.");
    return;
  }

  // If valid → continue posting
  fetch(`${BASE_URL}/?secret=${encodeURIComponent(secret)}`, {
    method: "POST",
  })
    .then((res) => res.text())
    .then((data) => {
      output.innerText = data;
    });
}

// GET ALL SECRETS
function getAll() {
  output.style.textAlign = "left";
  fetch(`${BASE_URL}/allSecrets`)
    .then((res) => res.json())
    .then((data) => {
      output.innerHTML = "";
      let count = 1;

      data.forEach((item) => {
        const p = document.createElement("p");
        p.innerText = `${count}. ${item.message}`;
        output.appendChild(p);
        count++;
      });
    });
}
