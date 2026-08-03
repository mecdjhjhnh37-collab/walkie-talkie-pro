const imageInput = document.getElementById("imageInput");
const videoInput = document.getElementById("videoInput");
const fileInput = document.getElementById("fileInput");

if (imageInput) {
  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    socket.emit("upload-image", {
      name: file.name,
      size: file.size
    });

    alert("تم اختيار الصورة: " + file.name);
  });
}

if (videoInput) {
  videoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    socket.emit("upload-video", {
      name: file.name,
      size: file.size
    });

    alert("تم اختيار الفيديو: " + file.name);
  });
}

if (fileInput) {
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    socket.emit("upload-file", {
      name: file.name,
      size: file.size
    });

    alert("تم اختيار الملف: " + file.name);
  });
}
