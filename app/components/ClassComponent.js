import React, {Component} from 'react';


const HERMANOS = [
  {name: 'Mariau', hijos: [
    {name: 'Javier'},
    {name: 'Jacobo'},
    {name: 'Belen'}
  ], genre: 'F'},
  {name: 'Julio', hijos: [], genre: 'M'},
  {name: 'Belen', hijos: [
    {name: 'Jaime'},
    {name: 'Quique'}
  ], genre: 'F'}
];

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hermanos: HERMANOS
    };
    this.listHermanos = this.listHermanos.bind(this);
    this.sumHijos = this.sumHijos.bind(this);
    this.filterHermanas = this.filterHermanas.bind(this);
    this.findSister = this.findSister.bind(this);
    this.listHijos = this.listHijos.bind(this);
    this.listConHijos = this.listConHijos.bind(this);
  }

  listHermanos() {
    return this.state.hermanos.map( (hermano) => {
      return (
        <li key={hermano.name}>{hermano.name}</li>
      );
    } );
  }

  sumHijos() {
    return this.state.hermanos.reduce( (sum, hermano) => {
      return (sum + hermano.hijos.length);
    },0 );
  }

  filterHermanas() {
    function esMujer(hermano) {
      return(hermano.genre === 'F');
    }
    const HERMANAS = this.state.hermanos.filter(esMujer);
    return HERMANAS.map(hermana => {
      return (
        <li key={hermana.name}>{hermana.name}</li>
      );
    });
  }

  findSister() {
    function esMujer(hermano) {
      return(hermano.genre === 'F');
    }
    const HERMANA = this.state.hermanos.find(esMujer);
    return HERMANA.name;
  }

  listHijos(hermano) {
    return hermano.hijos.map(hijo => {
      return (
        <li key={hijo.name}>{hijo.name}</li>
      );
    });
  }

  listConHijos() {
    return this.state.hermanos.map(hermano => {
      return(
        <div>
          <li key={hermano.name}>{hermano.name}</li>
          <ul>
            {this.listHijos(hermano)}
          </ul>
        </div>
      );
    });
  }

  render() {
    return(
      <div>
        <p>This comes from the ClassComponent.</p>
        <p>List of hermanos:</p>
        <ul>
          {this.listHermanos()}
        </ul>
        <p>Total number of hijos: {this.sumHijos()}</p>
        <p>Filter hermanas:</p>
        <ul>
          {this.filterHermanas()}
        </ul>
        <p>Find the first sister: {this.findSister()}</p>
        <p>Hermanos con hijos:</p>
        <ul>
          {this.listConHijos()}
        </ul>
      </div>
    );
  }
}

export default ClassComponent;
