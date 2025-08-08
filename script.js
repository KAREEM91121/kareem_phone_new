// جلب المنتجات من localStorage أو تعيين المنتجات الافتراضية

const defaultProducts = {
  phones: [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 1200,
      image: "https://via.placeholder.com/300x180?text=iPhone+15+Pro",
      specs: "شاشة 6.1 بوصة، كاميرا ثلاثية، معالج A17، بطارية 3095 مللي أمبير."
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      price: 1050,
      image: "https://via.placeholder.com/300x180?text=Samsung+S24",
      specs: "شاشة 6.2 بوصة، كاميرا رباعية، معالج Exynos 2400، بطارية 4000 مللي أمبير."
    }
  ],
  accessories: [
    {
      id: 101,
      name: "سماعة لاسلكية",
      price: 150,
      image: "https://via.placeholder.com/300x180?text=Wireless+Headphones",
      specs: "سماعة بلوتوث عالية الجودة، بطارية تدوم 8 ساعات."
    },
    {
      id: 102,
      name: "غطاء حماية",
      price: 25,
      image: "https://via.placeholder.com/300x180?text=Phone+Case",
      specs: "غطاء سيليكون ناعم يحمي هاتفك من الصدمات."
    }
  ],
  offers: [
    {
      id: 201,
      name: "عرض خاص - هاتف + سماعة",
      price: 1200,
      image: "https://via.placeholder.com/300x180?text=Special+Offer",
      specs: "اشتري هاتف iPhone 15 Pro مع سماعة لاسلكية بسعر خاص."
    }
  ]
};

function showNotification(message) {
  const notif = document.getElementById('notification');
  notif.textContent = message;
  notif.classList.add('show');
  setTimeout(() => {
    notif.classList.remove('show');
  }, 3000);
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let existing = cart.find(item => item.id === product.id);
  if(existing){
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({...product, quantity: 1});
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  showNotification(`تمت إضافة ${product.name} إلى السلة!`);
}


let productsData = JSON.parse(localStorage.getItem("productsData")) || defaultProducts;

const phonesGrid = document.getElementById("phonesGrid");
const accessoriesGrid = document.getElementById("accessoriesGrid");
const offersGrid = document.getElementById("offersGrid");

const sectionsMenu = document.getElementById("sectionsMenu");
const productsToggleBtn = document.getElementById("productsToggleBtn");
const toggleDarkModeBtn = document.getElementById("toggleDarkMode");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderSectionProducts(sectionName, container) {
  container.innerHTML = "";
  const prods = productsData[sectionName];
  prods.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-name">${product.name}</div>
      <div class="product-price">${product.price} $</div>
      <div class="buttons-row">
        <button class="btn-specs" onclick="viewSpecs('${sectionName}', ${product.id})">عرض المواصفات</button>
        <button class="btn-add" onclick="addToCart('${sectionName}', ${product.id})">أضف إلى السلة</button>
        <button class="btn-wp" onclick="buyWhatsApp('${sectionName}', ${product.id})">شراء واتساب</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderAllSections() {
  renderSectionProducts("phones", phonesGrid);
  renderSectionProducts("accessories", accessoriesGrid);
  renderSectionProducts("offers", offersGrid);
}

function renderSectionsMenu() {
  const sections = Object.keys(productsData);
  sectionsMenu.innerHTML = "<ul>" + sections.map(sec => `<li onclick="scrollToSection('${sec}')">${getSectionEmoji(sec)} ${getSectionName(sec)}</li>`).join('') + "</ul>";
}

productsToggleBtn.addEventListener("click", () => {
  sectionsMenu.classList.toggle("hidden");
});

toggleDarkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleDarkModeBtn.textContent = document.body.classList.contains("dark") ? "☀️ وضع نهاري" : "🌙 وضع داكن";
});

function viewSpecs(section, id) {
  const product = productsData[section].find(p => p.id === id);
  if (!product) return;
  Swal.fire({
    title: product.name,
    html: `
      <img src="${product.image}" alt="${product.name}" style="width:100%;border-radius:10px;margin-bottom:10px;"/>
      <p><b>السعر:</b> ${product.price} $</p>
      <p><b>المواصفات:</b><br>${product.specs}</p>
    `,
    confirmButtonText: "حسناً"
  });
}

function addToCart(section, id) {
  const product = productsData[section].find(p => p.id === id);
  if (!product) return;

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  Swal.fire({
    icon: "success",
    title: "تم الإضافة إلى السلة",
    timer: 1500,
    showConfirmButton: false
  });
}

function buyWhatsApp(section, id) {
  const product = productsData[section].find(p => p.id === id);
  if (!product) return;
  const message = encodeURIComponent(`مرحباً، أود شراء المنتج:\\n${product.name}\\nالسعر: ${product.price} $`);
  window.open(`https://wa.me/00000000000?text=${message}`, "_blank"); // عدّل رقم الهاتف هنا
}

function scrollToSection(section) {
  sectionsMenu.classList.add("hidden");
  let container = null;
  if (section === "phones") container = phonesGrid;
  else if (section === "accessories") container = accessoriesGrid;
  else if (section === "offers") container = offersGrid;
  if (container) {
    container.parentElement.scrollIntoView({behavior:"smooth", block:"start"});
    container.style.boxShadow = "0 0 15px #ff6600";
    setTimeout(() => {
      container.style.boxShadow = "none";
    }, 2000);
  }
}

function getSectionName(section) {
  switch(section) {
    case "phones": return "الهواتف";
    case "accessories": return "الإكسسوارات";
    case "offers": return "العروض";
    default: return section;
  }
}

function getSectionEmoji(section) {
  switch(section) {
    case "phones": return "📱";
    case "accessories": return "🎧";
    case "offers": return "🔥";
    default: return "";
  }
}


renderAllSections();
renderSectionsMenu();
