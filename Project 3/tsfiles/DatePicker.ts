import { DropDownUtils } from "./DropDowns";
import { CalendarView } from "./CalendarView";

class DatePicker {
    private readonly MONTH_DROP_DOWN_ID = "month-drop-down"
    private readonly YEAR_DROP_DOWN_ID = "year-drop-down"

    private readonly id: string
    private readonly onclick: () => void

    constructor(id: string, onclick: () => void) {
        this.id = id
        this.onclick = onclick
    }

    render(date: Date) {
        let month = date.getMonth()
        let year = date.getFullYear()
        let calendarDiv: HTMLElement = document.getElementById(this.id)!
        let monthDropDown: HTMLSelectElement = DropDownUtils.getMonthsDropDown(this.MONTH_DROP_DOWN_ID)
        let yearDropDown: HTMLSelectElement = DropDownUtils.getYearsDropDown(this.YEAR_DROP_DOWN_ID, year)
        monthDropDown.selectedIndex = month
        yearDropDown.selectedIndex = yearDropDown.options.length - 1
        monthDropDown.addEventListener("click", (element, event) => {
            
        })
        calendarDiv.appendChild(monthDropDown)
        calendarDiv.appendChild(yearDropDown)
        calendarDiv.appendChild(CalendarView.getCalendarTable(date))
    }

    private onDateChange()
}

let dp1 = new DatePicker("datepicker1", () => {})
dp1.render(new Date())

let dp2 = new DatePicker("datepicker2", () => {})
dp2.render(new Date("8/18/2020"))