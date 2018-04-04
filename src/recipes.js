import React, {Component} from 'react';
import Popup from "reactjs-popup";
class Recipes extends Component{
    constructor(props){
        super(props)
        this.state={
            recipeTerm:'',
            ingredientTerm:''
        }
        this.show = this.show.bind(this)
    }
    componentWillMount(){
        this.setState({
            recipeTerm:this.props.name,
            ingredientTerm:this.props.ingredients
        })
    }
    show(target){
        let reClick=false;
        if(document.getElementById(target).classList.contains('show')){
            reClick=true
        }
        const list = document.querySelectorAll('.ingredientContainer');
        list.forEach((x)=>x.classList.remove('show'))
        if(!reClick){
            document.getElementById(target).classList.add('show')
        }
    }
    handleSubmit(x){
        this.props.edit(x);

    }
    render(){
    return (
    <div>    
        <h3 className="item" onClick={x => this.show(`ingredients-${this.props.id}`)}> {this.props.name}</h3>
        <div className="ingredientContainer" id={`ingredients-${this.props.id}`}>
        <h4>Ingredients</h4>
            <ul>
            {this.props.ingredients.map((x) =>{
            return <li className="ingred-item" key={`${this.props.name}-${x}`}> {x} </li>
            })}
            </ul>
            <Popup
                trigger={<button className="btn btn-basic btn-edit"> Edit </button>}
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
                    <form onSubmit={e=> {this.handleSubmit(e); close()}}>
                    <h4> Recipe Name </h4>
                    <input className="form-control" type="text" id="recipe" value={this.state.recipeTerm} onChange={e => this.setState({recipeTerm:e.target.value})}/>
                    <h4> Ingredients </h4>
                    <input className="form-control" type="text" id="ingredient" value={this.state.ingredientTerm} onChange={e => this.setState({ingredientTerm:e.target.value})}/>
                    <button className="btn btn-success btn-submit">Submit</button>
                    </form>
                </div>
            )}
            </Popup>
            <button className="btn btn-danger btn-delete" onClick={this.props.delete}>Delete</button>
            </div>
    </div>    
    )
    }
};


export default Recipes;