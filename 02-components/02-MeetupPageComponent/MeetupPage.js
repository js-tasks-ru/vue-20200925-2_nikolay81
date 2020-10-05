import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `
    <MeetupView v-if="meetup" 
      :meetup="meetup" />`,

  components: {
    MeetupView,
  },

  data: {
    meetup: null,
  },

  mounted () {
    this.loadMeetup();
  },

  methods: {
    async loadMeetup () {
      const meetup = await fetchMeetup(MEETUP_ID);

      this.meetup = meetup;
    },
  },
};
