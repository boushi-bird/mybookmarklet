if (window.base_data && window.member_data) {
  main();
}

function setupBelong(func) {
  window.base_data.GENERAL.forEach(function(g) {
    g["belong"] = func(g);
    g["not_belong"] = g["belong"] < 1;
  });
}

function main() {
  // 除外する=持っているとする
  var ignores = [
    "魏 第1弾 R賈詡 ぽけっと",
    "魏 第1弾 UC許褚 アーケード",
    "魏 第1弾-5 R曹華 アーケード",

    "蜀 第1弾 R王桃 ぽけっと",
    "蜀 第1弾 R関羽 アーケード",
    "蜀 第1弾 SR関銀屏 アーケード",
    "蜀 第1弾 R関索 アーケード",
    "蜀 第1弾 R徐庶 アーケード",
    "蜀 第1弾 R張飛 アーケード",
    "蜀 第1弾 R麋夫人 ぽけっと",
    "蜀 第2弾 SR趙氏 アーケード",
    "蜀 第3弾 LE関羽 アーケード",

    "呉 第1弾 UC程普 ぽけっと",
    "呉 第1弾 SR小喬 アーケード",
    "呉 第1弾 R呂蒙 アーケード",
    "呉 第1弾-1 SR周姫 ぽけっと",
    "呉 第1弾-5 R諸葛瑾 アーケード",
    "呉 第3弾 SR孫権 ぽけっと",

    "晋 第3弾 R文鴦 ぽけっと",

    "群 第1弾 R韓遂 アーケード",
    "群 第1弾 SR貂蝉 アーケード",
    "群 第1弾 R李儒 アーケード",
    "群 第2弾 SR孟獲 アーケード",
    "群 第2弾 R盧氏 アーケード",
  ];

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

    // 特別所持状態
    if (g["belong_arcade"] === 0) {
      var uniqName = createCardName(g, false);
      if (ignores.indexOf(uniqName) >= 0) {
        g["belong_arcade"] = 1;
        // console.log("特別所持", uniqName);
      }
    }

    if (g["pocket_code"]) {
      g["belong_pocket"] = member_data.CARD.some(function(c){
        return c.idx === (i+'') && c.pocket === "1";
      }) ? 1 : 0;

      // 特別所持状態
      if (g["belong_pocket"] === 0) {
        var uniqName = createCardName(g, true);
        if (uniqName && ignores.indexOf(uniqName) >= 0) {
          g["belong_pocket"] = 1;
          // console.log("特別所持", uniqName);
        }
      }

    } else {
      g["belong_pocket"] = 1;
    }
  });
}

function createCardName(g, p) {
  if (p && !g.pocket_code) {
    return null;
  }
  var d = window.base_data;

  var state = d.STATE[g.state].name_short;
  var rarity = g.rarity;
  var name = d.PERSONAL[g.personal].name;
  var major_version = g.major_version;
  var add_version = g.add_version;
  var ver_type = g.ver_type;
  if (add_version === "0") {
    add_version = "";
  } else if (ver_type === "2") {
    add_version = "-EX";
  } else {
    add_version = "-" + add_version;
  }
  var cardType = p ? " ぽけっと" : " アーケード"
  return state + " 第" + major_version + "弾" + add_version + " " + rarity + name + cardType;
}

window["tohN4PIzcc"] = function () {
  if (window.base_data && window.member_data) {
    main();
  }
}
