import React,{Component} from 'react';
import Aux from '../../hoc/Aux1';
import Burger from "../../Componets/Burger/Burger.js";
import BuildControls from "../../Componets/Burger/BuildControls/BulidControls";
import Modal from "../../Componets/UI/Modal/Modal";
import OrderSummary from "../../Componets/Burger/OrderSummary/OrderSummary";
const INGREDIENT_PRICES = {
    salad:0.5,
    cheese: 0.4,
    meat: 2,
    bacon: .4
};
class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }
    state = {ingredients:{
        salad: 0,
        bacon:0,
        cheese:0,
        meat:0,
        cheese:0
    },
    totalPrice:4,
    purchasable: false,
    purchasing:false
    }

    purchaseHandler = () =>{
        this.setState({purchasing:true})
    }
    updatePurchaseState (ingredients){
    
        const sum = Object.keys(ingredients).map(igKey =>{
            return ingredients[igKey];
        }).reduce((sum, el )=>{
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler= (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updateIngredients ={
            ...this.state.ingredients
        };
        updateIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+priceAddition;
        this.setState({
            totalPrice: newPrice, ingredients: updateIngredients
        })    
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updateIngredients ={
            ...this.state.ingredients
        };
        updateIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice, ingredients: updateIngredients
        })    
        this.updatePurchaseState(updateIngredients);

    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }
    
    purchaseContinueHandler=()=>{
        alert("you Continue")
    }
    
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}><OrderSummary 
                ingredients={this.state.ingredients}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                price={this.state.totalPrice}
                /></Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler} ingredientRemoved = {this.removeIngredientHandler}
                disabled={disabledInfo} price={this.state.totalPrice} purchasable = {this.state.purchasable}
                ordered={this.purchaseHandler}

                />
            </Aux>
        );
    }
}

export default BurgerBuilder;