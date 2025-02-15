document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = '449fbda29b4102f8da9676cd8a524811c2021575475c66c4a8ca735342b9641b'; // chave de API Sympla
    const RECIFE_ID = 256; // ID da cidade de Recife no Sympla
    let eventos = []; // Variável para armazenar os eventos da API

    // Função para buscar eventos do Sympla
    function buscarEventosSympla() {
        fetch(`https://api.sympla.com.br/v3/events?city_id=${RECIFE_ID}`, {
            headers: { "s_token": API_KEY }
        })
        .then(response => response.json())
        .then(data => {
            eventos = data.data; // Armazena os eventos na variável eventos
            mostrarEventos(eventos); // Exibe os eventos na página
        })
        .catch(error => console.error("Erro ao carregar eventos do Sympla:", error));
    }

    // Função para exibir eventos na página
    function mostrarEventos(lista) {
        const listaEventos = document.getElementById("lista-eventos");
        listaEventos.innerHTML = ""; // Limpa a lista antes de adicionar novos eventos

        lista.forEach(evento => {
            const eventoHTML = `
                <div class="evento">
                    <img src="${evento.image}" alt="${evento.name}">
                    <h3>${evento.name}</h3>
                    <p><strong>📅 Data:</strong> ${new Date(evento.start_date).toLocaleDateString()}</p>
                    <p><strong>📍 Local:</strong> ${evento.venue.name}</p>
                    <a href="${evento.ticket_url}" target="_blank" class="btn">Ingressos</a>
                </div>
            `;
            listaEventos.innerHTML += eventoHTML;
        });
    }

    // Função para filtrar eventos
    function filtrarEventos() {
        const categoria = document.getElementById("filtro-categoria").value;
        const data = document.getElementById("filtro-data").value;
        const local = document.getElementById("filtro-local").value.toLowerCase();

        // Filtra os eventos
        const eventosFiltrados = eventos.filter(evento => {
            return (
                (!categoria || evento.category.name === categoria) &&
                (!data || evento.start_date.startsWith(data)) && // Verifica se a data do evento começa com a data filtrada
                (!local || evento.venue.name.toLowerCase().includes(local)) // Verifica se o local contém o nome filtrado
            );
        });

        mostrarEventos(eventosFiltrados); // Exibe os eventos filtrados
    }

    // Chama a função para buscar os eventos quando o documento for carregado
    buscarEventosSympla();

    // Adiciona um evento ao botão de filtro para chamar a função de filtragem
    document.querySelector(".filtros button").addEventListener("click", filtrarEventos);
});

                
