
function generateFile() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;
  const specs = document.getElementById("specs").value;

  const specBoxes = specs.split('\n').map(s => `<div class="spec-box">${s}</div>`).join('');

  const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name}</title>
  <style>
    body {
      font-family: 'Cairo', sans-serif;
      margin: 0;
      padding: 20px;
      background: #fff7f0;
      color: #333;
      text-align: center;
      transition: background-color 0.3s, color 0.3s;
    }
    .container {
      max-width: 600px;
      margin: auto;
    }
    body.dark-mode {
      background: #121212;
      color: #ddd;
    }
    img.phone-image {
      max-width: 90%;
      border-radius: 16px;
      margin-bottom: 20px;
      box-shadow: 0 0 15px rgba(255, 128, 0, 0.6);
    }
    .spec-box {
      background: white;
      margin: 8px 0;
      padding: 12px;
      border-radius: 10px;
      box-shadow: 0 0 6px rgba(0,0,0,0.08);
      text-align: right;
      font-size: 16px;
      width: 100%;
      box-sizing: border-box;
    }
    body.dark-mode .spec-box {
      background: #222;
      color: #ddd;
      box-shadow: 0 0 10px rgba(255, 128, 0, 0.8);
    }
    button {
      background-color: #ff6600;
      border: none;
      padding: 10px 20px;
      border-radius: 20px;
      font-size: 16px;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s;
      margin: 10px 5px;
    }
    button:hover {
      background-color: #ff8533;
    }
    #darkModeToggle {
      position: fixed;
      top: 15px;
      left: 15px;
      background: #ff8000;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      font-size: 16px;
      z-index: 1000;
    }
    #notif {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff6600;
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      display: none;
      z-index: 1000;
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
    }
    @media (max-width: 600px) {
      .spec-box { font-size: 15px; padding: 10px; }
      button { font-size: 14px; padding: 8px 16px; }
      #notif { font-size: 13px; padding: 8px 15px; right: 10px; top: 10px; }
    }
  </style>
</head>
<body>
  <div id="notif">✅ تمت إضافة المنتج إلى السلة</div>
  <button id="darkModeToggle" title="تبديل الوضع الداكن">🌙</button>
  <div class="container">
    <h1>${name}</h1>
    <img class="phone-image" src="${image}" alt="${name}" />
    <h3>السعر: ${price} د.ع</h3>
    ${specBoxes}
    <button onclick="addToCart('${name}', ${price})">🛒 أضف إلى السلة</button>
    <button onclick="window.location.href='index.html'">⬅ العودة إلى القائمة الرئيسية</button>
  </div>
  <script>
    // الوضع الداكن
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      darkModeToggle.textContent = '☀️';
    }
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = '☀️';
      } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = '🌙';
      }
    });

    // سلة التسوق + إشعار
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    function addToCart(name, price) {
      cart.push({ name, price });
      localStorage.setItem('cart', JSON.stringify(cart));
      const notif = document.getElementById('notif');
      notif.style.display = 'block';
      setTimeout(() => { notif.style.display = 'none'; }, 3000);
    }
  </script>
</body>
</html>`;

  downloadFile(`${name.replace(/\s+/g, '_')}.html`, html);
}

function downloadFile(filename, content) {
  const a = document.createElement('a');
  const file = new Blob([content], { type: 'text/html' });
  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();
}
