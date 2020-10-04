export const MeetupInfo = {
  template: `<ul class="info-list">
      <li v-if="organizer">
        <img class="icon info-list__icon" 
          alt="icon" 
          src="/assets/icons/icon-user.svg" />
        <span>{{ organizer }}</span>
      </li>
      <li v-if="place">
        <img class="icon info-list__icon" 
          alt="icon" 
          src="/assets/icons/icon-map.svg" />
        <span>{{ place }}</span>
      </li>
      <li v-if="date">
        <img class="icon info-list__icon" 
          alt="icon" 
          src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="isoShortDate">{{ localeDate }}</time>
      </li>
    </ul>`,

  props: {
    organizer: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },

  computed: {
    localeDate () {
      if (!this.date) return null;

      return new Date(this.date)
        .toLocaleDateString(
          navigator.language,
          {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }
        );
    },
    isoShortDate () {
      if (!this.date) return null;

      return new Date(this.date)
        .toISOString()
        .slice(0, 10);
    },
  },
};
