const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipc", {
  async search(textSearch) {
    return await ipcRenderer.invoke("search", { text: textSearch });
  },
  async saveProduct({ name, price }) {
    return await ipcRenderer.invoke("saveProduct", { name, price });
  },
  async products() {
    return await ipcRenderer.invoke("getProducts");
  },
  async currency() {
    return await ipcRenderer.invoke("getCurrency");
  },
  async updateExchange({ id, newValue }) {
    try {
      newValue = parseFloat(newValue);
      id = parseInt(id);
    } catch (err) {
      console.error("Not valid newValue or id not valid", err);
    }

    return await ipcRenderer.invoke("updateExchange", { id, newValue });
  },
  async searchProduct(nameProduct) {
    return await ipcRenderer.invoke("searchProduct", nameProduct);
  },
  async paginate({ pages = 0, currentPage = 0 }) {
    const offset = pages * (currentPage - 1);
    console.log({ offset }, { currentPage });
    return await ipcRenderer.invoke("paginate", { pages, offset });
  },
  async deleteProduct(id) {
    return await ipcRenderer.invoke("deleteProduct", id);
  },
  async updateProductPrice(id, price) {
    return await ipcRenderer.invoke(
      "updateProductPrice",
      id,
      parseFloat(price)
    );
  },
  updateMainWindow() {
    return ipcRenderer.invoke("newProductHaveCreated");
  },
  ipcRenderer,
});
