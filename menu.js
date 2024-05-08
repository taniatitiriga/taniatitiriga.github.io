function toggleSidebar() {
    const sidebar = document.querySelector('aside');
    const toggleButton = document.getElementById('sidebar-toggle');
    const articles = document.querySelectorAll('.arttool');

    sidebar.classList.toggle('show-sidebar');
    toggleButton.textContent = sidebar.classList.contains('show-sidebar') ? '<' : '>';

    articles.forEach(article => {
        article.style.marginLeft = sidebar.classList.contains('show-sidebar') ? 'calc(25% + 15px)' : '0';
    });
}
