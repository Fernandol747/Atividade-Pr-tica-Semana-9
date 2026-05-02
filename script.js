const data = {
    produtos: [
        {id: 1, nome: "iPhone 13", preco: 4500, categoria: "Celulares", imagem: "https://via.placeholder.com/150", descricao: "Celular Apple", emEstoque: true},
        {id: 2, nome: "Samsung S21", preco: 3500, categoria: "Celulares", imagem: "https://via.placeholder.com/150", descricao: "Celular Samsung", emEstoque: true},
        {id: 3, nome: "Notebook Dell", preco: 5000, categoria: "Notebooks", imagem: "https://via.placeholder.com/150", descricao: "Notebook potente", emEstoque: false},
        {id: 4, nome: "Notebook Acer", preco: 4000, categoria: "Notebooks", imagem: "https://via.placeholder.com/150", descricao: "Notebook custo-benefício", emEstoque: true},
        {id: 5, nome: "Mouse Gamer", preco: 150, categoria: "Acessórios", imagem: "https://via.placeholder.com/150", descricao: "Mouse RGB", emEstoque: true},
        {id: 6, nome: "Teclado Mecânico", preco: 300, categoria: "Acessórios", imagem: "https://via.placeholder.com/150", descricao: "Teclado gamer", emEstoque: false},
        {id: 7, nome: "Playstation 5", preco: 4500, categoria: "Games", imagem: "https://via.placeholder.com/150", descricao: "Console Sony", emEstoque: true},
        {id: 8, nome: "Xbox Series X", preco: 4300, categoria: "Games", imagem: "https://via.placeholder.com/150", descricao: "Console Microsoft", emEstoque: true}
    ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");

function formatPrice(preco) {
    return "R$ " + preco.toFixed(2);
}

// Criar card
function createProductCard(produto) {
    const card = document.createElement("div");
    card.setAttribute("data-id", produto.id);
    card.classList.add("card");

    card.style.borderRadius = "8px";

    const title = document.createElement("h3");
    title.innerText = produto.nome;

    const img = document.createElement("img");
    img.src = produto.imagem;
    img.style.width = "100%";

    const price = document.createElement("p");
    price.innerText = formatPrice(produto.preco);

    const category = document.createElement("p");
    category.innerText = produto.categoria;

    const btnDetails = document.createElement("button");
    btnDetails.innerText = "Ver detalhes";

    const btnHighlight = document.createElement("button");
    btnHighlight.innerText = "Destacar";

    // EVENTOS
    btnDetails.addEventListener("click", () => {
        showProductDetails(produto);
    });

    btnHighlight.addEventListener("click", () => {
        card.classList.toggle("highlight");
    });

    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(price);
    card.appendChild(category);
    card.appendChild(btnDetails);
    card.appendChild(btnHighlight);

    return card;
}

function renderProducts(produtos) {
    productList.innerHTML = "";

    produtos.forEach(produto => {
        const card = createProductCard(produto);
        productList.appendChild(card);
    });

    // querySelectorAll obrigatório
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        console.log("Card ID:", card.getAttribute("data-id"));
    });
}

function renderCategories() {
    const categorias = [...new Set(data.produtos.map(p => p.categoria))];

    categorias.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.innerText = cat;
        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto) {
    productDetails.innerHTML = `
        <h3>${produto.nome}</h3>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
        <p>${produto.descricao}</p>
    `;
}

function filterProducts() {
    const texto = searchInput.value.toLowerCase();
    const categoria = categorySelect.value;

    return data.produtos.filter(prod => {
        const matchNome = prod.nome.toLowerCase().includes(texto);
        const matchCategoria = categoria === "Todas" || prod.categoria === categoria;
        return matchNome && matchCategoria;
    });
}

searchInput.addEventListener("input", () => {
    renderProducts(filterProducts());
});

categorySelect.addEventListener("change", () => {
    renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
    renderProducts(filterProducts());
});

renderCategories();
renderProducts(data.produtos);