export const MeetupCover = {
  template: `
    <div class="meetup-cover" 
      :style="bgUrl">
        <h1 v-if="title" 
          class="meetup-cover__title">{{ title }}</h1>
    </div>`,

  props: {
    link: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
  },

  computed: {
    bgUrl() {
      if (!this.link) return {};

      return {
        '--bg-url': `url(${this.link})`,
      };
    },
  },
};
