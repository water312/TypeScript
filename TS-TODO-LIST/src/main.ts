import './style.css';

interface Todo {
  id: number;
  content: string;
  isDone: boolean;
}

enum FilterStatus {
  All = 'all',
  Completed = 'complete',
  Active = 'not-complete',
}

type FilterType = `${FilterStatus}`;

class TodoApp {
  filterStatus: FilterType;
  todoList: Todo[];
  constructor() {
    this.todoList = [];
    this.filterStatus = FilterStatus.All;
    this.initEvent();
  }

  initEvent() {
    const inputEl = document.querySelector('#todo-input');
    const controlButtonElements = document.querySelectorAll('div.control > button.btn');

    controlButtonElements.forEach(button => {
      const [, buttonClass] = button.classList.value.split(' ');

      button.addEventListener('click', (event: MouseEventInit) => {
        this.filterStatus = buttonClass as FilterType;

        this.toggleFilterStatus(event);
        this.render();
      })

    })

    inputEl?.addEventListener('keydown', this.addTodo.bind(this));
  }
  toggleFilterStatus(event: MouseEventInit) {
    const controlButtonElements = document.querySelectorAll('div.control > button.btn');
    controlButtonElements.forEach(btn => btn.classList.remove('active'));

    const targetElement = ((event as MouseEvent).target) as HTMLButtonElement;
    if(targetElement){
      targetElement.classList?.add('active');
    }
  }

  addTodo(event: KeyboardEventInit) {
    if (event.key !== 'Enter') {
      return;
    }
      const target = <HTMLInputElement>(event as KeyboardEvent).target;

      if(!target.value) {
        return;
      }

      this.todoList.push({
        id: this.todoList.length + 1,
        isDone: false,
        content: target.value,
      });

      target.value = '';

      this.render();
  }

  getTodoListByFilter(filterType: FilterType) {
    if(filterType === FilterStatus.All) {
      return this.todoList;
    }
    if(filterType === FilterStatus.Completed) {
      return this.todoList.filter(todo => todo.isDone);
    }
    if(filterType === FilterStatus.Active) {
      return this.todoList.filter(todo => !todo.isDone);
    }
  }

  /**
   * 할 일의 내용과 상태를 수정할 수 있다.
   * 
   * @param {Object} todo - 수정될 할 일
   * @param {string} [todo.text] - 수정될 내용
   * @param {string} [todo.status] - 수정될 상태
   */

  updateTodoContent(event : MouseEventInit , selectedId: Todo['id']) {
    const inputText = 
    (event as MouseEvent).target &&
    ((event as MouseEvent).target as HTMLDivElement).innerText;

    if(!inputText){
      return;
    }

    const selectedIndex = this.todoList.findIndex(
      (todo) => todo.id === selectedId
    );
    const selectedTodo = this.todoList[selectedIndex];
    const newTodo = {
      ...selectedTodo,
      content: inputText,
    };

    this.todoList.splice(selectedIndex, 1, newTodo);
    this.render();
  }

  updateTodoStatus(selectedId: Todo['id']){
    const selectedIndex = this.todoList.findIndex(
      (todo) => todo.id === selectedId
    );
    const selectedTodo = this.todoList[selectedIndex];
    const newTodo = {
      ...selectedTodo,
      isDone: !selectedTodo.isDone,
    };

    this.todoList.splice(selectedIndex, 1, newTodo)
    this.render();
  }

  /**
   * 특정 할 일을 제거할 수 있다.
   * 
   * @param {number} id 
   */

  removeTodo(selectedId: Todo['id']) {
    this.todoList = this.todoList.filter(todo => todo.id !== selectedId);

    this.render();
  }

  generateTodoList(todo: Todo) {
    const containerEl = document.createElement('div');
    const todoTemplate = `<div class= "item__div">
    <input type='checkbox' ${todo.isDone && 'checked'}/>
    <div class='content ${todo.isDone && 'checked'}' contentEditable>${
      todo.content
    }</div>
    <button>X</button>
    </div>`;

    const deleteButtonEl = containerEl.querySelector('button');
    const checkboxEl = containerEl.querySelector('input[type=checkbox]');
    const contentEl = containerEl.querySelector('.content');

    contentEl?.addEventListener('blur', (event: MouseEventInit) =>
     this.updateTodoContent(event, todo.id),
     );
     checkboxEl?.addEventListener('change', () => 
      this.updateTodoStatus(todo.id),
     )
    deleteButtonEl?.addEventListener('click', () => this.removeTodo(todo.id));

    containerEl.classList.add('item');
    containerEl.innerHTML = todoTemplate;

    if(deleteButtonEl){
      containerEl.appendChild(deleteButtonEl);
    }

    return containerEl;
  }

  render() {
    const todoListEl = document.querySelector('.todo-items');
    const todoCountEl = <HTMLSpanElement>document.querySelector('#todo-count');
    todoListEl?.replaceChildren();

    const currentTodoList = this.getTodoListByFilter(this.filterStatus);

    const fragment = document.createDocumentFragment();
    const todoListComponent = this.getTodoListByFilter(this.filterStatus)?.map((todo) =>
     this.generateTodoList(todo),
     );

     if(todoListComponent){
       fragment.append(...todoListComponent);
       todoListEl?.appendChild(fragment);
     }

     if(todoCountEl && currentTodoList) {
       todoCountEl.innerText = String(currentTodoList.length);
     }

  }
}

const todoApp = new TodoApp();
todoApp.render();