import { DropDownUtils } from "./DropDowns";
import { CalendarView } from "./CalendarView";

class DatePicker {
    private readonly MONTH_DROP_DOWN_ID = "month-drop-down"
    private readonly YEAR_DROP_DOWN_ID = "year-drop-down"
    private readonly CALENDAR_TABLE_ID = "calendar-table"
    private calendarDiv!: HTMLElement;

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
        this.calendarDiv = document.getElementById(this.id)!
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
        this.calendarDiv.appendChild(monthDropDown)
        this.calendarDiv.appendChild(yearDropDown)
        this.calendarDiv.appendChild(calendarTable)
    }

    private reRenderTable(month: number, year: number) {
        let oldCalendarTable = this.calendarDiv.querySelector(`#${this.CALENDAR_TABLE_ID}`)
        let newCalendarTable: HTMLTableElement = CalendarView.getCalendarTable(this.CALENDAR_TABLE_ID, month, year)
        this.selectedMonth = month
        this.selectedYear = year
        oldCalendarTable?.replaceWith(newCalendarTable)
    }
}

let dp1 = new DatePicker("datepicker1", () => {})
dp1.render(new Date().getMonth(), new Date().getFullYear())

let dp2 = new DatePicker("datepicker2", () => {})
dp2.render(8, 2020)