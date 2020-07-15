type filterable = string | number

type filterFunc = (criteria?: (f: filterable) => boolean,
				   callback?: (a: Array<filterable>) => void)
				   => filterFunc | filterable[]

let cs142MakeMultiFilter = (list: filterable[]): filterFunc => {

	var currentArray = list

	let p: filterFunc = (filterCriteria?: (f: filterable) => boolean,
					 callback?: (a: Array<filterable>) => void) => {
		if (!filterCriteria && !callback) {
			return currentArray
		}
		let criteria = (filterCriteria) ? filterCriteria : () => true
		let filteredArry = currentArray.filter(element => criteria(element))
		if (callback) {
			callback.call(currentArray, filteredArry)
		}
		currentArray = filteredArry
		return p
	}
	return p
}
