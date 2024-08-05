// 캔버스의 좌표는 테두리까지 포함해서 (0,0) 좌표임
// fillRect : 테두리를 포함한 사각형 그리기(안에 색채우기 O)
// ctx.fillRect(50, 50, 100, 200);

// strokeRect : 사각형 테두리만 그리기(안에 색채우기 X)
// ctx.strokeRect(50, 250, 100, 200);

// beginPath() : 이후 그리는 캔버스만 설정하고 싶을때
// ctx.beginPath();
// ctx.rect(350, 350, 100, 100);
// ctx.rect(450, 450, 100, 100);
// ctx.fillStyle = "red";
// ctx.fill();

// moveTo() : 선을 그리지 않으면서 좌표 이동
// ctx.moveTo(50, 50);

// lineTo() : 선을 그리면서 좌표이동
// ctx.lineTo(150, 50);
// ctx.lineTo(50, 150);
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 50);
// ctx.stroke();

// 집 만들기
// ctx.fillRect(200, 200, 50, 200);
// ctx.fillRect(400, 200, 50, 200);
// .lineWidth : 선 두께 설정
// ctx.lineWidth = 2;
// ctx.fillRect(300, 300, 50, 100);
// ctx.fillRect(200, 200, 200, 20);

// 지붕 만들기
// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100);
// ctx.lineTo(450, 200);
// ctx.fill();

// 사람 만들기
// 팔
// ctx.fillRect(350 - 20, 200, 15, 100);
// ctx.fillRect(210 + 20, 200, 15, 100);

// 몸통
// ctx.fillRect(260, 200, 60, 200);

// 머리
// ctx.arc(290, 150, 40, 0, 2 * Math.PI);
// ctx.fill();

// 눈
// .arc() 시 현재 path의 마지막 좌표와 새로 생성되는 arc의 첫번째 좌표 사이에
// .lineTo()가 적용되어 의도치 않는 선이 생김
// 이를 방지하기 위해 beginPath()를 새로 사용
// ctx.beginPath();
// ctx.fillStyle = "white";
// ctx.arc(275, 145, 5, Math.PI, 2 * Math.PI);
// ctx.arc(305, 145, 5, Math.PI, 2 * Math.PI);
// ctx.fill();

// 선 색 설정
// const colors = ["#ff3838", "#ffb8b8", "#c56cf0", "#ff9f1a", "#fff200", "#32ff7e", "#7efff5", "#18dcff", "#7d5fff"];

// 캔버스 내 클릭 시 (0, 0)에서 선 긋기\
// const onClick = (e) => {
//   console.log(e);
//   console.log("x : ", e.offsetX);
//   console.log("y : ", e.offsetY);

//   ctx.moveTo(0, 0);
//   ctx.lineTo(e.offsetX, e.offsetY);
//   ctx.stroke();
// };

// canvas.addEventListener("click", onClick);

// 마우스가 이동할 때마다 색 변경
// const onDraw = (e) => {
//   ctx.beginPath();
//   ctx.moveTo(0, 0);
//   const color = colors[Math.floor(Math.random() * colors.length)];
//   ctx.strokeStyle = color;
//   ctx.lineTo(e.offsetX, e.offsetY);
//   ctx.stroke();
// };

// canvas.addEventListener("mousemove", onDraw);

const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraseBtn = document.getElementById("eraser-btn");
// Array.from() : 불러온 객체들을 Array 형태로 저장
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const lineWidthText = document.querySelector(".line-width-text");
const canvas = document.querySelector("canvas");
// 캔버스 종류 설정 : 2d
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

// css에서 설정한 캔버스 크기 다시 설정해주기
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// 선 두께 설정
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

const onMove = (e) => {
  if (isPainting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
};

const startPainting = (e) => {
  isPainting = true;
};

const cancelPainting = (e) => {
  isPainting = false;
};

const onLineWidthChange = (e) => {
  ctx.lineWidth = e.target.value;
};

const onLineWidthText = (e) => {
  lineWidthText.innerText = e.target.value;
};

function ColorChange(color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

const onColorChange = (e) => {
  ColorChange(e.target.value);
};

const onColorClick = (e) => {
  const colorValue = e.target.dataset.color;
  // console.dir(e.target); : e.target에 있는 요소들 보기
  ColorChange(colorValue);
  color.value = colorValue;
};

const onModeClick = (e) => {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
};

const onCanvasClick = (e) => {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
};

const onDestroyClick = (e) => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

const onEraserClick = (e) => {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
};

// 마우스를 클릭한채로 움직일 때 그림 그리기
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

// 캔버스 전체 색상 채우기
canvas.addEventListener("click", onCanvasClick);

// 펜 굵기 변화
lineWidth.addEventListener("change", onLineWidthChange);
// 굵기 변화해 줄 때마다 텍스트로 굵기 표시
lineWidth.addEventListener("input", onLineWidthText);

// 펜 색상 변경
color.addEventListener("change", onColorChange);

// div에 표시된 색상 클릭할 때마다 색상 변경
colorOptions.forEach((color) => {
  color.addEventListener("click", onColorClick);
});

// 색상 채우기 버튼
modeBtn.addEventListener("click", onModeClick);
// 초기화 버튼
destroyBtn.addEventListener("click", onDestroyClick);
// 지우개 버튼
eraseBtn.addEventListener("click", onEraserClick);
