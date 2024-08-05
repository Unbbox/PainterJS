const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraseBtn = document.getElementById("eraser-btn");
const saveBtn = document.getElementById("save");
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
// 선 마감 설정
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

// 선 두께 표시
lineWidthText.innerText = "두께 : " + lineWidth.value;

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
  lineWidthText.innerText = "두께 : " + e.target.value;
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
    modeBtn.innerText = "🩸 Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "🎨 Draw";
  }
};

const onCanvasClick = (e) => {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
};

const onDestroyClick = (e) => {
  // 그림판 삭제 확인창 띄우기
  const deletePaint = confirm("삭제하시겠습니까?");
  if (deletePaint) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    alert("초기화 완료");
  }
};

const onEraserClick = (e) => {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
};

// 파일 url 가져오기
const onFileChange = (e) => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;

  // 함수를 부르는 다른 방법
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
};

function onDoubleClick(e) {
  const text = textInput.value;
  if (text !== "") {
    // 현재 ctx 설정값 저장
    ctx.save();

    // 텍스트 출력
    ctx.lineWidth = 1;
    ctx.font = "40px serif";
    ctx.fillText(text, e.offsetX, e.offsetY);

    // 저장한 ctx 설정값 불러오기
    ctx.restore();
  }
}

function onSaveClick(e) {
  // canvas.toDataURL() : 현재 캔버스의 이미지를 URL 형태로 저장
  const url = canvas.toDataURL();

  // a 태그를 생성하고 다운로드하기
  const a = document.createElement("a");
  a.href = url;
  // a 태그에 download 속성을 넣으면 해당 링크가 다운로드
  a.download = "myDrawing.png";
  a.click();
}

// 텍스트 입력
canvas.addEventListener("dblclick", onDoubleClick);
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
// 파일 버튼
fileInput.addEventListener("change", onFileChange);
// 이미지 저장 버튼
saveBtn.addEventListener("click", onSaveClick);
