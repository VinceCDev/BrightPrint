const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('date').textContent = today.toLocaleDateString(undefined, options);

function showNavItems() {
    const navItems = document.querySelector('.popup-container');
    navItems.style.display = 'block';
}

const profileElement = document.querySelector('.profile');
profileElement.addEventListener('click', showNavItems);

function closePopup() {
    const navItems = document.querySelector('.popup-container');
    navItems.style.display = 'none';
}

const closeButton = document.querySelector('.close-btn');
if (closeButton) {
    closeButton.addEventListener('click', closePopup);
}

// Function to show the modal with background blur
function showAddForm() {
    const addModal = new bootstrap.Modal(document.getElementById('addTransactionModal'));
    addModal.show();
}

// Function to close the modal
function closeModal(modalId) {
    const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
    modal.hide();
    document.body.classList.remove('blurred');
}

// Handle the form submission
document.getElementById('addTransactionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const transactionDate = document.getElementById('transactionDate').value;
    const documentType = document.getElementById('documentType').value;
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    const totalRevenue = parseFloat(document.getElementById('totalRevenue').value) || 0;
    const materialCost = parseFloat(document.getElementById('materialCost').value) || 0;

    // Calculate Profit
    const profit = (totalRevenue - materialCost).toFixed(2);
    document.getElementById('profit').value = profit;

    // Validation check for required fields and correct values
    if (quantity <= 0 || totalRevenue <= 0 || materialCost < 0) {
        // SweetAlert error message
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please ensure all fields are filled with valid values!',
            confirmButtonText: 'OK'
        });
    } else {
        // SweetAlert success message
        Swal.fire({
            icon: 'success',
            title: 'Transaction Added',
            text: 'The transaction has been successfully added.',
            confirmButtonText: 'OK'
        }).then(() => {
            saveTransaction(transactionDate, documentType, quantity, totalRevenue, materialCost, profit);
        });
    }
});

// Function to save the transaction
function saveTransaction(transactionDate, documentType, quantity, totalRevenue, materialCost, profit) {
    // Here, you can save the transaction to the database or array
    console.log('Transaction Saved:', {
        transactionDate,
        documentType,
        quantity,
        totalRevenue,
        materialCost,
        profit
    });

    // Close the modal
    closeModal('addTransactionModal');
}

// Sample Printing Service Data (with relevant columns)
const printingServiceData = [
    { date: "2024-11-01", documentType: "Paper", quantity: 100, totalPrice: 5000, materialCost: 2000, profit: 3000, status: "Completed" },
    { date: "2024-11-02", documentType: "Photo", quantity: 50, totalPrice: 6000, materialCost: 2500, profit: 3500, status: "Completed" },
    { date: "2024-11-03", documentType: "Paper", quantity: 75, totalPrice: 7000, materialCost: 2700, profit: 4300, status: "Pending" },
    { date: "2024-11-04", documentType: "Photo", quantity: 30, totalPrice: 2000, materialCost: 800, profit: 1200, status: "Completed" },
    { date: "2024-11-05", documentType: "Paper", quantity: 120, totalPrice: 8000, materialCost: 3000, profit: 5000, status: "Completed" },
];

// Current Page
let currentPage = 1;
const rowsPerPage = 5;

// Initialize the table with data
function renderTable() {
    const tableBody = document.querySelector('#printingServiceTable tbody');
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = printingServiceData.filter(item => 
        item.date.toLowerCase().includes(searchQuery) ||
        item.documentType.toLowerCase().includes(searchQuery) ||
        item.status.toLowerCase().includes(searchQuery)
    );
    
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentPageData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    
    tableBody.innerHTML = ""; // Clear previous rows
    currentPageData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.documentType}</td>
            <td>${item.quantity}</td>
            <td>${item.totalPrice.toFixed(2)}</td>
            <td>${item.materialCost.toFixed(2)}</td>
            <td>${item.profit.toFixed(2)}</td>
            <td>
                <button class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    updatePagination(filteredData.length);
}

// Filter table rows based on search input
function filterTable() {
    currentPage = 1; // Reset to first page on search
    renderTable();
}

// Clear the search input and reset the table
function clearSearch() {
    document.getElementById('searchInput').value = "";
    currentPage = 1; // Reset to first page
    renderTable();
}

// Update pagination UI based on the filtered data length
function updatePagination(filteredDataLength) {
    const totalPages = Math.ceil(filteredDataLength / rowsPerPage);
    const paginationContainer = document.querySelector('.pagination');
    const resultsInfo = document.querySelector('.results-info');
    const startIndex = (currentPage - 1) * rowsPerPage + 1;
    const endIndex = Math.min(currentPage * rowsPerPage, filteredDataLength);

    resultsInfo.textContent = `Showing ${startIndex}-${endIndex} of ${filteredDataLength} data`;

    // Clear existing pagination links
    paginationContainer.innerHTML = '<li><a href="#" class="prev">&#8249;</a></li>';

    const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPages);

    for (let i = startPage; i <= endPage; i++) {
        const pageLink = document.createElement('li');
        pageLink.innerHTML = `<a href="#">${i}</a>`;
        pageLink.addEventListener('click', () => {
            currentPage = i;
            renderTable();
        });
        paginationContainer.appendChild(pageLink);
    }

    // Add next button
    paginationContainer.innerHTML += '<li><a href="#" class="next">&#8250;</a></li>';
    
    // Set active class on the current page
    const pageLinks = paginationContainer.querySelectorAll('li a');
    pageLinks.forEach(link => {
        link.classList.remove('active');
        if (link.textContent == currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize table on page load
window.onload = renderTable;

// Pagination next/prev buttons functionality
document.querySelector('.pagination .prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
});

document.querySelector('.pagination .next').addEventListener('click', () => {
    const totalPages = Math.ceil(printingServiceData.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
});

function downloadPDF() {
    // Get the content that you want to include in the PDF
    const table = document.getElementById("printingServiceTable");

// Initialize jsPDF
const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// Title for the PDF - Centered
doc.setFont("times", "normal");
doc.setFontSize(16);
doc.text("Service Report", 105, 10, null, null, "center");

// Set font and dimensions
doc.setFont("times", "normal");
doc.setFontSize(12);

let pageWidth = doc.internal.pageSize.getWidth(); // Get page width
let margin = 14; // Margin from left
let tableWidth = pageWidth - 2 * margin; // Full table width
let cellHeight = 10; // Cell height
let columns = 6; // Number of columns
let cellWidth = tableWidth / columns; // Dynamic cell width based on PDF width

// Table headers with styled rectangles, centered text, and borders
let headers = ["Date", "Document Type", "Quantity", "Total Price/Revenue", "Material Cost", "Profit"];
let headerY = 20;

// Wrap text function for long strings
const wrapText = (doc, text, maxWidth) => {
    let words = text.split(" ");
    let lines = [];
    let line = "";

    words.forEach(word => {
        let testLine = line + word + " ";
        let testWidth = doc.getTextWidth(testLine);
        if (testWidth > maxWidth) {
            lines.push(line.trim());
            line = word + " ";
        } else {
            line = testLine;
        }
    });

    if (line) lines.push(line.trim());
    return lines;
};

// Draw headers
doc.setFont("times", "bold");
headers.forEach((header, i) => {
    let x = margin + i * cellWidth;
    doc.setFillColor(200, 200, 200); // Light grey
    doc.rect(x, headerY, cellWidth, cellHeight, "FD"); // Header with border
    let lines = wrapText(doc, header, cellWidth - 2); // Wrap header text
    lines.forEach((line, idx) => {
        doc.text(line, x + cellWidth / 2, headerY + 5 + idx * 4, null, null, "center");
    });
});

// Table data with borders and wrapped text
let rowCount = table.rows.length;
let dataY = headerY + cellHeight;

doc.setFont("times", "normal");
for (let i = 1; i < rowCount; i++) { // Skip the header row in the HTML table
    let row = table.rows[i];
    let maxRowHeight = cellHeight;

    // Calculate maximum height needed for the row
    let rowHeights = Array(columns).fill(cellHeight);
    for (let j = 0; j < columns; j++) {
        let text = row.cells[j]?.innerText || " ";
        let lines = wrapText(doc, text, cellWidth - 2);
        rowHeights[j] = lines.length * 4 + 2; // Adjust height per line
    }
    maxRowHeight = Math.max(...rowHeights);

    // Draw cells and add wrapped text
    for (let j = 0; j < columns; j++) {
        let text = row.cells[j]?.innerText || " ";
        let x = margin + j * cellWidth;
        doc.rect(x, dataY, cellWidth, maxRowHeight); // Draw cell border
        let lines = wrapText(doc, text, cellWidth - 2);

        // Draw each line inside the cell
        lines.forEach((line, idx) => {
            doc.text(
                line,
                x + cellWidth / 2,
                dataY + 5 + idx * 4, // Adjust line height
                null,
                null,
                "center"
            );
        });
    }

    dataY += maxRowHeight; // Move to next row
}

// Save the PDF
doc.save("service_report.pdf");

}

function downloadExcel() {
    const table = document.getElementById("printingServiceTable");

    // Convert the table data to an array format that can be processed by SheetJS
    const rowCount = table.rows.length;
    const colCount = table.rows[0].cells.length;
    let data = [];

    // Loop through table rows and cells to extract data
    for (let i = 0; i < rowCount; i++) {
        let rowData = [];
        for (let j = 0; j < colCount; j++) {
            rowData.push(table.rows[i].cells[j].innerText);
        }
        data.push(rowData);
    }

    // Create a new workbook
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Service Transactions");

    // Trigger Excel download
    XLSX.writeFile(wb, "service_report.xlsx");
}
