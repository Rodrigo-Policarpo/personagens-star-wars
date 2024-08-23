let urlPaginaAtual = 'https://swapi.dev/api/people';

window.onload = async () => {
    try {
        await carregarPersonagens(urlPaginaAtual)
    }
    catch (error) {
        console.log(error);
        alert('Erro ao carregar os cards');
    }

    const btnAnterior = document.getElementById('btn-anterior');
    const btnProximo = document.getElementById('btn-proximo');

    btnAnterior.addEventListener('click', carregarAnterior);
    btnProximo.addEventListener('click', carregarProxixmo);
};

async function carregarPersonagens(url) {
    const conteudo = document.getElementById('conteudo');
    conteudo.innerHTML = '';

    try {
        const resposta = await fetch(url);
        const respostaJson = await resposta.json();

        respostaJson.results.forEach((character) => {
            const cards = document.createElement("div");
            cards.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
            cards.className = "cards";

            const containerNome = document.createElement("div");
            containerNome.className = "container-nome";

            const nomePersonagem = document.createElement("span");
            nomePersonagem.className = "nome-personagem";
            nomePersonagem.innerText = `${character.name}`;

            containerNome.appendChild(nomePersonagem);
            cards.appendChild(containerNome);

            conteudo.appendChild(cards);
        }); 

        const btnAnterior = document.getElementById('btn-anterior');
        const btnProximo = document.getElementById('btn-proximo');

        btnAnterior.disabled = !respostaJson.previous;
        btnProximo.disabled = !respostaJson.next;

        btnAnterior.style.visibility = respostaJson.previous? "visible" : "hidden";

        urlPaginaAtual = url;
    }
    catch (error) {
        console.log(error);
        alert('Erro ao carrregar os personagens');
    }
}