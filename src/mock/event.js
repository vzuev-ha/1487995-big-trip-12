import {getRandomInteger} from "../utils.js";
import moment from 'moment';


const generateEventType = () => {
  const eventTypes = [
    {
      name: `Taxi`,
      value: `taxi`,
      preposition: `to`,
      offers: [
        {
          shortName: `Order Uber`,
          fullName: `Order Uber`,
          value: `uber`
        }
      ]
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
      offers: [
        {
          shortName: `Switch to comfort`,
          fullName: `Switch to comfort class`,
          value: `comfort`
        },
        {
          shortName: `Add meal`,
          fullName: `Add meal`,
          value: `meal`
        }
      ]
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
      offers: [
        {
          shortName: `Rent a car`,
          fullName: `Rent a car`,
          value: `rent`
        }
      ]
    },
    {
      name: `Flight`,
      value: `flight`,
      preposition: `to`,
      offers: [
        {
          shortName: `Add luggage`,
          fullName: `Add luggage`,
          value: `luggage`
        },
        {
          shortName: `Switch to comfort`,
          fullName: `Switch to comfort class`,
          value: `comfort`
        },
        {
          shortName: `Add meal`,
          fullName: `Add meal`,
          value: `meal`
        },
        {
          shortName: `Choose seats`,
          fullName: `Choose seats`,
          value: `seats`
        },
        {
          shortName: `Travel by train`,
          fullName: `Travel by train`,
          value: `train`
        }
      ]
    },

    {
      name: `Check-in`,
      value: `check-in`,
      preposition: `in`,
      offers: [
        {
          shortName: `Add breakfast`,
          fullName: `Add breakfast`,
          value: `breakfast`
        }
      ]
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

  const eventOffers = offers.map((offer) => {
    return {
      offer,
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
      .fill(undefined)
      .map(() => `http://picsum.photos/248/152?r=${Math.random()}`)
  };
};


const generateStartMoment = () => {
  const maxDaysGap = 7;

  return moment()
    .add(getRandomInteger(-maxDaysGap, maxDaysGap), `days`)
    .hours(getRandomInteger(0, 23))
    .minutes(5 * getRandomInteger(0, 11));
};


const generateEndMoment = (startMoment) => {
  return moment(startMoment)
    .add(getRandomInteger(0, 2), `days`)
    .hours(getRandomInteger(0, 23))
    .minutes(5 * getRandomInteger(0, 11));
};


const generatePrice = () => {
  return 10 * getRandomInteger(1, 30);
};


export const generateEvent = () => {
  const startMoment = generateStartMoment();

  return {
    eventType: generateEventType(),
    destination: generateDestination(),
    startMoment,
    endMoment: generateEndMoment(startMoment),
    price: generatePrice(),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
