//1. olyan function írjak, amely összegzi a tagjait és visszaadja az összeget
/*let inputArray = [5, 15, 31, 50];

function sumArray(array) {
  let sum = 0;
  for (i=0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}

console.log(sumArray(inputArray));
*/

/*
//2. mi történik, ha még egy elemet hozzáadunk 

let complex = [5, 15, 31, 50, [12, 42]];

function sumArray(complex) {
  let sumArray = 0;
  for (i=0; i < complex.length; i++) {
    for (j=0; j < complex[[i]].length; j++) {
      sumArray += complex[j];
      console.log("j: " + j);
    }
    sumArray += complex[i];
    console.log("i: " + i );
  }
  return sumArray;
}

console.log(sumArray(complex));

*/

//3. írjak egy functiont, ami ezt megfordítja
/* let string = "próba";
function stringReverser (string) {
  let reversed = ""
  //fordítsa meg a string karaktereit, de nem használhatok reverse-t 
  for (let i = string.length -1; i>=0; i--) {
    reversed += string[i];
  }
  console.log(reversed);
  return reversed;
}

stringReverser(string);

*/

//Bonusz feladatok/gondolatok Andristól gyakorolni: 

//1. Egy stringben van egy mondatunk és azt várjuk vissza, hogy a szavak sorrendje ne változzon, csak a szavak betűi legyenek fordítva!

//2. Hogyan állapítod meg valamiről, hogy array-e. MDN: isArray + manuális változat is van, isArray nélkül: MDN typeOf

//3. az emeletes array-es összeadósat megcsinálni (interjú, 2-es feladat)

//4. tipp bármi gyakorlás jól jön, érdemes gyakorolni, ha bonyolultnak érzek egy megoldási tervet, érdemes leírni pszeudo-kóddal

