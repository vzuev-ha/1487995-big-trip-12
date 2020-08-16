import {getRandomInteger} from "../utils.js";

const generateEventType = () => {
  const eventTypes = [
    {
      name: `Taxi`,
      value: `taxi`,
      preposition: `to`,
      offers: [`Order Uber`]
    },
    {
      name: `Bus`,
      value: `bus`,
      preposition: `to`,
      offers: []
    },
    {
      name: `Train`,
      value: `train`,
      preposition: `to`,
      offers: [`Switch to comfort`, `Add meal`]
    },
    {
      name: `Ship`,
      value: `ship`,
      preposition: `to`,
      offers: []
    },
    {
      name: `Transport`,
      value: `transport`,
      preposition: `to`,
      offers: []
    },
    {
      name: `Drive`,
      value: `drive`,
      preposition: `to`,
      offers: [`Rent a car`]
    },
    {
      name: `Flight`,
      value: `flight`,
      preposition: `to`,
      offers: [`Add luggage`, `Switch to comfort`, `Add meal`, `Choose seats`, `Travel by train`]
    },

    {
      name: `Check-in`,
      value: `check-in`,
      preposition: `in`,
      offers: [`Add breakfast `]
    },
    {
      name: `Sightseeing`,
      value: `sightseeing`,
      preposition: `in`,
      offers: []
    },
    {
      name: `Restaurant`,
      value: `restaurant`,
      preposition: `in`,
      offers: []
    }
  ];

  const randomIndex = getRandomInteger(0, eventTypes.length - 1);

  const {name, value, preposition, offers} = eventTypes[randomIndex];

  const eventOffers = offers.map((offerName) => {
    return {
      name: offerName,
      price: generatePrice(),
      isSelected: Boolean(getRandomInteger(0, 1))
    };
  });

  return {
    name,
    value,
    preposition,
    eventOffers
  };
};


const generateDestination = () => {
  const destinations = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`];

  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  let description = ``;
  const maxCount = 5;
  let count = 0;

  for (const s of descriptions) {
    if (count >= maxCount) {
      break;
    }

    if (getRandomInteger(0, 1)) {
      description += s;
      count++;
    }
  }

  return {
    name: destinations[getRandomInteger(0, destinations.length - 1)],
    description,
    photos: Array(getRandomInteger(0, 6))
      .fill(`http://picsum.photos/248/152?r=${Math.random()}`)
  };
};


const generateStartTime = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const startTime = new Date();

  startTime.setDate(startTime.getDate() + daysGap);

  const h = getRandomInteger(0, 23);
  const m = 5 * getRandomInteger(0, 11);

  startTime.setHours(h, m, 0, 0);

  return new Date(startTime);
};


const generateEndTime = (startTime) => {
  const endTime = new Date(startTime);

  const d = getRandomInteger(0, 2);
  const h = getRandomInteger(0, 23);
  const m = 5 * getRandomInteger(0, 11);

  endTime.setTime(startTime.getTime() + (d * 24 * 60 * 60 * 1000) + (h * 60 * 60 * 1000) + (m * 60 * 1000));

  return new Date(endTime);
};


const generatePrice = () => {
  return 10 * getRandomInteger(1, 30);
};


export const generateEvent = () => {
  const startTime = generateStartTime();

  return {
    eventType: generateEventType(),
    destination: generateDestination(),
    startTime,
    endTime: generateEndTime(startTime),
    price: generatePrice(),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
