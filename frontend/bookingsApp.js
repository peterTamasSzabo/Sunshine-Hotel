const { createApp } = Vue;

//initial variable declarations:
let appData = {
  rooms: [],
  bookings: [],
  showTable: false,
  showServerError: false,
  roomsData: [],
  formUserData: {
    firstName: '',
    lastName: '',
    comment: '',
    dateOfArrival: '',
    dateOfDeparture: '',
    numberOfGuests: null,
    formRoom: ''
  },
  formOptions: {
    numberOfGuestsOptions: [
      { text: '1 fő', value: 1 },
      { text: '2 fő', value: 2 },
      { text: '3 fő', value: 3 },
      { text: '4 fő', value: 4 },
      { text: '5 fő', value: 5 }
    ]
  }
};
//vue application:
createApp({
  data() {
    return appData;
  },
  created() {
    this.fetchBookings();
    this.fetchRooms();
  },
  methods: {

    fetchBookings() {
      fetch('/bookings')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Request failed with status ' + response.status);
          }
        })
        .then(data => {
          this.bookings = data;
          this.bookings.reverse();
        })
        .catch(error => {
          console.error('Request failed:', error);
        });
    },

  fetchRooms() {
    fetch('/rooms')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request failed with status ' + response.status);
        }
      })
      .then(data => {
        this.roomsData = data;
        this.showTable = true;
      })
      .catch(error => {
        console.error('Request failed:', error);
      });
  }
}

}).mount('#app');