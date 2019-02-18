var container = document.getElementById('container'),
    createTableButton = document.getElementById('create-table'),
    table = document.createElement('table'),
    tableBody = document.createElement('tbody'),
    tableHeaders = [
        'Название товара',
        'Цвет',
        'Название размера',
        'Количество доступных товаров этого размера',
        'Цена'
    ],
    filter = '';

var tableData = {
    '2001': {
        name: 'Товар 1',
        color: {
            name: 'Красный',
            value: '#FF004D'
        },
        sizes: {
            '3001': {
                name: 'S',
                available: 26,
                price: 900
            },
            '3002': {
                name: 'M',
                available: 24,
                price: 940
            },
            '3003': {
                name: 'L',
                available: 12,
                price: 300
            },
            '3004': {
                name: 'XL',
                available: 32,
                price: 800
            }
        }
    },
    '2002': {
        name: 'Товар 2',
        color: {
            name: 'Зеленый',
            value: '#008365'
        },
        sizes: {
            '4001': {
                name: 'M',
                available: 9998,
                price: 200
            },
            '4002': {
                name: 'L',
                available: 45,
                price: 230
            },
            '4003': {
                name: 'XXL',
                available: 1,
                price: 1300
            }
        }
    },
    '2003': {
        name: 'Товар 3',
        color: {
            name: 'Синий',
            value: '#3B5998'
        },
        sizes: {
            '5001': {
                name: 'S',
                available: 0,
                price: 0
            },
            '5002': {
                name: 'M',
                available: 0,
                price: 0
            },
            '5003': {
                name: 'L',
                available: 23,
                price: 130
            }
        }
    },
    '2004': {
        name: 'Товар 4',
        color: {
            name: 'Марсала',
            value: '#4C1A2C'
        },
        sizes: {
            '6001': {
                name: 'L',
                available: 0,
                price: 0
            },
            '6002': {
                name: 'XL',
                available: 0,
                price: 0
            },
            '6003': {
                name: 'XXL',
                available: 0,
                price: 0
            }
        }
    }
};

function createTableHeaders(headers) {
    var tableHeader = document.createElement('thead'),
        headersRow = '';

    if (headers.length) {
        headersRow = document.createElement('tr');
    }

    for (var i = 0; i < headers.length; i++) {
        headersRow.innerHTML += '<th>' + headers[i] + '</th>';
    }

    tableHeader.appendChild(headersRow);
    table.appendChild(tableHeader);
}

function createTableCells(obj, isNewRow, currentRow) {
    var cellsRow = currentRow;

    if (isNewRow) {
        cellsRow = document.createElement('tr');
    }

    for (var key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (Number(key)) {
                if (Number(key) > 3000) {
                    if (key.slice(-1) === '1') {
                        createTableCells(obj[key], false, cellsRow);
                    } else {
                        createTableCells(obj[key], true, 'with two empty cells');
                    }
                } else {
                    createTableCells(obj[key], true, '');
                }
            } else {
                createTableCells(obj[key], false, cellsRow);
            }
        } else {
            if (key === 'name' && currentRow.length) {
                cellsRow.innerHTML += '<td>---//---</td><td>---//---</td>';
            }

            if (key === 'value' && obj.value.charAt(0) === '#') {
                continue;
            }

            if (key === 'name' && obj.value) {
                cellsRow.innerHTML +=
                    '<td style="white-space: nowrap; text-align: left;"><span style="display: inline-block; margin-right: 6px; width: 12px; height: 12px; background-color: ' +
                    obj.value +
                    '"></span>' +
                    obj[key] +
                    '</td>';
            } else {
                cellsRow.innerHTML += '<td>' + obj[key] + '</td>';
            }

            tableBody.appendChild(cellsRow);
        }
    }
    table.appendChild(tableBody);
}

function createTable() {
    var tableContainer = document.createElement('div'),
        filter = document.createElement('input');

    filter.setAttribute('type', 'text');
    filter.setAttribute('id', 'filter');
    filter.setAttribute('class', 'filter');
    filter.setAttribute('value', '');
    filter.setAttribute('placeholder', 'Поиск...');
    tableContainer.setAttribute('class', 'table-container');

    createTableHeaders(tableHeaders);
    createTableCells(tableData, true, '');

    tableContainer.appendChild(table);
    container.appendChild(filter);
    container.appendChild(tableContainer);

    filter = document.getElementById('filter');

    function filterTable() {
        var tableRows = table.getElementsByTagName('tr'),
            tableRowCells = '',
            tableRowCell = '',
            tableRowCellValue = '',
            filterValue = '';

        if (this.tagName.toLowerCase() === 'input') {
            filterValue = this.value.trim().toUpperCase();
        }

        for (var i = 1; i < tableRows.length; i++) {
            tableRowCells = tableRows[i].getElementsByTagName('td');

            for (var j = 0; j < tableRowCells.length; j++) {
                tableRowCell = tableRowCells[j];

                if (tableRowCell) {
                    tableRowCellValue = tableRowCell.textContent || tableRowCell.innerText;

                    if (tableRowCellValue.toUpperCase().indexOf(filterValue) > -1) {
                        if (filterValue.indexOf('/') < 0 && filterValue.indexOf('-') < 0) {
                            tableRows[i].style.display = '';
                            break;
                        }
                    } else {
                        tableRows[i].style.display = 'none';
                    }
                }
            }
        }
    }

    filter.addEventListener('input', filterTable);
}

createTableButton.addEventListener('click', function() {
    createTable();

    this.remove();
});
