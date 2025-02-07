// Liste des mots-clés à rechercher
const keywords = [
    'dns', 'ddos', 'dnssec', 'dns tunneling', 'tunneling', 'dns amplification attack',
    'amplification attack', 'mitm', 'rebinding attack', 'typosquatting',
    'domain takeover', 'dns cache poisoning', 'cache poisoning', 'dns spoofing', 'dns hijacking',
    'spoofing', 'hijacking'
];

// Fonction pour charger les données de plusieurs fichiers
async function loadData(startYear, endYear) {
    const data = [];
    for (let year = startYear; year <= endYear; year++) {
        const response = await fetch(`data/${year}V2.json`);
        if (response.ok) {
            const jsonData = await response.json();
            data.push({ year, cves: jsonData });
        } else {
            console.error(`Erreur de chargement pour ${year}V2.json`);
        }
    }
    return data;
}

// Fonction pour compter les occurrences des mots-clés
function countKeywordsPerYear(data, keywords) {
    const result = {};

    data.forEach(({ year, cves }) => {
        result[year] = {};
        keywords.forEach(keyword => (result[year][keyword] = 0));

        cves.forEach(({ tags }) => {
            tags.forEach(tag => {
                if (keywords.includes(tag)) {
                    result[year][tag]++;
                }
            });
        });
    });

    return result;
}

// Fonction pour générer des couleurs uniques
function generateUniqueColors(count) {
    const colors = [];
    const step = 360 / count; // Répartir uniformément les teintes sur le cercle chromatique
    for (let i = 0; i < count; i++) {
        const hue = Math.round(step * i);
        colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
}

// Fonction principale pour initialiser le graphique
async function initChart() {
    const startYear = 1999;
    const endYear = 2024;

    // Charger les données
    const rawData = await loadData(startYear, endYear);

    // Compter les mots-clés par année
    const counts = countKeywordsPerYear(rawData, keywords);

    // Générer des couleurs uniques pour chaque mot-clé
    const colors = generateUniqueColors(keywords.length);

    // Préparer les données pour Chart.js
    const labels = Object.keys(counts);
    const datasets = keywords.map((keyword, index) => ({
        label: keyword,
        data: labels.map(year => counts[year][keyword]),
        borderWidth: 1,
        fill: false,
        borderColor: colors[index], // Utiliser une couleur unique
        tension: 0.3
    }));

    // Initialisation du graphique
    const ctx = document.getElementById('cveChart').getContext('2d');
    new Chart(ctx, {
        type: 'line', // Utilisez 'bar' pour un graphique en barres
        data: {
            labels,
            datasets
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: {
                x: { title: { display: true, text: 'Année' } },
                y: { title: { display: true, text: 'Occurrences' } }
            }
        }
    });
}
// Initialiser le graphique
initChart();
// Fonction pour créer une table HTML des occurrences avec inversion
function createTableInverted(counts, keywords) {
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'table-striped', 'table-hover', 'text-center', 'mt-4');

    // Création de l'en-tête de la table
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const keywordHeader = document.createElement('th');
    keywordHeader.textContent = 'Mot-Clé';
    headerRow.appendChild(keywordHeader);

    Object.keys(counts).forEach(year => {
        const th = document.createElement('th');
        th.textContent = year;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Création du corps de la table
    const tbody = document.createElement('tbody');

    keywords.forEach(keyword => {
        const row = document.createElement('tr');
        const keywordCell = document.createElement('td');
        keywordCell.textContent = keyword;
        keywordCell.classList.add('font-weight-bold'); // Style pour les mots-clés
        row.appendChild(keywordCell);

        Object.keys(counts).forEach(year => {
            const cell = document.createElement('td');
            cell.textContent = counts[year][keyword] || 0; // 0 si aucune occurrence
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Ajout de la table au DOM
    document.getElementById('tableContainer').appendChild(table);
}

// Appel de la fonction après le chargement des données
async function initTableAndChart() {
    const startYear = 1999;
    const endYear = 2024;

    // Charger les données
    const rawData = await loadData(startYear, endYear);

    // Compter les mots-clés par année
    const counts = countKeywordsPerYear(rawData, keywords);

    // Créer la table inversée
    createTableInverted(counts, keywords);

    // Initialiser le graphique
    await initChart();
}

// Appeler la fonction principale
initTableAndChart();
