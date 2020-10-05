/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left"
            @click="onClickPrevButton()"></button>
          <div>{{ monthYear }}</div>
          <button class="rangepicker__selector-control-right"
            @click="onClickNextButton()"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div v-for="day in days" 
          :key="day.index"
          :class="{'rangepicker__cell_inactive': day.inactive}"
          class="rangepicker__cell">
            {{ day.day }}
            <a v-for="meetup in day.meetups" 
              :key="meetup.id"
              class="rangepicker__event">{{ meetup.title }}</a>
          </div>

        <!--div class="rangepicker__cell rangepicker__cell_inactive">28</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">29</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">30</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">31</div>
        <div class="rangepicker__cell">
          1
          <a class="rangepicker__event">Митап</a>
          <a class="rangepicker__event">Митап</a>
        </div>
        <div class="rangepicker__cell">2</div>
        <div class="rangepicker__cell">3</div-->
      </div>
    </div>
  </div>`,

  data: () => {
    return {
      date: new Date(),
    };
  },

  computed: {
    meetupsMap() {
      const result = {};

      this.meetups.forEach(item => {
        const dayKey = new Date(item.date).toLocaleDateString();

        result[dayKey] = result[dayKey] || [];
        result[dayKey].push(item);
      });

      return result;
    },
    monthYear () {
      const localeString = this.date
        .toLocaleString(
          navigator.language,
          {
            month: 'long',
            year: 'numeric'
          }
        );

      return localeString.replace(' г.', '');
    },
    firstDay () {
      return new Date(new Date(this.date).setDate(1));
    },
    days () {
      const currentMonth = this.date.getMonth();
      const firstDayOfMonth = this.firstDay.getDay();
      const firstDayOfGrid = new Date(this.firstDay)
        .setDate(this.firstDay.getDate() - firstDayOfMonth);

      let startDate = new Date(firstDayOfGrid);
      let isHideTailInactive = false;

      return [...new Array(6 * 7)]
        .map((_, index) => {
          startDate.setDate(startDate.getDate() + 1);

          const inactive = startDate.getMonth() !== currentMonth;
          const dayKey = startDate.toLocaleDateString();

          if (index > 0 && inactive && !(index % 7)) {
            isHideTailInactive = true;
          }

          return {
            day: startDate.toLocaleString(
              navigator.language,
              {
                day: 'numeric',
              },
            ),
            inactive,
            dayKey,
            meetups: this.meetupsMap[dayKey],
            isHideTailInactive,
            index,
          };
        })
        .filter(({ isHideTailInactive }) => !isHideTailInactive)
    },
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  methods: {
    onClickPrevButton () {
      const currentMonth = this.firstDay.getMonth();

      this.date = new Date(new Date(this.firstDay).setMonth(currentMonth - 1));
    },
    onClickNextButton () {
      const currentMonth = this.firstDay.getMonth();

      this.date = new Date(new Date(this.firstDay).setMonth(currentMonth + 1));
    },
  },

  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц

  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации

  // Методы понадобятся для переключения между месяцами
};
