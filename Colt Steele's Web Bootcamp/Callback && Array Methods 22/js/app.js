const conDisplay = {
    container: document.querySelector('#console'),
    consoleList: [],
    print(toPrint) {
        const p = document.createElement('p');
        this.consoleList.push(p);
        p.append(`> ${toPrint}`);
        this.container.append(p);

    }
};

// const movies = [
//   {
//     title: 'Amadeus',
//     score: 85
//   },
//   {
//     title: 'Stand By Me',
//     score: 85
//   },
//   {
//     title: 'Parasite',
//     score: 90
//   },
//   {
//     title: 'Alien',
//     score: 90
//   }
// ];

// const titles = movies.map((movie) => {
//   return movie.title;
// });
// titles; // ['Amadeus', 'Stand By Me', 'Parasite', 'Alien']

// setTimeout(console.log('Not good'), 3000); TypeError: console.log is not a function

const movies = [
    {
      title: 'Amadeus',
      score: 99,
      year: 1984
    },
    {
      title: 'Sharknado',
      score: 35,
      year: 2013
    },
    {
      title: '13 Going on 30',
      score: 70,
      year: 2004
    },
    {
      title: 'Stand By Me',
      score: 85,
      year: 1986
    },
    {
      title: 'Waterworld',
      score: 62,
      year: 1995
    },
    {
      title: 'Jingle All The Way',
      score: 71,
      year: 1996
    },
    {
      title: 'Parasite',
      score: 95,
      year: 2019
    },
    {
      title: 'Notting Hill',
      score: 77,
      year: 1999
    },
    {
      title: 'Alien',
      score: 90,
      year: 1979
    }
];
  
const goodMovies = movies.filter(movie => {
return movie.score > 80;
});
const badMovies = movies.filter(m => m.score < 70);
const recentMovies = movies.filter(m => m.year > 2000);
// Lets say we want to grab only the good movie titles, we can use filter and map to do this
const goodTitles = goodMovies.map(m => m.title);
// You also can do a one-liner
movies.filter(m => m.score > 80).map(m => m.title);
movies.filter(m => m.score < 70).filter(m => m.title);

const exams = [80, 98, 92, 78, 75, 90, 89, 81, 77];
exams.every(score => score >= 75); // true

const highestRated = movies.reduce((bestMovie, currMovie) => {
  if (currMovie.score > bestMovie.score) {
    return currMovie;
  }
  return bestMovie;
});

highestRated; // {title: "Amadeus", score: 99, year: 1984}

const evens = [2, 4, 6, 8];
const evensTotal = evens.reduce((sum, num) => {
  console.log(`accumulator: ${sum}, element: ${num}`);
  return sum + num;
});

const person = {
  firstName: 'Viggo',
  lastName: 'Mortensen',
  fullName: function() {
    return `${this.firstName} ${this.lastName}`;
  },
  shoutName: function() {
    console.log(this);
    setTimeout(() => {
      console.log(this);
      console.log(this.fullName());
    }, 3000);
  }
};