import { closeModal, openModal } from "./modal";
import { postData } from "../service/service";

function forms(formSelector, modalTimerId) {
  // получаем формы
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо скоро свяжемся",
    failure: "Что-то пошло не так...",
  };

  // подвязывает по формулы функция postData
  forms.forEach((item) => {
    bingPostData(item);
  });

  // функция для постинга данных
  function bingPostData(form) {
    // событие кнопки
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // выводим блок с сообщениями
      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
      // добавленее спинера после формы
      form.insertAdjacentElement("afterend", statusMessage);

      // запрос
      /* const request = new XMLHttpRequest(); */

      // сначала метод open чтобы настроить запрос принимает метод и путь
      /*  request.open('POST', 'server.php'); */

      // заголовок который говорит серверу что именно приходит принимает тип контента и второй заголовк
      // заголовок устанавливать не нужно при данном методе XMLHttpRequest и форм Дата
      // при отправке по json заголово нужен 'application/json'
      /*  request.setRequestHeader('Content-type', 'application/json'); */

      // создаем форм дата она формирует данные с формы. Формат ключ знаяение
      const formData = new FormData(form);

      // прогоняем formData в формат json

      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      // превращаем обычный объект в json
      /* const json = JSON.stringify(object); */

      // fetch запрос
      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });

      // отправка данных принимает форм дата
      /* request.send(json); */

      // навешивает обработчик событий, отслеживает load - конечная загрузка
      /*   request.addEventListener('load', () => {
                 // проверка на ошибки 
                 if (request.status === 200) {
                     console.log(request.response);
                     // можно вывести пользователю позитив отправки 
                     showThanksModal(message.success);
                     // очистка формы 
                     form.reset();
                     // удаление сообщения
                         statusMassege.remove(); 
                     
                 } else {
                     showThanksModal(message.failure);
                 }
 
             });
               */
    });
  }
  // Красивое оповещение пользователя
  function showThanksModal(massage) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal(".modal");

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
             <div class="modal__content">
                     <div data-close class="modal__close">&times;</div>
                     <div class="modal__title">${massage}</div>
             </div>
         `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal(".modal");
    }, 4000);
  }
}

export default forms;
