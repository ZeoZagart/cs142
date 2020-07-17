import { getRange, excludeStart } from "./Utils"

export class CalendarView {
    static getCalendarTable(id: string, month: number, year: number, onclick: () => void): HTMLTableElement {
        let calendarTable = document.createElement("table")
        calendarTable.id = id
        this.addCalendarHeader(calendarTable)
        this.addCalendarWeeks(calendarTable, new Date(year, month, 1), onclick)
        return calendarTable
    }

    private static addCalendarWeeks(calendarTable: HTMLTableElement, date: Date, onclick: () => void) {
        let numdays = getNumDays(date)
        let [firstWeek, firstWeekend, prevMonthExclusion] = CalendarView.getFirstWeek(date)
        let nextMonthInclusions = getRange(1, 6 - getMonthEndDay(date))

        let added = 0
        while(added < numdays) {
            if (added == 0) {
                this.addRowAsDays(calendarTable, firstWeek, prevMonthExclusion, onclick)
                added += firstWeekend
            } else if (added + 7 >= numdays) {
                this.addRowAsDays(calendarTable, excludeStart(added, numdays).concat(nextMonthInclusions), new Set(nextMonthInclusions), onclick)
                added += numdays - added
            } else {
                this.addRowAsDays(calendarTable, excludeStart(added, added + 7), new Set(), onclick)
                added += 7
            }
        }
    }

    private static getFirstWeek(date: Date): [number[], number, Set<number>] {
        let firstDay = getMonthStartDay(date)
        let prevMonthNumDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
        let firstWeekend = 7 - firstDay
        let exlusion = excludeStart(prevMonthNumDays - firstDay, prevMonthNumDays)
        console.log("ES : " + excludeStart(prevMonthNumDays - firstDay, prevMonthNumDays))
        return [exlusion.concat(getRange(1, firstWeekend)), firstWeekend, new Set(exlusion)]
    }

    private static addRowAsDays(table: HTMLTableElement, days: Array<number>, excluded: Set<number>, onclick: () => void) {
        let row = table.insertRow()
        days.forEach(day => {
            let cell = row.insertCell()
            let text = document.createTextNode(day.toString())
            cell.appendChild(text)
            if (excluded.has(day)) cell.style.backgroundColor = "gray"
            else {
                cell.onclick = onclick
            }
        })
    }

    private static addCalendarHeader(table: HTMLTableElement): HTMLTableSectionElement {
        let head = table.createTHead()
        let row = head.insertRow()
        DAYS.forEach(day => {
            let th = document.createElement("th")
            let text = document.createTextNode(day)
            th.appendChild(text)
            row.appendChild(th)
        })
        return head
    }
}

let DAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

let getMonthStartDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
let getMonthEndDay = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
let getNumDays = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();