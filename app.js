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

const app = createApp({
  data() {
    return appData;
  },
  methods: {
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

