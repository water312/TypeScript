class TodoApp {
  /** @constructs TodoApp */
  constructor() {}
  /**
   * 할 일을 추가할 수 있다.
   * 
   * @param {string} text
   */
  addTodo(text) {}

  /**
   * 모든 할 일을 조회할 수 있다.
   * 
   * @returns {Todo[]} 전체 할일
   * 
   */
  getTodoList() {}

  /**
   * 모든 할 일을 필터링하여 조회할 수 있다.
   * 
   * @param {string} filterType
   * 
   * @returns {Todo[]} 필터링된 할일
   */
  getTodoListByFilter(filterType) {}

  /**
   * 할 일의 내용과 상태를 수정할 수 있다.
   * 
   * @param {Object} todo - 수정될 할 일
   * @param {string} [todo.name] - 수정될 내용
   * @param {string} [todo.status] - 수정될 상태
   */
  updateTodo({ id, text, status }) {}

  /**
   * 특정 할 일을 제거할 수 있다.
   * 
   * @param {number} id 
   */

  removeTodo(id) {}
}