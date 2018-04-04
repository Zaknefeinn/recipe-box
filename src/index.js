import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Popup from "reactjs-popup";
import './style/main.css';
import Recipes from './recipes';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            recipes:[],
            empty: true
        };
        this.handleEdit = this.handleEdit.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
    }
    componentWillMount(){
        const recipes = JSON.parse(localStorage.getItem('recipes'));
        if(recipes !== null && recipes.length > 0){
        this.setState({recipes});
        this.setState({empty: false});
        } 
    }
    componentWillUpdate(nextProps, nextState){
        localStorage.setItem('recipes', JSON.stringify(nextState.recipes))
    }
    handleAdd(e){
        const recipe = document.getElementById('recipe').value;
        const ingredients = document.getElementById('ingredient').value.split(',');
        this.setState({recipes: [...this.state.recipes, {name:recipe, ingredients:ingredients, id:this.generateKey(recipe) }]})
        this.setState({empty: false});
    }
    generateKey(x){
        return `${x}_${ new Date().getTime() }`.split(' ').join('_').replace(/[^\w\s]/gi, '');
    }
    handleDelete(e){
        this.setState({recipes: [...this.state.recipes.filter((x)=> {return x.id !== e}) ] })
        if(this.state.recipes.length === 0){
            console.log('hit')
        }
    }
    handleEdit(e, prev){
        const recipe = document.getElementById('recipe').value;
        const ingredients = document.getElementById('ingredient').value.split(',');
        const tempObj = Object.assign([], this.state.recipes);
        const tempObj1 = tempObj.find((x)=> x.id === prev)
             tempObj1.name = recipe;
             tempObj1.ingredients = ingredients;
        this.setState({recipes:tempObj})
    }

    render(){
        const recipes = this.state.recipes;

        console.log(this.state.empty)
        return(
            <div className="container">
            <div  className="well">
            {this.state.empty ? <h2>Add your recipes here!</h2>:<h2>Recipes!</h2>}
            {
                recipes.map((x, index) => {
                    return <Recipes name={x.name} ingredients={x.ingredients} key={x.id} id={x.id} delete={e => this.handleDelete(x.id)} edit={(e) => {this.handleEdit(e.target, x.id); e.preventDefault()}} index={index}/>
                })
            }

            </div>
                <Popup
                    trigger={<button onClick={this.openModal} className="btn btn-primary add-recipe"> Add Recipe </button>}
                    modal
                    closeOnDocumentClick
                >
                {close => (
                <div className="popup-container">
                    <div className="title">
                    <a className="close" onClick={close}>
                        &times;
                    </a>
                        <h3>Add a Recipe!</h3>
                    </div>
                    <form onSubmit={e => {this.handleAdd(e.target); close(); e.preventDefault()}}>
                    <h4> Recipe Name </h4>
                    <input className="form-control" type="text" id="recipe" placeholder="Name of the recipe"/>
                    <h4> Ingredients </h4>
                    <input className="form-control" type="text" id="ingredient" placeholder="Seperate each ingredient by a comma. ie: eggs, bacon, milk, bread"/>
                    <button className="btn btn-success btn-submit">Submit</button>
                    </form>
                </div>
                            )}
                </Popup>
            </div>

        )
        
    }
}

ReactDOM.render(<App />, document.querySelector('.root'));