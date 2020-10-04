import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';

import { getMeetupCoverLink } from './data.js';

export const MeetupView = {
  name: 'MeetupView',

  template: `
    <div>

      <MeetupCover 
        :link="coverLink"
        :title="meetup.title" />

      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>

            <MeetupDescription
              :description="meetup.description" />

            <h3>Программа</h3>

            <MeetupAgenda
              :agenda="meetup.agenda" />

          </div>
          <div class="meetup__aside">

            <MeetupInfo
              :organizer="meetup.organizer"
              :place="meetup.place"
              :date="date" />

          </div>
        </div>
      </div>
    </div>`,

  components: {
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
  },

  computed: {
    coverLink () {
      if (!this.meetup.imageId) return null;

      return getMeetupCoverLink(this.meetup);
    },
    date () {
      if (!this.meetup.date) return null;

      return new Date(this.meetup.date);
    },
  },

  props: {
    meetup: {
      type: Object,
      required: true,
      validator: typeof value === 'object' && value.id,
    },
  },
};
