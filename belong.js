if (window.base_data && window.member_data) {
  main();
}

function setupBelong(func) {
  window.base_data.GENERAL.forEach(function(g) {
    g["belong"] = func(g);
    g["not_belong"] = g["belong"] !== 1;
  });
}

function main() {
  var UI_ID = "___belongUi";
  var ui = document.getElementById(UI_ID);
  if (!ui) {
    var parent = document.getElementById("container");
    ui = document.createElement("div");
    ui.id = UI_ID;
    ui.style.height = "120px";
    ui.style.display = "flex";
    ui.style.justifyContent = "space-around";
    parent.prepend(ui);
    var b1 = document.createElement("button");
    b1.innerHTML = "アーケード";
    b1.onclick = function() {
      setupBelong(function(g){
        return g["belong_arcade"];
      });
    }
    ui.appendChild(b1);
    var b2 = document.createElement("button");
    b2.innerHTML = "ぽけっと";
    b2.onclick = function() {
      setupBelong(function(g){
        return g["belong_pocket"];
      });
    }
    ui.appendChild(b2);
    var b3 = document.createElement("button");
    b3.innerHTML = "両方";
    b3.onclick = function() {
      setupBelong(function(g){
        return g["belong_arcade"] && g["belong_pocket"] ? 1 : 0;
      });
    }
    ui.appendChild(b3);
    var b4 = document.createElement("button");
    b4.innerHTML = "通常";
    b4.onclick = function() {
      setupBelong(function(g){
        return g["org_belong"];
      });
    }
    ui.appendChild(b4);
  }
  window.base_data.GENERAL.forEach(function(g) {
    if ("org_belong" in g) {
      return;
    }
    g["org_belong"] = g["belong"];
  });
  window.base_data.GENERAL.forEach(function(g, i) {
    g["belong_arcade"] = member_data.CARD.some(function(c){
      return c.idx === (i+'') && c.arcade === "1";
    }) ? 1 : 0;
    if (g["pocket_code"]) {
      g["belong_pocket"] = member_data.CARD.some(function(c){
        return c.idx === (i+'') && c.pocket === "1";
      }) ? 1 : 0;
    } else {
      g["belong_pocket"] = 1;
    }
  });
}

window["tohN4PIzcc"] = function () {
  if (window.base_data && window.member_data) {
    main();
  }
}
