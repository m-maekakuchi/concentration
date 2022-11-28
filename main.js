'use strict'

const maxPairs = 6;
let firstFlg = true;
let firstCard;
let timer;
let turnCount = 0;  // カードをめくった回数
let pairCount = 0;  // できたペアの数

window.onload = function() {
  let ary = [];
  for (let i = 1; i <= maxPairs; i++) {
    ary.push(i);
    ary.push(i);
  }

  shuffle(ary);

  const panel = document.getElementById('panel');
  for (let i = 0; i < maxPairs*2; i++) {
    const div = document.createElement('div');
    div.className = "card";
    div.number = ary[i];
    div.onclick = turn;
    panel.appendChild(div);
  }
};

//Fisher-Yates shuffleアルゴリズムを用いて配列をシャッフル
function shuffle(ary) {
  const length = ary.length;
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ary[i], ary[j]] = [ary[j], ary[i]];
  }
}

function turn(e) {
  const div = e.target;
  
  if (timer) return;

  //裏向きのカードをクリックした場合
  if (div.number) {
    div.innerHTML = `<img src="img/card${div.number}.png">`;
    turnCount++;
  } else {
    return;
  }

  //1枚目
  if (firstFlg) {
    firstFlg = false;
    firstCard = div;
  //2枚目
  } else {
    //1枚目と一致する場合
    if (div.number === firstCard.number) {
      firstCard.classList.add("finish");
      div.classList.add("finish");
      pairCount++;
    //1枚目と一致しない場合
    } else {
      timer = setTimeout(
        function() {
          firstCard.innerHTML = "";
          div.innerHTML = "";
          timer = 0;
        }
        , 1000
      );
    }
    firstFlg = true;
  }
  if (pairCount === maxPairs) {
    let result = document.getElementById('result');
    result.innerHTML = `<p>カードをめくった回数</p><p>${turnCount}回</p>`;
    console.log(turnCount);
    
  }
}
