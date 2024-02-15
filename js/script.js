// Sayfa yüklendiğinde yapılacaklar listesini göster
document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
  });
  
  // Yapılacaklar listesini localStorage'dan al
  function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }
  
  // Yapılacaklar listesini ekrana göster
  function renderTasks() {
    const tasks = getTasks();
    const list = document.getElementById('list');
    list.innerHTML = '';
  
    tasks.forEach(function(task, index) {
      const li = document.createElement('li');
      li.textContent = task;
      li.addEventListener('click', function() {
        li.classList.toggle('checked');
        updateTasks();
      });
  
      const span = document.createElement('span');
      span.textContent = '\u00D7';
      span.className = 'close';
      span.addEventListener('click', function(event) {
        event.stopPropagation();
        tasks.splice(index, 1);
        updateTasks();
      });
  
      li.appendChild(span);
      list.appendChild(li);
    });
  }
  
  // Yeni bir görev ekle
  function newElement() {
    const inputValue = document.getElementById('task').value;
    if (inputValue === '') {
      showErrorToast();
      return;
    }
    
    const tasks = getTasks();
    tasks.push(inputValue);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    showSuccessToast();
  }
  
  // Yapılacakları güncelle
  function updateTasks() {
    const tasks = [];
    const list = document.getElementById('list');
    list.childNodes.forEach(function(node) {
      if (!node.classList || !node.classList.contains('checked')) {
        tasks.push(node.textContent);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Başarılı ekleme toast göster
  function showSuccessToast() {
    const toast = document.getElementById('liveToast');
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
  }
  
  // Boş ekleme hatası toast göster
  function showErrorToast() {
    const toast = document.getElementById('liveToastError');
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
  }
  