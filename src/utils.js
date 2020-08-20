import moment from 'moment';


export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.AFTEREND:
      if (container.parentElement.lastElementChild === container) {
        container.parentElement.append(element);
      } else {
        container.parentElement.insertBefore(element, container.nextElementSibling);
      }
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Принцип работы прост:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
export const createElement = (template) => {
  const newElement = document.createElement(`div`); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstElementChild; // 3
};
// Единственный нюанс, что HTML в строке должен иметь общую обёртку,
// то есть быть чем-то вроде <nav><a>Link 1</a><a>Link 2</a></nav>,
// а не просто <a>Link 1</a><a>Link 2</a>


// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


export const veryOldMoment = moment(`19800101`, `YYYYMMDD`);


export const getMomentTimeAsString = (inputMoment) => {
  return moment(inputMoment).format(`HH:mm`);
};

export const getMomentMonthDayAsString = (inputMoment) => {
  return moment(inputMoment).format(`MMM DD`);
}

export const getMomentDayAsString = (inputMoment) => {
  return moment(inputMoment).format(`DD`);
}

export const getMomentISOFormat = (inputMoment) => {
  return moment(inputMoment).toISOString();
}

export  const getMomentSlashedFormat = (inputMoment) => {
  return moment(inputMoment).format(`YY/MM/DD HH:mm`);
}


export const getTimeBetween = (startMoment, endMoment) => {
  const d = moment(endMoment).diff(startMoment, `days`);
  const h = moment(endMoment).diff(startMoment, `hours`) % 24;
  const m = moment(endMoment).diff(startMoment, `minutes`) % 60;

  let gapString = ``;

  if (d > 0) {
    gapString += d.toString().padStart(2, `0`) + `D `;
  }
  if (h > 0) {
    gapString += h.toString().padStart(2, `0`) + `H `;
  }
  if (m > 0) {
    gapString += m.toString().padStart(2, `0`) + `M `;
  }

  return gapString;
}
