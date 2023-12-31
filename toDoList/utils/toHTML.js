import { Button } from '../components/Button';

export function tasksToHTML(tasks, taskManager) {
  [...taskManager.children].forEach((el) => {
    el.remove();
  });
  for (const task of tasks) {
    const element = document.createElement('div');
    element.className = 'task';
    element.id = task.id;

    element.insertAdjacentHTML(
      'afterbegin',
      `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        `
    );

    const deleteBTN = btnToHTML(
      new Button({
        className: '--delete',
        events: {
          click: (e) => {
            const taskItem = e.target.parentElement;

            taskItem.remove();
            tasks.pop();
          },
        },
        textContent: 'Delete',
      })
    );

    const doneBTN = btnToHTML(
      new Button({
        className: '--done',

        events: {
          click: (e) => {
            e.preventDefault();

            const taskItem = e.target.parentElement;

            e.target.remove();
            tasks.pop();
            done.appendChild(taskItem);
            console.log(tasks);
          },
        },
        textContent: 'Done',
      })
    );

    element.append(deleteBTN, doneBTN);
    taskManager.append(element);
  }
}

export function btnToHTML({ tagName, className, events, textContent }) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = textContent;

  for (const event in events) {
    const action = events[event];
    element.addEventListener(event, action);
  }

  return element;
}
