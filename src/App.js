import React, { Component } from 'react';
import './App.css';
import HeroList from './components/HeroList';
import {heroList} from './herolist.js';
import 'tachyons';
import SearchBox from './components/SearchBox';
import $ from 'jquery';

const arrayRemove = (arr, value) => {
  return arr.filter(el => {
      return el !== value;
  });
  }

class App extends Component {
  constructor() {
    super();
    this.state = {
      heroes: [],
      searchField: '',
      roles: []
    }
  }

  componentDidMount() {
    this.setState({heroes: heroList});
  }

  onChangeSearch = (event) => {
		this.setState({searchField: event.target.value})
  }
  
  handleCheckChange = () => {
    let arrOfRoles = [];
    arrOfRoles.push($('input:checked').map(function() {
        return this.id;
      })
      .get());
    this.setState({roles: arrOfRoles[0]});
  }
  
  render() {
    const {heroes, searchField, roles} = this.state;

    const arrayContainsArray = (superset, subset) => {
      if (0 === subset.length) {
        return true;
      }
      return subset.every(function (value) {
        return (superset.indexOf(value) >= 0);
      });
    }

    const checkHero = (hero) => {
      if (arrayContainsArray(hero.roles, roles)) {
        return hero.name.toLowerCase().includes(searchField.toLowerCase())
      }
    }
    
    const filteredHeroes = heroes.filter(checkHero);
    
    return !heroes.length ?
			<h2 className='tc'>Loading</h2>
      :
      ( !filteredHeroes.length ?
        <div className="App">
          <header className="App-header">HEROPICKER APP</header>
          <SearchBox 
            searchChange={this.onChangeSearch}
            handleCheckChange={this.handleCheckChange}/>
          <h2 className='tc'>There is no hero matched</h2>
        </div>
        :
        <div className="App">
          <header className="App-header">
            HEROPICKER APP
          </header>
          <SearchBox
            searchChange={this.onChangeSearch}
            handleCheckChange={this.handleCheckChange}
          />
          <h2>Strength</h2>
          <HeroList
            heroes={filteredHeroes}
            primAttr='Strength'/>
          <h2>Agility</h2>
          <HeroList
            heroes={filteredHeroes}
            primAttr='Agility'/>
          <h2>Intelligence</h2>
          <HeroList
            heroes={filteredHeroes}
            primAttr='Intelligence'/>
        </div>
      );
  }
}

export default App;
