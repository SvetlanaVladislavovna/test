// Тестовое задание
// https://docs.google.com/document/d/1WUnmlXSRYtP3stc-XmSkJXCsFK7gI9BTB4ykqZ3O7S0/edit

// Вакансия
// https://staraya-kupavna.hh.ru/vacancy/92976588?hhtmFrom=chat

// Этот код ожидает, пока HTML документ полностью загрузится, и затем начинает процесс построения дерева.
document.addEventListener("DOMContentLoaded", function () {
  // Загружаем данные из файла data.json с помощью функции fetch
  fetch("./data.json")
    // Получаем ответ и преобразуем его в формат JSON
    .then((response) => response.json())
    // После успешного преобразования данных вызываем функцию renderTree, передавая ей массив услуг из полученных данных
    .then((data) => renderTree(data.services))
    // В случае возникновения ошибки при загрузке данных, выводим сообщение об ошибке в консоль
    .catch((error) => console.error("Ошибка при загрузке данных:", error));
});

// Функция renderTree принимает массив услуг и строит дерево на основе этих данных
function renderTree(services) {
  // Находим элемент с классом "tree", в который будем добавлять узлы дерева
  const treeElement = document.querySelector(".tree");

  // Очищаем содержимое элемента "tree", чтобы начать с чистого листа
  treeElement.innerHTML = "";

  // Фильтруем корневые узлы, т.е. те, у которых нет родителей
  const rootNodes = services.filter((service) => service.head === null);

  // Для каждого корневого узла создаем элемент списка и добавляем его в дерево
  rootNodes.forEach((rootNode) => {
    const li = document.createElement("li");
    // Выводим название и цену услуги в узле дерева
    li.textContent = `${rootNode.name} (${rootNode.price})`;
    treeElement.appendChild(li);

    // Если у корневого узла есть потомки, вызываем функцию buildTree для построения их дерева
    if (rootNode.node === 1) {
      li.appendChild(buildTree(rootNode, services));
    }
  });
}

// Функция buildTree строит дерево для указанного узла и его потомков
function buildTree(node, services) {
  // Создаем элемент списка для потомков текущего узла
  const ul = document.createElement("ul");

  // Фильтруем потомков текущего узла
  const children = services.filter((service) => service.head === node.id);

  // Сортируем потомков по порядку
  children.sort((a, b) => a.sorthead - b.sorthead);

  // Для каждого потомка создаем элемент списка и добавляем его в дерево
  children.forEach((child) => {
    const li = document.createElement("li");
    // Выводим название и цену услуги в узле дерева
    li.textContent = `${child.name} (${child.price})`;
    ul.appendChild(li);

    // Если у текущего потомка есть дети, вызываем рекурсивно функцию buildTree для построения их дерева
    if (child.node === 1) {
      li.appendChild(buildTree(child, services));
    }
  });

  // Возвращаем построенное дерево потомков
  return ul;
}
