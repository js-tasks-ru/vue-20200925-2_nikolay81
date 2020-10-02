import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Возвращает url иконки события в зависимости от типа события
 * Если тип не известен или отсутствует, возвращаем дефолтный url [other]
 * 
 * @param {string | null} type - тип события
 * @returns {string} - относительный адрес иконки
 */
function getAgendaIconUrl (type) {
  const icon = agendaItemIcons[type] || agendaItemIcons.other;
  
  return `/assets/icons/icon-${icon}.svg`
}

/**
 * Возвращает дефолтное название события в зависимости от типа события
 * Если тип не известен или отсутствует, возвращаем дефолтное название [other]
 * 
 * @param {string | null} type - тип события
 * @returns {string} - дефолтное название
 */
function getAgendaDefaultTitle (type) {
  return  agendaItemTitles[type] || agendaItemTitles.other;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    loaded: false,
    rawMeetup: null,
  },

  mounted () {
    this.loadMeetup()
  },

  computed: {
    meetup () {
      const date = this.rawMeetup?.date
        ? new Date(this.rawMeetup.date)
        : null;
      const localeDate = this.getLocaleDate(date);
      const dateTime = this.getDateTime(date);
      const agenda = (this.rawMeetup?.agenda || [])
        .map(item => ({
          ...item,
          icon: getAgendaIconUrl(item?.type),
          title: item.title || getAgendaDefaultTitle(item?.type)
        }))

      return {
        ...this.rawMeetup,
        agenda,
        date,
        dateTime,
        localeDate,
      };
    },
    coverUrl () {
      if (!this?.meetup?.imageId) return {};

      return {
        '--bg-url': `url(${getMeetupCoverLink(this?.meetup)})`
      };
    },
  },

  methods: {
    async loadMeetup () {
      const result = await fetch(`${API_URL}/meetups/${MEETUP_ID}`)
        .then(
          responce => responce.json()
        );

      this.rawMeetup = result;
      this.loaded = true;
    },
    getLocaleDate (date) {
      if (!date) return null;

      return new Date(date)
        .toLocaleDateString(
          navigator.language,
          {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }
        );
    },
    getDateTime (date) {
      if (!date) return null;

      return new Date(date)
        .toISOString()
        .slice(0, 10);
    },
  },
});
