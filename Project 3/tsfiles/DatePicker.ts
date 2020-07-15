import { DropDownUtils } from "./DropDowns";
import { CalendarView } from "./CalendarView";

class DatePicker {
    private readonly MONTH_DROP_DOWN_ID = "month-drop-down"
    private readonly YEAR_DROP_DOWN_ID = "year-drop-down"
    private readonly CALENDAR_TABLE_ID = "calendar-table"

    private readonly id: string
    private readonly onclick: () => void

    private selectedYear: number = 2020;
    private selectedMonth: number = 1;

    constructor(id: string, onclick: () => void) {
        this.id = id
        this.onclick = onclick
    }

    render(month: number, year: number) {
        this.selectedMonth = Math.floor(month)
        this.selectedYear = Math.floor(year)
        let calendarDiv: HTMLElement = document.getElementById(this.id)!
        let monthDropDown: HTMLSelectElement = DropDownUtils.getMonthsDropDown(this.MONTH_DROP_DOWN_ID)
        let yearDropDown: HTMLSelectElement = DropDownUtils.getYearsDropDown(this.YEAR_DROP_DOWN_ID, year)
        let calendarTable: HTMLTableElement = CalendarView.getCalendarTable(this.CALENDAR_TABLE_ID, month, year)
        monthDropDown.selectedIndex = this.selectedMonth
        yearDropDown.selectedIndex = yearDropDown.options.length - 1
        monthDropDown.addEventListener("change",(event) => {
            let newMonth: string = monthDropDown.value
            this.reRenderTable(DropDownUtils.getMonthIndex(newMonth), this.selectedYear)
        })
        yearDropDown.addEventListener("change", (event) => {
            let newYear: string = yearDropDown.value
            this.reRenderTable(this.selectedMonth, Number.parseInt(newYear))
        })
        calendarDiv.appendChild(monthDropDown)
        calendarDiv.appendChild(yearDropDown)
        calendarDiv.appendChild(calendarTable)
    }

    private reRenderTable(month: number, year: number) {
        let oldCalendarTable = document.getElementById(this.CALENDAR_TABLE_ID)
        let newCalendarTable: HTMLTableElement = CalendarView.getCalendarTable(this.CALENDAR_TABLE_ID, month, year) 
        oldCalendarTable?.replaceWith(newCalendarTable)
    }
}

let dp1 = new DatePicker("datepicker1", () => {})
dp1.render(new Date().getMonth(), new Date().getFullYear())

let dp2 = new DatePicker("datepicker2", () => {})
dp2.render(8, 2020)