window.btcm_url = "";
let approvedWallets = [];

async function GIA() {
  let a = await fetch("wallets.json");
  let r = await a.json();
  return r.wallets;
}

function checkWallet(wallet) {
  return approvedWallets.includes(wallet);
}

function MEB(btn) {
  let a = document.getElementById(btn);
  let ta = document.getElementById("tweet-url");
  let addr = document.getElementById("addr-inp").value;
  if (addr == "") {
    a.classList.add("disabled");
  } else {
    a.classList.remove("disabled");
  }
  ta.value =
    "https://twitter.com/intent/tweet?text=" +
    encodeURI("I'm applying for the @ordinalgoatclub Whitelist!") +
    "%0A%0A" +
    encodeURI("My address is: " + addr) +
    "%0A%0A" +
    encodeURI("You can apply here: " + window.btcm_url);
}

function SS(id) {
  for (let i = 1; i <= 5; i++) {
    document.getElementById("step-" + i).classList.add("hidden");
  }
  window.setTimeout(function () {
    document.getElementById("step-" + id).classList.remove("hidden");
  }, 200);
}

window.addEventListener("load", async () => {
  approvedWallets = await GIA();
  if (approvedWallets.length > 0) {
    window.btcm_url = "https://www.ordinalsgoatclub.com";
    let addr_in = document.getElementById("addr-inp");
    addr_in.onpaste = addr_in.oncut = addr_in.onkeyup = function () {
      let wallet = this.value.trim();
      let continueBtn = document.getElementById("continue-1");
      if (wallet === "" || !checkWallet(wallet)) {
        continueBtn.classList.add("disabled");
      } else {
        continueBtn.classList.remove("disabled");
      }
    };

    document.getElementById("continue-1").onclick = function (e) {
      e.preventDefault();
      let wallet = document.getElementById("addr-inp").value.trim();
      if (wallet === "" || !checkWallet(wallet)) {
        document.getElementById("addr-inp").classList.add("error");
      } else {
        SS(2);
      }
    };

    let tw_in = document.getElementById("tw-inp");
    tw_in.onpaste = tw_in.oncut = tw_in.onkeyup = function () {
      MEB("continue-2");
    };

    document.getElementById("continue-2").onclick = function (e) {
      if (this.classList.contains("disabled")) {
        e.preventDefault();
        document.getElementById("tw-inp").classList.add("error");
      } else {
        SS(3);
      }
    };

    document.getElementById("continue-3").onclick = function (e) {
      SS(4);
    };
  }
});
