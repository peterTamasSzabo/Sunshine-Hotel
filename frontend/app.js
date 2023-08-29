const { createApp } = Vue;

let formRoomsDataBaseElements = [];
let room = {};
let roomInfo;
let newInfo;
let formRoomText;
let isOccupied;
let i;
let j;
let appData = {
  formUserData: {
    firstName: '',
    lastName: '',
    comment: '',
    dateOfArrival: '',
    dateOfDeparture: '',
    numberOfGuests: null,
    formRoom: ''
  },
  rooms: [],

  formOptions: {
    formRoomsDataBaseElements: formRoomsDataBaseElements,
    numberOfGuestsOptions: [
      { text: '1 fő', value: 1 },
      { text: '2 fő', value: 2 },
      { text: '3 fő', value: 3 },
      { text: '4 fő', value: 4 },
      { text: '5 fő', value: 5 }
    ]
  },
  showForm: true,
  showServerError: false,
  showMobileMenu: false,
  isPageRendered: false
};



const app = createApp({

  data() {
    return appData;
  },

  created() {
    this.fetchRooms();
  },

  mounted() {
    this.isPageRendered = true;
  },

  methods: {

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
          for (i = 0; i < this.roomsData.length; i++) {
            roomInfo = "";
            for (j = 0; j < this.roomsData[i].beds.length; j++) {
              newInfo = this.roomsData[i].beds[j].type;
              roomInfo = roomInfo + newInfo;
              roomInfo = roomInfo + ", ";
            }
            roomInfo = roomInfo.substring(0, roomInfo.length - 2);
            formRoomText = this.roomsData[i].name + " (" + roomInfo + ")";
            isOccupied = this.roomsData[i].occupied;
            room = {
              text: formRoomText,
              value: i,
              isOccupied: isOccupied
            };
            this.formOptions.formRoomsDataBaseElements.splice(i, 0, room);
          }
        })
        .catch(error => {
          console.error('Request failed:', error);
        });
    },

    postFormData(allFormUserData) {
      fetch('/insertBooking', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allFormUserData)
      })
        .then(response => {
          if (response.ok) {
            console.log("response ok");
            return response.json();
          } else {
            throw new Error('Request failed with status ' + response.status);
          }
        })
        .then(data => {
          this.showForm = !data.successfulDatabaseInsert;
          this.showServerError = !data.successfulDatabaseInsert;
        })
        .catch(error => {
          this.showServerError = true;
          console.error('Request failed:', error);
        });
    },

    onSubmit(event) {
      let allFormUserData = {
        formUserData: {
          firstName: this.formUserData.firstName,
          lastName: this.formUserData.lastName,
          comment: this.formUserData.comment,
          dateOfArrival: this.formUserData.dateOfArrival,
          dateOfDeparture: this.formUserData.dateOfDeparture,
          numberOfGuests: this.formUserData.numberOfGuests
        }
      };

      if (Number.isInteger(this.formUserData.formRoom)) {
        allFormUserData.formUserData.formRoom = this.formUserData.formRoom;
      } else {
        console.log("Kérem válasszon lakosztályt!");
      }

      this.postFormData(allFormUserData);
    },

    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    }
  }
});

app.mount('#app');

