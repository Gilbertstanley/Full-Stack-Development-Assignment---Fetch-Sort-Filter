function fetchRepos() {
    fetch('https://api.github.com/orgs/google/repos')
    .then(res => res.json())
    .then(data => {
        const tableBody = document.querySelector('#repoTable tbody');
        tableBody.innerHTML = '';
        data.forEach(repo => {
            const row = document.createElement('tr');
            
            const urlCell = document.createElement('td');
            const urlLink = document.createElement('a');
            urlLink.href = repo.html_url;
            urlLink.textContent = repo.name;
            urlCell.appendChild(urlLink);
            row.appendChild(urlCell);

            const languageCell = document.createElement('td');
            languageCell.textContent = repo.language || 'N/A';
            row.appendChild(languageCell);

            const gitUrlCell = document.createElement('td');
            const gitUrlLink = document.createElement('a');
            gitUrlLink.href = repo.git_url;
            gitUrlLink.textContent = repo.git_url;
            gitUrlCell.appendChild(gitUrlLink);
            row.appendChild(gitUrlCell);

            const updatedAtCell = document.createElement('td');
            updatedAtCell.textContent = new Date(repo.updated_at).toLocaleString();
            row.appendChild(updatedAtCell);

            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}

function searchTable() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('repoTable');
    const tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td')[0];
        if (td) {
            const txtValue = td.textContent || td.innerText;
            tr[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? '' : 'none';
        }
    }
}

function sortTable(asc) {
    const table = document.getElementById('repoTable');
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.rows);

    rows.sort((a, b) => {
        const nameA = a.cells[0].textContent.toLowerCase();
        const nameB = b.cells[0].textContent.toLowerCase();
        if (nameA < nameB) return asc ? -1 : 1;
        if (nameA > nameB) return asc ? 1 : -1;
        return 0;
    });

    rows.forEach(row => tbody.appendChild(row));
}

fetchRepos();