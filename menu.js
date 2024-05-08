function toggleSidebar() {
    const sidebar = document.querySelector('aside');
    const toggleButton = document.getElementById('sidebar-toggle');

    sidebar.classList.toggle('show-sidebar');
    toggleButton.textContent = sidebar.classList.contains('show-sidebar') ? '<' : '>';
}
