const { createApp } = Vue
const roomsDataBase = {
  "rooms": [
    {
      "name": "Szilvia",
      "beds": [
        {
          "type": "single"
        },
        {
          "type": "queen"
        }
      ],
      "occupied": false
    },
    {
      "name": "Anna",
      "beds": [
        {
          "type": "single"
        },
        {
          "type": "single"
        },
        {
          "type": "queen"
        }
      ],
      "occupied": true
    },
    {
      "name": "Luca",
      "beds": [
        {
          "type": "single"
        },
        {
          "type": "single"
        }
      ]
    },
    {
      "name": "Kata",
      "beds": [{
        "type": "queen"
      }],
      "occupied": false
    },
    {
      "name": "Liza",
      "beds": [
        {
          "type": "single"
        },
        {
          "type": "single"
        },
        {
          "type": "single"
        },
        {
          "type": "single"
        }
      ],
      "occupied": true
    }
  ]
};

/* nem-utolsó ágy-e? <-- módszer 1   95-97
if (roomsDataBase.rooms[i].beds.length - 1 > j) {
  roomInfo = roomInfo + ", ";
}
ezt meghagyom későbbre, hasznos*/

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

const app = createApp({
  data() {
    return {
      message: 'Biztos, ami biztos',
      formRoomList: '',
      formRoomsDataBaseElements: formRoomsDataBaseElements,
      firstName: '',
      lastName: '',
      headCount: '',
      headCounts: [
        { text: '1 fő', value: '1' },
        { text: '2 fő', value: '2' },
        { text: '3 fő', value: '3' },
        { text: '4 fő', value: '4' },
        { text: '5 fő', value: '5' }
      ],
      startDate: '',
      endDate: '',
      comment: ''
    }
  },
  methods: {

    /*  onSubmit(event) {
          let popUpText = "";
          alert(`Hello ${this.lastName} ${this.firstName}!\n${this.headCount}főre foglalt szobát nálunk\n${this.startDate}-től \n${this.endDate}-ig`)
          if (event) {
            alert(event.target.tagName)
          }
        }*/

    onSubmit(event) {
      let popUpText = '';


      popUpText = "Név: " + `${this.lastName}` + " " + `${this.firstName}`;
      popUpText += "\n";
      popUpText += "Vendégek száma: " + this.headCount;
      popUpText += "\n";
      popUpText += "Érkezés napja: " + this.startDate;
      popUpText += "\n";
      popUpText += "Távozás napja: " + this.endDate;
      popUpText += "\n";
      popUpText += "Lakosztály: " + roomsDataBase.rooms[this.formRoomList].name;
      popUpText += "\n";
      popUpText += "Megjegyzés: " + `${this.comment}`;
      alert(popUpText);

    }
  }
});

app.config.errorHandler = (err) => {
  console.log("hiba történt");
  console.log(err);
}

app.mount('#app');






