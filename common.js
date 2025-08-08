document.addEventListener("DOMContentLoaded", () => {
  const sectionsBtn = document.getElementById("sectionsBtn");
  const sectionsList = document.getElementById("sectionsList");

  if (!sectionsBtn || !sectionsList) return;

  sectionsBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // منع إغلاق القائمة عند الضغط على الزر نفسه
    sectionsList.classList.toggle("hidden");
  });

  document.addEventListener("click", () => {
    sections
