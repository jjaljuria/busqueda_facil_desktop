const form = document.getElementById("productForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;

  if (!name || !price) {
    alert("se necesíta nombre y precio");
  } else {
    try {
      const result = await window.ipc.saveProduct({ name, price });
      toast({
        title: "Producto ingresado con exíto",
        content: result.dataValues.name,
      });
      window.ipc.updateMainWindow();
      form.reset();
    } catch (err) {
      console.log(err);
    }
  }
});

function toast({ title, content }) {
  let template = document
    .getElementById("templateToast")
    .content.cloneNode(true);

  // set Title Toast
  const toastTitle = template.querySelector(".toast-header strong");
  toastTitle.textContent = title;

  // set Content Toast
  const toastContent = template.querySelector(".toast-body");
  toastContent.textContent = content;

  return renderToast(template);
}

function renderToast(template) {
  container = document.querySelector(".toast-container");
  container.appendChild(template);

  return showToast();
}

function showToast() {
  const toast = container.querySelector(".toast:last-child");
  const instance = new bootstrap.Toast(toast, {});
  instance.show();
  return instance;
}
