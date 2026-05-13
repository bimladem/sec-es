const params = new URLSearchParams(window.location.search);
const id = params.get("ID");

fetch("dados.json")
  .then(r => r.json())
  .then(produtos => {
    const div = document.getElementById("conteudo");

    if (!id || !produtos[id]) {
      div.innerHTML = "<p>Loja não encontrada.</p>";
      return;
    }

    const loja = produtos[id];

    div.innerHTML = `
      <p><strong>Loja:</strong> ${id}</p>
      <p><strong>Localidade:</strong> ${loja.localidade}</p>
      <p><strong>P Aberto:</strong> ${loja.pAberto}</p>

      <button id="btnSec" style="margin-top:10px;">Ver Secções</button>

      <div id="secList" style="display:none; margin-top:15px;"></div>
    `;

    document.getElementById("btnSec").onclick = () => {
      const box = document.getElementById("secList");
      box.style.display = "block";

      box.innerHTML = loja.seccoes
        .map(s => `<p><strong>${s.nome}:</strong> ${s.pAberto} tarefas em aberto</p>`)
        .join("");
    };
  });

