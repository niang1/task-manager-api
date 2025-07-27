let users = [];
let currentPage = 1;
const itemsPerPage = 5;
let currentSortField = 'name';
let sortAsc = true;

async function fetchUsers() {
  const res = await axios.get('/allusers'); // Adjust route if needed
  users = res.data;
  renderUsers();
}

function renderUsers() {
  const tbody = document.getElementById('userTableBody');
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = [...users]
    .sort((a, b) => {
      const fieldA = a[currentSortField].toLowerCase();
      const fieldB = b[currentSortField].toLowerCase();
      return sortAsc
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    })
    .slice(start, start + itemsPerPage);

  tbody.innerHTML = '';
  for (const user of paginatedUsers) {
    const row = `<tr>
          <td><img class="avatar" src="data:image/png;base64,${user.avatar.toString(
            'base64'
          )}" /></td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>
            <button onclick="openTasksModal('${user._id}')">View Tasks</button>
            <button onclick="openEditModal('${user._id}')">Edit</button>
          </td>
        </tr>`;
    tbody.insertAdjacentHTML('beforeend', row);
  }

  document.getElementById(
    'pageInfo'
  ).innerText = `Page ${currentPage} of ${Math.ceil(
    users.length / itemsPerPage
  )}`;
}

function sortBy(field) {
  if (currentSortField === field) {
    sortAsc = !sortAsc;
  } else {
    currentSortField = field;
    sortAsc = true;
  }
  renderUsers();
}

function searchUsers() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  fetchUsers().then(() => {
    users = users.filter(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query)
    );
    currentPage = 1;
    renderUsers();
  });
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderUsers();
  }
}

function nextPage() {
  if (currentPage < Math.ceil(users.length / itemsPerPage)) {
    currentPage++;
    renderUsers();
  }
}

async function openTasksModal(userId) {
  const res = await axios.get(`/users/${userId}/tasks`);
  const list = document.getElementById('tasksList');
  list.innerHTML = '';
  res.data.forEach((task) => {
    list.insertAdjacentHTML(
      'beforeend',
      `<li>${task.description} (${task.completed ? '✅' : '❌'})</li>`
    );
  });
  showModal('tasksModal');
}

async function openEditModal(userId) {
  const user = users.find((u) => u._id === userId);
  if (user) {
    document.getElementById('editUserId').value = user._id;
    document.getElementById('editUserName').value = user.name;
    document.getElementById('editUserEmail').value = user.email;
    showModal('editModal');
  }
}

async function saveUser(e) {
  e.preventDefault();
  const id = document.getElementById('editUserId').value;
  const name = document.getElementById('editUserName').value;
  const email = document.getElementById('editUserEmail').value;

  await axios.patch(`/users/${id}`, { name, email });
  await fetchUsers();
  closeModals();
}

function showModal(id) {
  document.getElementById('modalOverlay').classList.add('active');
  document.getElementById(id).classList.add('active');
}

function closeModals() {
  document
    .querySelectorAll('.modal')
    .forEach((m) => m.classList.remove('active'));
  document.getElementById('modalOverlay').classList.remove('active');
}

fetchUsers();
