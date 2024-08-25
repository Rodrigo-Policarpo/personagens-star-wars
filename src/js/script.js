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
            const cards = document.createElement('div');
            cards.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
            cards.className = 'cards';

            const containerNome = document.createElement('div');
            containerNome.className = 'container-nome';

            const nomePersonagem = document.createElement('span');
            nomePersonagem.className = 'nome-personagem';
            nomePersonagem.innerText = `${character.name}`;

            containerNome.appendChild(nomePersonagem);
            cards.appendChild(containerNome);

            cards.onclick = () => {
                const modal = document.getElementById('modal');
                modal.style.visibility = 'visible';

                const conteudoModal = document.getElementById('conteudo-modal');
                conteudoModal.innerHTML = '';

                const imagemPersonagem = document.createElement('div');
                imagemPersonagem.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
                imagemPersonagem.className = 'imagem-personagem';

                const nome = document.createElement('span');
                nome.className = 'detalhes-personagem';
                nome.innerText = `Nome: ${character.name}`;
                
                const alturaPersonagem = document.createElement('span');
                alturaPersonagem.className = 'detalhes-personagem';
                alturaPersonagem.innerText = `Altura: ${converterAltura(character.height)}`;
                
                const peso = document.createElement('span');
                peso.className = 'detalhes-personagem';
                peso.innerText = `Peso: ${converterPeso(character.mass)}`;
                
                const nascimento = document.createElement('span');
                nascimento.className = 'detalhes-personagem';
                nascimento.innerText = `Nascimento: ${converterNascimento(character.birth_year)}`;

                conteudoModal.appendChild(imagemPersonagem);
                conteudoModal.appendChild(nome);
                conteudoModal.appendChild(alturaPersonagem);
                conteudoModal.appendChild(peso);
                conteudoModal.appendChild(nascimento);
            }

            conteudo.appendChild(cards);
        }); 

        const btnAnterior = document.getElementById('btn-anterior');
        const btnProximo = document.getElementById('btn-proximo');

        btnAnterior.disabled = !respostaJson.previous;
        btnProximo.disabled = !respostaJson.next;

        btnAnterior.style.visibility = respostaJson.previous? 'visible' : 'hidden';

        btnProximo.style.visibility = respostaJson.next? 'visible' : 'hidden';

        urlPaginaAtual = url;
    }
    catch (error) {
        console.log(error);
        alert('Erro ao carrregar os personagens');
    }
}

async function carregarProxixmo() {
    if (!urlPaginaAtual) return;

    try {
        const resposta = await fetch(urlPaginaAtual);
        const respostaJson = await resposta.json(); 

        await carregarPersonagens(respostaJson.next);
    }
    catch (error) {
        console.log(error);
        alert('Não foi possível carregar a página');
    }
}

async function carregarAnterior() {
    if (!urlPaginaAtual) return;

    try {
        const resposta = await fetch(urlPaginaAtual);
        const respostaJson = await resposta.json();

        await carregarPersonagens(respostaJson.previous);
    }
    catch (error) {
        console.log(error);
        alert('Não foi possível carregar a página');
    }
}

function ocultarModal() {
    const modal = document.getElementById('modal');
    modal.style.visibility = 'hidden';
}

function converterAltura(peso) {
    if (peso === 'unknown') {
        return 'desconhecido';
    }

    return `${(peso / 100).toFixed(2)}m`;
}

function converterPeso(peso) {
    if (peso === 'unknown') {
        return 'desconhecido';
    }
    return `${peso}kg`;
}

function converterNascimento(nascimento) {
    if (nascimento === 'unknown') {
        return 'desconhecido'
    }
    return nascimento;
}