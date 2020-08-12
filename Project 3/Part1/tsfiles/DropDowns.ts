type DropdownOptionType = number | string

export class DropDownUtils {
    private static readonly MONTHS = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    static getYearsDropDown(id: string, currentYear: number): HTMLSelectElement {
        if (currentYear < 1970) throw new Error("Wrong Year Exception")
        let years = new Array(currentYear - 1970 + 1)
        for (let index = 1970; index <= currentYear; index++) { years[index-1970] = index }
        let yearOptions = DropDownUtils.getDropDown(years)
        let yearSelector = document.createElement("select")
        yearSelector.id = id
        yearOptions.forEach(option => yearSelector.add(option))
        return yearSelector
    }

    static getMonthsDropDown(id: string): HTMLSelectElement {
        let monthOptions = DropDownUtils.getDropDown(this.MONTHS)
        let monthSelector = document.createElement("select")
        monthSelector.id = id
        monthOptions.forEach(option => monthSelector.add(option))
        return monthSelector
    } 

    static getMonthIndex(value: string): number {
        return this.MONTHS.indexOf(value)
    }

   private static getDropDown(elements: Array<DropdownOptionType>): Array<HTMLOptionElement> {
        let optionElements = new Array<HTMLOptionElement>(elements.length)
        elements.forEach(optionName=>{
            let option = document.createElement("option")
            option.id = optionName.toString()
            option.text = optionName.toString()
            optionElements.push(option)
        })
        return optionElements
    }
}