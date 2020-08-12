class TableTemplate {
    static fillIn(id: string, dict: Map<string, string>, column?: string) {
        if (column == null) column = "NOTPOSSIBLE"
        let table: HTMLTableElement = document.getElementById(id)!
        let tbody: HTMLTableSectionElement = table.lastChild
    
        let headings: Element[] = Array.from(tbody.rows.item(0)!.children!)
        var selectedIndex = -1
        for (let idx = 0; idx < headings.length; idx++) {
            let headerCell = headings[idx]
            let proc = new Cs142TemplateProcessor(headerCell.textContent)
            headerCell.textContent = proc.fillIn(dict)
            if (headerCell.textContent === column) selectedIndex = idx
        } 
        
        let indexes: number[] = (selectedIndex === -1) ? this.range(headings.length) : [selectedIndex]
        for (let selectedCol of indexes) {
            for (let row = 1; row < tbody.rows.length; row += 1) {
                let trow: Element[] = Array.from(tbody.rows.item(row)!.children)!
                let colElem = trow[selectedCol]
                let proc = new Cs142TemplateProcessor(colElem.textContent)
                colElem.textContent = proc.fillIn(dict)
            }
        }

        table.setAttribute("style", "visibililty:visible");
    }

    static range(last: number): number[] {
        let arr: number[] = [0]
        for (let n = 1; n < last; n++) arr.push(n);
        return arr
    }
}