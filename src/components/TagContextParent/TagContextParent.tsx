import React from "react"
import { AppState, appStateInitializer } from "../../interfaces/App/App.interface"
import { RecipeTagInterface } from "../../interfaces/Tag/RecipeTag.interface";
import "../../assets/styles/styles.css"
import Tag from "../../components/Displaying/Tag/Tag";
import MenuContextInterface, { MenuContext } from "../../context/MenuContext";
import { menuTagList, allRecipesTag, seasons, traditional, specialDiet, winter, summer, fall, spring, appetizer, diet, dessert, vegan} from "../../assets/mock_data/TagData";
//import { MenuTagInterface } from "../../interfaces/Tag/MenuTag.interface"
import {RecipeContext} from "../../context/RecipeContext";
import { RecipeTagList } from "../../assets/mock_data/TagData";
import Recipe  from "../../components/Displaying/Recipe/Recipe"
import RecipeTag from "../Filtering/Tag/RecipeTag/RecipeTag";
import { RecipeTagType } from "../../interfaces/Tag/RecipeTag.interface";
import { MenuTagInterface } from "../../interfaces/Tag/MenuTag.interface";

export default class TagContextParent extends React.Component<{}, AppState> {

	constructor(props: any) {
    super(props);
		this.state = appStateInitializer
		console.log(this.state)
		let ret: RecipeTagInterface[] | undefined = this.getSelectedRecipes();
		console.log(ret);
	}

	getCorrespondingTag = (id: number) => {

		//console.log("got corresponding tag called");

		let all = menuTagList;
		let i = 0;
		while (i < menuTagList.length)
		{
			if (menuTagList[i].id === id)
			{
				return menuTagList[i].tags;
			}
			i++;
		}
	}

	//Permet de sélectionner les recettes (sélectionnables) en fonction du menu, mise à jour du contexte
	//TODO: a reprendre avec recipeTags
	//handleRecipeSelection = (id: number) => {

	//	//console.log("handle recipe called");

	//	let newArray: number[] | undefined = [];
	//	if (this.state.currentRecipes.selectedRecipes.includes(id))
	//	{
	//		for (let i = 0; i < this.state.currentRecipes.selectedRecipes.length; i++)
	//		{
	//			if (this.state.currentRecipes.selectedRecipes[i] != id)
	//				newArray.push(this.state.currentRecipes.selectedRecipes[i])
	//		}
	//	}
	//	else
	//	{
	//		newArray = this.state.currentRecipes.selectedRecipes;
	//		//if (this.state.currentRecipes.selectedRecipes?.includes(0))
	//		//	newArray = [id];
	//		//if (id == 0 )
	//		//	newArray = [0];
	//		//else
	//			newArray = [...this.state.currentRecipes.selectedRecipes, id];
	//	}

	//	this.setState
	//	({
	//		currentMenues: {
	//			selectedMenu: this.state.currentMenues.selectedMenu,
	//			menuTags: this.state.currentMenues.menuTags,
	//			maxSelection: this.state.currentMenues.maxSelection
	//		},
	//		currentRecipes: {
	//			//preSelectedRecipes: this.state.currentRecipes.preSelectedRecipes,
	//			//selectedRecipes: newArray,
	//			recipeTags: this.state.currentRecipes.recipeTags,
	//			//clearedRecipes: this.state.currentRecipes.clearedRecipes,
	//			//clearedRecipesNames: this.state.currentRecipes.clearedRecipesNames,
	//			//maxSelection: newArray.length
	//		}})
	//}

	//Permet de sélectionner les menus, mise à jour du contexte
	handleMenuSelection = (id: number) =>  {
		if (!id)
			return;

		console.log("Handle Menu Selection called");

		let newArray: number[] = [];

		if (this.state.currentMenues.selectedMenu.includes(id))
		{
			for (let i = 0; i < this.state.currentMenues.selectedMenu.length; i++)
			{
				if (this.state.currentMenues.selectedMenu[i] != id)
					newArray.push(this.state.currentMenues.selectedMenu[i])
			}
			if (newArray.length == 0)
			{
				newArray = [1];
			}
		}
		else
		{
			newArray = this.state.currentMenues.selectedMenu;
			if (this.state.currentMenues.selectedMenu.includes(0))
				newArray = [id]
			else if (id == 0)
				newArray = [0];
			else
				newArray = [...this.state.currentMenues.selectedMenu, id];
		}
		this.setState({
			currentMenues: {
				selectedMenu: newArray,
				menuTags: this.state.currentMenues.menuTags,
				maxSelection: this.state.currentMenues.maxSelection
			}},
			() => {
				let ret: RecipeTagInterface[] | undefined = this.getSelectedRecipes();
				console.log(ret);
				this.setState({
				currentMenues: {
					selectedMenu: newArray,
					menuTags: this.state.currentMenues.menuTags,
					maxSelection: this.state.currentMenues.maxSelection
				},
				currentRecipes: {
					//preSelectedRecipes: [],
					//selectedRecipes: this.state.currentRecipes.selectedRecipes,
					recipeTags: ret,
					//clearedRecipes: ret,
					//clearedRecipesNames: this.state.currentRecipes.clearedRecipesNames,
				}
				})
			})
		
	}

	//Permet de retourner les recettes en fonction de la sélection du menu
	//TODO: a renommer
	onMenuSelectionDisplayRecipes = () => {
		let newArray: any[] = [];
		
		//console.log("On menu Selection called");

		let tags: any;

		if (this.state.currentMenues.selectedMenu)
		{
			for (let i = 0; i < this.state.currentMenues.selectedMenu.length; i++)
			{
				let len: any = 0
				tags = this.getCorrespondingTag(this.state.currentMenues.selectedMenu[i]);
				newArray = [...newArray, tags]
			}
		}
		return (newArray);
	}

	//Permet d'extraire l'id et le nom (label) des recettes dépendantes des sélection
	getSelectedRecipes = () => 
	{
		console.log("getSelectedRecipes called");

		//let newArray: RecipeTagInterface[] | any = this.onMenuSelectionDisplayRecipes();

		let newArray: RecipeTagInterface[] = [];
		console.log(newArray);
		//let selectedRecipes: RecipeTagInterface[];

		//Si il sont tous sélectionnés, il faut renvoyer la liste entière
		if (this.state.currentMenues.selectedMenu.length == 3)
		{
			console.log("all selected");

			return allRecipesTag;
		}

		//TODO: corriger, dirty
		//if (this.state.selectedMenus)

		console.log("selected meny is" + this.state.currentMenues.selectedMenu)
		if (this.state.currentMenues.selectedMenu.includes(1))
		{
			console.log("one");
			newArray = [...newArray, winter];
			newArray = [...newArray, summer];
			newArray = [...newArray, fall];
			newArray = [...newArray, spring];
		}
			
		if (this.state.currentMenues.selectedMenu.includes(2))
		{
			//console.log("two");
			newArray = [...newArray, appetizer];
			newArray = [...newArray, dessert];
		}
			
		if (this.state.currentMenues.selectedMenu.includes(3))
		{
			//console.log("three");
			newArray = [...newArray, vegan];
			newArray = [...newArray, diet];
		}
		console.log(newArray);
		return (newArray);
			

		//let newArrayId: number[] = [];
		//let newArrayNames: string[] = [];

		//let i: number = 0
		//let totalLen: number = newArray.length;

		//console.log("total len " + totalLen);
	

		//let l: number = 0;
		////récupération des propriétés du tableau des recipes
		//while (l < totalLen)
		//{
		//	while (i < newArray[l].length)
		//	{
		//		console.log(i + " :");
		//		console.log(newArray[l][i].id);
		//		console.log(newArray[l][i].label);
		//		newArrayId = [...newArrayId, newArray[l][i].id];
		//		newArrayNames = [...newArrayNames, newArray[l][i].label];
		//		i++;
		//	}
		//	l++;
		//}
		

		//let ret = { ids: newArrayId, labels: newArrayNames}

		////Retour avec ces infos d'un object d'interface RecipeTagInterface[]
		//let obj: RecipeTagInterface[] = []

		//let k: number = 0;
		//let m: number = 0;
		//while (m < totalLen)
		//{
		//	k = 0;
		//	while (k < newArray[m].length)
		//	{
		//		//if (!newArrayId[k])
		//		//	return;
		//		console.log(newArrayId[m])
		//		console.log(newArrayNames[m])
		//		obj.push({id: newArrayId[m], label: newArrayNames[m]})
		//		k++;
		//	}
		//	m++;
		//}
		
		////return (obj);
		return([]);
	}

	//Permet de filtrer pour qu'il n'y ait pas de doublons dans les tags recettes
	setClearedRecipes = (cleared: any, clearedNames: string[]) =>
	{
		//console.log("set cleared recipes called");

		this.setState({
			currentMenues: {
				selectedMenu: this.state.currentMenues.selectedMenu,
				menuTags: this.state.currentMenues.menuTags,
				maxSelection: this.state.currentMenues.maxSelection
			},
			currentRecipes: {
				//preSelectedRecipes: this.state.currentRecipes.preSelectedRecipes,
				//selectedRecipes: this.state.currentRecipes.selectedRecipes,
				recipeTags: this.state.currentRecipes.recipeTags,
				//clearedRecipes: cleared,
				//clearedRecipesNames: clearedNames,
				//maxSelection: this.state.currentRecipes.maxSelection
			}
		})
	}

	//getClearedRecipes = () => 
	//{
	//	//console.log("--------");
	//}

	componentDidUpdate()
	{
		//console.log("Updated component");
		let ret: RecipeTagInterface[] | undefined = this.getSelectedRecipes();
		//console.log(ret);
		//console.log(this.state);
	}

	render() {
		return (
		<>
			<MenuContext.Provider
                value={
                    {currentMenues: {
                        selectedMenu: this.state.currentMenues.selectedMenu,
                        menuTags: this.state.currentMenues.menuTags,
                        maxSelection: 3}, 
                    onSelect: {
                        handleSelection: this.handleMenuSelection}}}>
            <RecipeContext.Provider
                value={
                    {currentRecipes: {
						//preSelectedRecipes: this.state.currentRecipes.preSelectedRecipes,
						//selectedRecipes: this.state.currentRecipes.,
						recipeTags: this.state.currentRecipes.recipeTags,
						}
						//clearedRecipes: this.state.currentRecipes.clearedRecipes,
						//maxSelection: this.state.currentRecipes.maxSelection
				}}>
                <Tag />
				{/*<Recipe />*/}
				</RecipeContext.Provider>
			</MenuContext.Provider>
		</>)
	}
}
