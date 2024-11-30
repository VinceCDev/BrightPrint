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

function showAddForm() {
    const addModal = new bootstrap.Modal(document.getElementById('addItemModal'));
    addModal.show();
    // Apply background blur when modal is shown
    document.body.classList.add('blurred');
}

// Function to show Edit Item form modal
function showEditForm() {
    const editModal = new bootstrap.Modal(document.getElementById('editItemModal'));
    editModal.show();
    // Apply background blur when modal is shown
    document.body.classList.add('blurred');
}

// Function to close the modal
function closeModal(modalId) {
    const modal = bootstrap.Modal.getInstance(document.getElementById(modalId)); // Get instance of modal
    modal.hide(); // Hide the modal
    // Remove background blur when modal is closed
    document.body.classList.remove('blurred');
}

// SweetAlert for messages
function showAlert(type, message) {
    switch (type) {
        case 'warning':
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: message,
            });
            break;
        case 'success':
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: message,
            }).then((result) => {
                // Close the modal when success is acknowledged
                if (result.isConfirmed) {
                    closeModal('addItemModal'); // Close Add Item modal after success
                }
            });
            break;
        case 'error':
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message,
            });
            break;
        default:
            console.error('Invalid alert type specified.');
    }
}

// Example Usage of SweetAlert
document.getElementById('addItemForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission for demo
    const itemName = document.getElementById('itemName').value;
    const itemCategory = document.getElementById('itemCategory').value;
    const itemQuantity = document.getElementById('itemQuantity').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemStatus = document.getElementById('itemStatus').value;

    if (!itemName || !itemCategory || !itemQuantity || !itemPrice || !itemStatus) {
        showAlert('warning', 'Please enter all required fields.');
    } else {
        showAlert('success', 'Item added successfully!');
        this.reset(); // Reset the form after successful addition
    }
});

// Sample Data (You would usually fetch this from a database)
const inventoryData = [
    { name: "Item 1", category: "Category A", quantity: 10, price: 100, status: "Active" },
    { name: "Item 2", category: "Category B", quantity: 20, price: 150, status: "Inactive" },
    { name: "Item 3", category: "Category A", quantity: 30, price: 200, status: "Active" },
    { name: "Item 4", category: "Category C", quantity: 40, price: 250, status: "Inactive" },
    { name: "Item 5", category: "Category B", quantity: 50, price: 300, status: "Active" },
    { name: "Item 6", category: "Category C", quantity: 60, price: 350, status: "Inactive" },
    { name: "Item 7", category: "Category A", quantity: 70, price: 400, status: "Active" },
    { name: "Item 8", category: "Category B", quantity: 80, price: 450, status: "Inactive" },
    { name: "Item 9", category: "Category C", quantity: 90, price: 500, status: "Active" },
    { name: "Item 10", category: "Category A", quantity: 100, price: 550, status: "Inactive" },
    { name: "Item 11", category: "Category A", quantity: 110, price: 600, status: "Active" },
    { name: "Item 12", category: "Category B", quantity: 120, price: 650, status: "Inactive" },
    { name: "Item 13", category: "Category C", quantity: 130, price: 700, status: "Active" },
    { name: "Item 14", category: "Category A", quantity: 140, price: 750, status: "Inactive" },
    { name: "Item 15", category: "Category B", quantity: 150, price: 800, status: "Active" }
];

// Current Page
let currentPage = 1;
const rowsPerPage = 5;

// Initialize the table with data
function renderTable() {
    const tableBody = document.querySelector('#inventoryTable tbody');
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = inventoryData.filter(item => 
        item.name.toLowerCase().includes(searchQuery) ||
        item.category.toLowerCase().includes(searchQuery) ||
        item.status.toLowerCase().includes(searchQuery)
    );
    
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentPageData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    
    tableBody.innerHTML = "";
    currentPageData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.status}</td>
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
    const totalPages = Math.ceil(inventoryData.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
});

function downloadPDF() {
    // Get the content that you want to include in the PDF
    const table = document.getElementById("inventoryTable");

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
doc.save("inventory_report.pdf");

}

function downloadExcel() {
    const table = document.getElementById("inventoryTable");

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
    XLSX.writeFile(wb, "inventory_report.xlsx");
}