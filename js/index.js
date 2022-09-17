// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('#color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript

let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  fruitsList.innerHTML = "";
  for (let i = 0; i < fruits.length; i++) {
    let fruit = document.createElement('li');
    fruit.innerHTML = `Фрукт ` + i + `<br>` + fruits[i].kind +`<br>`+ fruits[i].color +`<br>`+ `Вес: ` + fruits[i].weight + ` кг`;
    function color(color, typeColor) { 
      if (fruits[i].color == color) {
      fruit.className = typeColor;
      }
    };

    color("фиолетовый", "fruit__item fruit_violet");
    color("зеленый", "fruit__item fruit_green");
    color("розово-красный", "fruit__item fruit_carmazin");
    color("желтый", "fruit__item fruit_yellow");
    color("светло-коричневый", "fruit__item fruit_lightbrown"); 
    color("розовый", "fruit__item fruit_pink"); 
    color("красный", "fruit__item fruit_red"); 
    color("коричневый", "fruit__item fruit_brown"); 
    color("оранжевый", "fruit__item fruit_orange"); 
    color("голубой", "fruit__item fruit_cyan"); 
    color("синий", "fruit__item fruit_blue"); 
    
    fruitsList.appendChild(fruit);
  }
};

 //первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  while (fruits.length > 0) {
    let random = getRandomInt(0, fruits.length-1);
    result.unshift(...fruits.splice(random, 1));
    }
    fruits = result;
      if (result === JSON.stringify(fruits)) {
        alert('Порядок не изменился!');
      }
      else display();
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let filter = fruits.filter((item) => {
    const minweight = document.querySelector('.minweight__input'); 
    const maxweight = document.querySelector('.maxweight__input'); 
    return item.weight >= minweight.value && item.weight <= maxweight.value;  
  });
  fruits = filter;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  return priority[a.color] > priority[b.color];
};

const priority = {
  "розовый": 0,
  "розово-красный": 1,
  "красный": 2,
  "коричневый": 3,
  "светло-коричневый": 4,
  "оранжевый": 5,
  "желтый": 6,
  "зеленый": 7,
  "голубой": 8,
  "синий": 9,
  "фиолетовый": 10
};

function quickSort_function(fruits, partition, left, right) {
 
  function swap(fruits, firstIndex, secondIndex) { // функция обмена элементов
    const temp = fruits[firstIndex];
    fruits[firstIndex] = fruits[secondIndex];
    fruits[secondIndex] = temp;
  };

  function partition(fruits, left, right) {  // функция разделитель
    var pivot = fruits[Math.floor((right + left) / 2)],
      i = left,
      j = right;
        while (i <= j) {
          while (fruits[i] < pivot) {
          i++;
          }
          while (fruits[j] > pivot) {
          j--;
          }
          if (i <= j) {
          swap(fruits, i, j);
          i++;
          j--;
          }
        }
  return i;
  };
  var index;
    if (fruits.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? fruits.length - 1 : right;
      index = partition(fruits, left, right);
        if (left < index - 1) {
          quickSort_function(fruits, left, index - 1);
        }
        if (index < right) {
          quickSort_function(fruits, left, right);
        }
    }
  return fruits;
};

const sortAPI = {
  bubbleSort(fruits, comparation) {
    // функция сортировки пузырьком
    const n = fruits.length;
    for (let i = 0; i < n-1; i++) { 
      for (let j = 0; j < n-1-i; j++) { 
        if (comparation(fruits[j], fruits[j+1])) { 
          let temp = fruits[j+1]; 
          fruits[j+1] = fruits[j]; 
          fruits[j] = temp; 
        }
      }   
    }         
  },

  //quickSort пришлось вынести в отдельную функцию quickSort_function, 
  //когда она полностью в const sortAPI => не сортировала вообще
  //сейчас сортирует некорректно, не по цвету, прошу помочь исправить

  quickSort(fruits, partition, left, right) {
    //функция быстрой сортировки
      quickSort_function(fruits, partition, left, right);
  }, 

  // выполняет сортировку и производит замер времени
  startSort(sort, fruits, comparation, partition) {
    const start = new Date().getTime();
    sort(fruits, comparation, partition);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if(sortKind == 'bubbleSort'){
    sortKind = 'quickSort';
  }
  else {
    sortKind = 'bubbleSort';
  };
  sortKindLabel.textContent = sortKind;
  sortTime = '';
  sortTimeLabel.textContent = sortTime;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
  console.log(sortTime);
});


/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // создание и добавление нового фрукта в массив fruits
  if (kindInput.value == '' || colorInput.value == '' || weightInput.value == '') {
		alert('Заполните все поля!');
	}
	else {
		fruits.push({ "kind": kindInput.value, "color": colorInput.value, "weight": weightInput.value });
	}
  display();
  // очистить форму
  kindInput.value = '';
  colorInput.value = '';
  weightInput.value = '';
});
