import { MenuTagInterface } from "../Tag/MenuTag.interface"
import { RecipeTagInterface } from "../Tag/RecipeTag.interface"
import { menuTagList, allRecipesTag } from "../../assets/mock_data/TagData"	
import { RecipeItemInterface} from "../Recipe/Recipe.interface"

export interface ContextInterface  {
    currentMenues: {
		selectedMenu: number[],
		menuTags: MenuTagInterface[],
		maxSelection: number
    }
    onSelect: {
	handleSelection?: (id: number) => void
    }
    currentRecipes: {
		recipeTags: RecipeTagInterface[] | undefined,
		selectedRecipes: number[],
    },
    onSelectRecipe: {
		handleSelection?: (id: number) => void
    },
	getClassname: {
		getClassName?: (id: number, tagType: string) => boolean
	},
	getRecipesToDisplay: {
		getRecipesToDisplay?: () => RecipeItemInterface[]
	},
	getSelectedMenuTags: {
		getSelectedMenuTags?: () => MenuTagInterface[]
	},
	getSelectedRecipesTags: {
		getSelectedRecipesTags?: () => RecipeTagInterface[]
	}
}

export const contextInitializer = {
	currentMenues: {
        selectedMenu: [1, 2, 3],
        menuTags: menuTagList,
        maxSelection: 3
    },
    onSelect: {
        handleSelection: undefined
	},
	currentRecipes: {
		recipeTags: allRecipesTag,
		selectedRecipes: [1, 2, 3, 4, 5, 6, 7, 8],
	},
    onSelectRecipe: {
		handleSelection: undefined
	},
	getClassname: {
		getClassName: undefined
	},
	getRecipesToDisplay: {
		getRecipesToDisplay: undefined 
	},
	getSelectedMenuTags: {
		getSelectedMenuTags: undefined
	},
	getSelectedRecipesTags: {
        getSelectedRecipesTags: undefined
	}
}
