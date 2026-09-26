const conteudo = document.getElementById("conteudo");

// Lógica do Menu Hambúrguer
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("nav-active");
  });
}

function navegar(pagina) {
  // Fecha menu mobile ao clicar num link
  if (navMenu) navMenu.classList.remove("nav-active");

  if (pagina === "inicio") {
    conteudo.innerHTML = `
      <section>
        <h1>ONG Esperança</h1>
        <span class="badge">projeto ativo</span>
        <img src="./ong.jpg" alt="Voluntários da ONG Esperança">
        <h2>Quem somos</h2>
        <p>A ONG Esperança ajuda famílias por meio de ações sociais e trabalho voluntário.</p>
        <h2>Entre em contato</h2>
        <p>E-mail: contato@esperanca.org</p>
      </section>
    `;
  }

  if (pagina === "projetos") {
    conteudo.innerHTML = `
      <section>
        <h1>Projetos da ONG Esperança</h1>
        <p>Conheça as nossas principais iniciativas:</p>
        <h2>1. Horta Comunitária</h2>
        <p>Incentivamos a agricultura urbana para famílias da região.</p>
        <h2>2. Reforço Escolar</h2>
        <p>Aulas gratuitas para crianças em idade escolar.</p>
      </section>
    `;
  }

  if (pagina === "cadastro") {
    conteudo.innerHTML = `
      <section>
        <h1>Junte-se à ONG Esperança</h1>
        <p>Preencha os seus dados para participar:</p>
        <form id="formCadastro" onsubmit="salvarCadastro(event)">
          <label for="nome">Nome Completo</label>
          <input type="text" id="nome" name="nome" placeholder="Digite seu nome" required>

          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" placeholder="exemplo@email.com" required>

          <label for="telefone">Telefone / WhatsApp</label>
          <input type="tel" id="telefone" name="telefone" placeholder="(00) 00000-0000" required>

          <button type="submit" id="cadastrar">Enviar Cadastro</button>
        </form>
      </section>
    `;
  }
}

function mostrarToast(mensagem) {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.innerText = mensagem;
    toast.classList.add("mostrar");

    setTimeout(() => {
      toast.classList.remove("mostrar");
    }, 3000);
  }
}

function salvarCadastro(event) {
    event.preventDefault(); // Cancela o envio padrão

    const nome = event.target.nome;
    const email = event.target.email;

    // Se estiver vazio, marca em vermelho e avisa
    if (!nome.value.trim() || !email.value.trim()) {
        mostrarToast("Preencha todos os campos obrigatórios!", "erro");
        if (!nome.value.trim()) nome.style.borderColor = "red";
        if (!email.value.trim()) email.style.borderColor = "red";
        return;
    }

    // Se estiver correto, salva no localStorage
    const dados = { nome: nome.value, email: email.value };
    let lista = JSON.parse(localStorage.getItem("cadastros")) || [];
    lista.push(dados);
    localStorage.setItem("cadastros", JSON.stringify(lista));

    // Sucesso
    mostrarToast("Cadastro realizado com sucesso!", "sucesso");
    event.target.reset();
    nome.style.borderColor = "";
    email.style.borderColor = "";
}

// Carregar página inicial ao abrir
navegar("inicio");
