const { createApp } = Vue;

let formRoomsDataBaseElements = [];
let room = {};
let roomInfo;
let newInfo;
let formRoomText;
let isOccupied;
let i;
let j;

for (i = 0; i < roomsDataBase.rooms.length; i++) {
  roomInfo = "";

  for (j = 0; j < roomsDataBase.rooms[i].beds.length; j++) {
    newInfo = roomsDataBase.rooms[i].beds[j].type;
    roomInfo = roomInfo + newInfo;
    roomInfo = roomInfo + ", ";
  }

  roomInfo = roomInfo.substring(0, roomInfo.length - 2);
  formRoomText = roomsDataBase.rooms[i].name + " (" + roomInfo + ")";
  isOccupied = roomsDataBase.rooms[i].occupied;
  room = {
    text: formRoomText,
    value: i,
    isOccupied: isOccupied
  };
  formRoomsDataBaseElements[i] = room;
}

let appData = {
  // all the data that the user enters in the form
  formUserData: {
    firstName: '',
    lastName: '',
    message: '',
    comment: ''
  },
  rooms: [],
  bookings: [],
  // options that the user can select
  formOptions: {
    startDate: '',
    endDate: '',
    headCount: null,
    formRoomList: '',
    formRoomsDataBaseElements: formRoomsDataBaseElements,
    headCountOptions: [
      { text: '1 fő', value: 1 },
      { text: '2 fő', value: 2 },
      { text: '3 fő', value: 3 },
      { text: '4 fő', value: 4 },
      { text: '5 fő', value: 5 }
    ]
  }
};



/* ChatGPT írta: 

export default {
  data() {
    return {
      rooms: []
    };
  },
  created() {
    this.fetchRooms();
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
          this.rooms = data;
        })
        .catch(error => {
          console.error('Request failed:', error);
        });
    }
  }
};
*/

const app = createApp({
  data() {
    return appData;

  },
  created() {
    this.fetchRooms();
    this.fetchBookings();
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
          this.rooms = data;
        })
        .catch(error => {
          console.error('Request failed:', error);
        });
    },

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
        })
        .catch(error => {
          console.error('Request failed:', error);
        });
    },

    onSubmit(event) {
      let popUpText = '';
      popUpText = "Név: " + `${this.formUserData.lastName}` + " " + `${this.formUserData.firstName}`;
      popUpText += "\n";
      popUpText += "Vendégek száma: " + this.formOptions.headCount;
      popUpText += "\n";
      popUpText += "Érkezés napja: " + this.formOptions.startDate;
      popUpText += "\n";
      popUpText += "Távozás napja: " + this.formOptions.endDate;
      popUpText += "\n";
      if (Number.isInteger(this.formOptions.formRoomList)) {
        popUpText += "Lakosztály: " + roomsDataBase.rooms[this.formOptions.formRoomList].name;
      } else {
        popUpText += "Lakosztály: Kérem válasszon szobát!";
      }
      popUpText += "\n";
      popUpText += "Megjegyzés: " + `${this.formUserData.comment}`;
      alert(popUpText);
    }
  }
});

app.mount('#app');