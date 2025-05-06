async function loadCatalog() {
    try {
        const response = await fetch('./data/shl_catalog_individual.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error loading catalog:", error);
        return [];
    }
}

function calculateRelevanceScore(query, assessment) {
    const queryLower = query.toLowerCase();
    const nameLower = assessment.assessment_name ? assessment.assessment_name.toLowerCase() : '';
    const descriptionLower = assessment.description ? assessment.description.toLowerCase() : '';
    const typeLower = assessment.test_type ? assessment.test_type.join(' ').toLowerCase() : '';

    let score = 0;
    const queryKeywords = queryLower.split(/\s+/);

    const importantKeywords = ['sales', 'java', 'software', 'technical', 'computer science', 'agile', 'competencies'];

    queryKeywords.forEach(keyword => {
        if (nameLower.includes(keyword)) {
            score += importantKeywords.includes(keyword) ? 5 : 3; // Higher weight for important keywords in name
        }
        if (descriptionLower.includes(keyword)) {
            score += importantKeywords.includes(keyword) ? 3 : 1;
        }
        if (typeLower.includes(keyword)) {
            score += importantKeywords.includes(keyword) ? 4 : 2; // Higher weight for important keywords in type
        }
    });

    return score;
}

async function recommendTests() {
    const query = document.getElementById('query').value;
    const catalog = await loadCatalog();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Searching...';

    if (!catalog || catalog.length === 0) {
        resultsDiv.innerHTML = '<p>No assessments available.</p>';
        return;
    }

    const scoredAssessments = catalog.map(assessment => ({
        assessment: assessment,
        score: calculateRelevanceScore(query, assessment)
    }));

    const relevantAssessments = scoredAssessments
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map(item => item.assessment);

    displayRecommendations(relevantAssessments);
}

function displayRecommendations(recommendations) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (recommendations.length === 0) {
        resultsDiv.innerHTML = '<p>No relevant assessments found.</p>';
        return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = thead.insertRow();

    const headers = ["Assessment Name", "URL", "Remote Testing", "Adaptive/IRT", "Duration", "Test Type"];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    recommendations.forEach(assessment => {
        const row = tbody.insertRow();

        const nameCell = row.insertCell();
        const nameLink = document.createElement('a');
        nameLink.href = assessment.url;
        nameLink.textContent = assessment.assessment_name;
        nameCell.appendChild(nameLink);

        const urlCell = row.insertCell();
        const urlLink = document.createElement('a');
        urlLink.href = assessment.url;
        urlLink.textContent = "View";
        urlCell.appendChild(urlLink);

        const remoteCell = row.insertCell();
        remoteCell.textContent = assessment.remote_support ? 'Yes' : 'No';

        const adaptiveCell = row.insertCell();
        adaptiveCell.textContent = assessment.adaptive_support ? 'Yes' : 'No';

        const durationCell = row.insertCell();
        durationCell.textContent = assessment.duration;

        const typeCell = row.insertCell();
        typeCell.textContent = assessment.test_type.join(', ');
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    resultsDiv.appendChild(table);
}