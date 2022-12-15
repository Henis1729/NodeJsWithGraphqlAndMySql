/****************************************************
 * ENCRYPTION / DECRYPTION / FILTER FUNCTIONS
 * Helper functions related to encrypting and decrypting passwords and filtering a query

 * FilterQuery: Filters query
****************************************************/
import _ from "lodash";

const Tables = {
	UserTlb: ["userName", "firstName", "lastName", "gender", "mobile", "email"],
	foodCategoryTlb: ["foodCategoryName", "description"],
	foodTlb: ["foodName", "description"],
	UOMTlb: ["UOM"],
	FoodUOMTlb: ["foodId"],
	CountryTlb: ["countryName"],
	StateTlb: ["stateName"],
	CourseTlb: ["title", "description"],
	eventTlb: ["title", "description"],
	feedTbl: ["title", "content"],
	baseFoodUomTlb: [""],
	recipeTable: ["title", "difficulty"],
	exerciseTlb: ["name"],
	mealTbl: ["meal.mealName"],
	planTlb: ["planName", "description"],
	pdfTlb: ["name", "description"],
	foodSuggestionTlb: ["foodName", "description", "status"],
	ContactUsTlb: ["name", "email", "subject", "message"],
	purchaseTbl: ["typeInPurchase", "status"]
};

export const FilterQuery = (filterString, tableKey) => {
	filterString = filterString?.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&') || "";
	if (filterString && filterString?.length > 0) {
		const keys = Tables[tableKey];
		const syntax = [];
		keys.forEach((ele) => {
			syntax.push({ [ele]: { $regex: filterString, $options: "i" } });
		});
		return { $and: [{ isDeleted: false }, { $or: syntax }] };
	} else {
		return { isDeleted: false };
	}
};

export const FilterQueryRegEx = (filterString, fieldName) => {
	let key = fieldName;
	filterString = filterString?.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&') || "";
	let syntax = [{ [`${key}`]: { $regex: filterString, $options: "i" } }];
	if (filterString && filterString?.length > 0) {
		filterString.search("oo") !== -1 && syntax.push({ [`${key}`]: { $regex: filterString?.replaceAll("oo", "u"), $options: "i" } });
		filterString.search("aa") !== -1 && syntax.push({ [`${key}`]: { $regex: filterString?.replaceAll("aa", "a"), $options: "i" } });
		filterString.search("ee") !== -1 && syntax.push({ [`${key}`]: { $regex: filterString?.replaceAll("ee", "i"), $options: "i" } });
		filterString.search("z") !== -1 && syntax.push({ [`${key}`]: { $regex: filterString?.replaceAll("z", "j"), $options: "i" } });
		filterString.search("j") !== -1 && syntax.push({ [`${key}`]: { $regex: filterString?.replaceAll("j", "z"), $options: "i" } });
		filterString.search("g") !== -1 && syntax.push({ [`${key}`]: { $regex: filterString?.replaceAll("g", "j"), $options: "i" } });
		filterString.search("u") !== -1 && syntax.push({ [`${key}`]: { $regex: filterString?.replaceAll("u", "oo"), $options: "i" } });
		filterString.search("i") !== -1 && syntax.push({ [`${key}`]: { $regex: filterString?.replaceAll("i", "ee"), $options: "i" } });
		syntax = _.uniqBy(filterString, "foodName.$regex")
	}
	return syntax;
};