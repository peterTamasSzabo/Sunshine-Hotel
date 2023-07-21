
//hozz létre egy createApp változót, ami vegye fel a Vue értékét!
const { createApp } = Vue;

//deklaráld az alábbi változókat és ahol szükséges előre jelezni, hogy jelezd, hogy array vagy object a data type!
let formRoomsDataBaseElements = [];
let room = {};
let roomInfo;
let newInfo;
let formRoomText;
let isOccupied;
let i;
let j;

//deklarálj és definiálj egy új változót: appData, ennek a változónak, a kezdő értéke ez az object legyen, ami következő:
let appData = {

  // all the data that the user enters in the form
  //az appData objectben hozz létre egy formUserData nevű objectet, amiben key-value pairek legyenek, a value-k stringek
  formUserData: {
    firstName: '',
    lastName: '',
    message: '',
    comment: ''
  },
  rooms: [],
  bookings: [],

  // options that the user can select
  //az appData objectben hozz létre egy formOptions nevű objectet, amiben key-value pairek legyenek
  formOptions: {
    startDate: '',
    endDate: '',
    headCount: null,
    formRoomList: '',
    formRoomsDataBaseElements: formRoomsDataBaseElements,
    //az appData objecten belüli formOptions objectben hozz létre egy headCountOptions nevű array-t, amiben legyen 5 névtelen object, bennük fejenként 2-2 key-value pairrel
    headCountOptions: [
      { text: '1 fő', value: 1 },
      { text: '2 fő', value: 2 },
      { text: '3 fő', value: 3 },
      { text: '4 fő', value: 4 },
      { text: '5 fő', value: 5 }
    ]
  }
};

/*létrehoz egy app nevű constant-ot, amit definiálunk egy createApp nevű functionnel, amiben van egy data nevű function, ami a fentebbi appData nevű object változóinak értékeit adja vissza. A createApp visszaadv valamit, és ez lesz az app értéke.
*/
const app = createApp({
  data() {
    return appData;
  },
  //a created az egy lifecycle hook, a DOM-megjelenítés előtt fut le
  created() {
    //meghívjuk a két functiont a DOM-megjelenítés előtt
    this.fetchRooms();
    this.fetchBookings();
  },

  methods: {
    //hozz létre a methods nevű Vue-s objectet, ami function-öket tartalmaz: egy fetchRooms, egy fetchBookings nevű és egy onSubmit nevű functiont

    /* a fetchRooms nevű function:
    - fetchelje a /rooms URL

      -ha sikerült: fetchelje/szerezze meg a MongoDB SunshineDB database-ből a rooms nevű collectiont, mint sunshineDB.rooms.json
      - ha nem sikerült csatlakozni a serverrel (attól még fetchelt) a SunshineDB MongoDB deployment rooms collectionjéhez, írjon ki a konzolra hibaüzenetet, indoklással
    
    ezután loopoljon */
    fetchRooms() {
      fetch('/rooms')
        .then(response => {
          //akkor fut, ha 200-as kóddal jött válasz a szerverről, vagy 500-as kód és akkor internal server errorral elszállt
          if (response.ok) {
            //a response.json egy Promise objectet ad vissza
            return response.json();
          } else {
            throw new Error('Request failed with status ' + response.status);
          }
        })
        .then(data => {
          this.roomsData = data;
          //hozz létre két for loopot, amiket nesteld, i és j ideiglenes változókkal: //
          /*az i for loop úgy működjön, hogy: 
            - i értéke 0-ról induljon, vagyis a nulladik indexű elemen álljon a loop elkezdésekor
            - minden egyes lefutás után növeld az i-változó értékét pontosan 1-el
            - a for loop addig fusson, amíg az i értéke kisebb mint roomsData elemeinek száma  */
          for (i = 0; i < this.roomsData.length; i++) {
            //roomInfo nevű változó data type-ja string
            roomInfo = "";
            /* a j for loop úgy működjön, hogy: 
              - j értéke 0-ról induljon, vagyis a nulladik indexű elemen álljon a loop elkezdésekor
              - minden egyes lefutás után növeld az j-változó értékét pontosan 1-el
              - a j for loop addig fusson, amíg az j értéke kisebb mint roomsData.beds elemeinek száma  */
            for (j = 0; j < this.roomsData[i].beds.length; j++) {
              /* az i és j változókat használó nested loopok, a roomsData-n belül található beds elemeken való végigfutás alatt a következőket tegyék:
              - a newInfo nevű változó értékét adja meg a loopok által talált ágyak típusaival
              - a roomInfo nevű változó stringjéhez adja hozzá a newInfo értékeit, vesszővel elválasztva   */
              newInfo = this.roomsData[i].beds[j].type;
              roomInfo = roomInfo + newInfo;
              roomInfo = roomInfo + ", ";
            }
            //rendeld hozzá az alábbi változókhoz a megfelelő adatokat
            roomInfo = roomInfo.substring(0, roomInfo.length - 2);
            formRoomText = this.roomsData[i].name + " (" + roomInfo + ")";
            isOccupied = this.roomsData[i].occupied;
            //rendeld hozzá a room nevű változóhoz, hogy ő egy object, az alábbi key-value párokkal:
            room = {
              text: formRoomText,
              value: i,
              isOccupied: isOccupied
            };
            this.formOptions.formRoomsDataBaseElements.splice(i, 1, room);
          }

        })
        //error handler fusson le, ha bármi nem működik, a diagnosztikai módszerének elvéről nincs információm
        .catch(error => {
          console.error('Request failed:', error);
        });
    },

    /*a fetchBookings nevű function:
    - ha fut a server.js fájl, fetchelje/szerezze meg a MongoDB SunshineDB deploymentből a bookings nevű collectiont, mint sunshineDB.bookings.json
    - ha nem sikerült csatlakozni a serverrel a SunshineDB MongoDB deployment bookings collectionjéhez, írjon ki a konzolra hibaüzenetet, indoklással
    
        ezután loopoljon
        */
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


    /* hozz létre egy onSubmit nevű functiont, aminek legyen egy event nevű paramétere, a függvénymagban a következőket tegye:
        - deklarálj egy popUpText nevű változót, és definiáld stringként  
        - a popUpText változó dinamikusan töltődjön fel új sorokba írt string-ekkel és azokhoz tartozzanak előzőleg definiált adatok
        - amennyiben választott lakosztályt a kliens, a formOptions.formRoomList data type-ja number lesz, ekkor írja ki a numberhez tartozó szoba nevét, ha nem választott, tehát a formOptions.formRoomList data type-ja nem number, akkor szólítsa fel szobaválasztásra
        - egy alert message-ként írja ki a popUpText változó teljes értékét */
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
        popUpText += "Lakosztály: " + this.roomsData[this.formOptions.formRoomList].name;
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