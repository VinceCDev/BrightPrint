const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('date').textContent = today.toLocaleDateString(undefined, options);

const ctx = document.getElementById('barChart').getContext('2d');
const chartContainer = document.querySelector('.chart-container');
if (chartContainer) {
    chartContainer.style.backgroundColor = '#ffffff';
}

const dataSets = {
    daily: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
            {
                label: 'Merchandise',
                data: [150, 200, 180, 220, 210],
                backgroundColor: '#ef8122',
                borderRadius: 10,
                borderWidth: 1
            },
            {
                label: 'School Supplies',
                data: [100, 150, 120, 170, 160],
                backgroundColor: 'rgba(239, 129, 34, 0.7)',
                borderRadius: 10,
                borderWidth: 1
            },
            {
                label: 'Print',
                data: [80, 100, 90, 110, 120],
                backgroundColor: 'rgba(239, 129, 34, 0.5)',
                borderRadius: 10,
                borderWidth: 1
            }
        ]
    },
    weekly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Merchandise',
                data: [800, 900, 850, 950],
                backgroundColor: '#ef8122',
                borderRadius: 10,
                borderWidth: 1
            },
            {
                label: 'School Supplies',
                data: [600, 700, 650, 750],
                backgroundColor: 'rgba(239, 129, 34, 0.7)',
                borderRadius: 10,
                borderWidth: 1
            },
            {
                label: 'Print',
                data: [400, 500, 450, 550],
                backgroundColor: 'rgba(239, 129, 34, 0.5)',
                borderRadius: 10,
                borderWidth: 1
            }
        ]
    },
    monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Merchandise',
                data: [3000, 3200, 3100, 3500, 3400, 3600, 3700, 3900, 4000, 4200, 4300, 4500],
                backgroundColor: '#ef8122',
                borderRadius: 10,
                borderWidth: 1
            },
            {
                label: 'School Supplies',
                data: [2000, 2200, 2100, 2500, 2400, 2600, 2700, 2800, 3000, 3100, 3300, 3400],
                backgroundColor: 'rgba(239, 129, 34, 0.7)',
                borderRadius: 10,
                borderWidth: 1
            },
            {
                label: 'Print',
                data: [1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600],
                backgroundColor: 'rgba(239, 129, 34, 0.5)',
                borderRadius: 10,
                borderWidth: 1
            }
        ]
    }
};

let chartConfig = {
    type: 'bar',
    data: dataSets.monthly,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true 
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += context.raw;
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Count' // Title for y-axis to represent count of courses/quizzes done
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    }
};

let myChart = new Chart(ctx, chartConfig);

function updateChart(period) {
    myChart.data = dataSets[period];
    myChart.update();
}

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

const ctx1 = document.getElementById('lineChart').getContext('2d');
const chartContainer1 = document.querySelector('.chart-container');
if (chartContainer1) {
    chartContainer1.style.backgroundColor = '#ffffff';
}

// Sample data for photo printing and paper printing across daily, weekly, and monthly
const dataSets1 = {
    daily: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
            {
                label: 'Photo Printing',
                data: [30, 40, 50, 60, 70],
                borderColor: '#75579a',
                backgroundColor: function(context) {
                    const chart = context.chart;
                    const { chartArea } = chart;
                    if (!chartArea) return null;
                    const gradient = chart.ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(117, 87, 154, 0.5)');
                    gradient.addColorStop(1, 'rgba(117, 87, 154, 0.1)');
                    return gradient;
                },
                fill: true,
                tension: 0.4, // Curvy line
                borderWidth: 2
            },
            {
                label: 'Paper Printing',
                data: [20, 30, 40, 50, 60],
                borderColor: '#ef8122',
                backgroundColor: function(context) {
                    const chart = context.chart;
                    const { chartArea } = chart;
                    if (!chartArea) return null;
                    const gradient = chart.ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(239, 129, 34, 0.5)');
                    gradient.addColorStop(1, 'rgba(239, 129, 34, 0.1)');
                    return gradient;
                },
                fill: true,
                tension: 0.4, // Curvy line
                borderWidth: 2
            }
        ]
    },
    weekly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Photo Printing',
                data: [100, 120, 140, 160],
                borderColor: '#75579a',
                backgroundColor: function(context) {
                    const chart = context.chart;
                    const { chartArea } = chart;
                    if (!chartArea) return null;
                    const gradient = chart.ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(117, 87, 154, 0.5)');
                    gradient.addColorStop(1, 'rgba(117, 87, 154, 0.1)');
                    return gradient;
                },
                fill: true,
                tension: 0.4, // Curvy line
                borderWidth: 2
            },
            {
                label: 'Paper Printing',
                data: [80, 100, 120, 140],
                borderColor: '#ef8122',
                backgroundColor: function(context) {
                    const chart = context.chart;
                    const { chartArea } = chart;
                    if (!chartArea) return null;
                    const gradient = chart.ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(239, 129, 34, 0.5)');
                    gradient.addColorStop(1, 'rgba(239, 129, 34, 0.1)');
                    return gradient;
                },
                fill: true,
                tension: 0.4, // Curvy line
                borderWidth: 2
            }
        ]
    },
    monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Photo Printing',
                data: [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850],
                borderColor: '#75579a',
                backgroundColor: function(context) {
                    const chart = context.chart;
                    const { chartArea } = chart;
                    if (!chartArea) return null;
                    const gradient = chart.ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(117, 87, 154, 0.5)');
                    gradient.addColorStop(1, 'rgba(117, 87, 154, 0.1)');
                    return gradient;
                },
                fill: true,
                tension: 0.4, // Curvy line
                borderWidth: 2
            },
            {
                label: 'Paper Printing',
                data: [200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 550],
                borderColor: '#ef8122',
                backgroundColor: function(context) {
                    const chart = context.chart;
                    const { chartArea } = chart;
                    if (!chartArea) return null;
                    const gradient = chart.ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(239, 129, 34, 0.5)');
                    gradient.addColorStop(1, 'rgba(239, 129, 34, 0.1)');
                    return gradient;
                },
                fill: true,
                tension: 0.4, // Curvy line
                borderWidth: 2
            }
        ]
    }
};

let chartConfig1 = {
    type: 'line',  // Line chart
    data: dataSets1.monthly, // Start with monthly data
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true 
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += context.raw;
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Total Prints' // Title for y-axis
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    }
};

let myChart1 = new Chart(ctx1, chartConfig1);

// Function to update chart based on selected period (daily, weekly, monthly)
function updateChart(period) {
    myChart1.data = dataSets1[period];
    myChart1.update();
}
