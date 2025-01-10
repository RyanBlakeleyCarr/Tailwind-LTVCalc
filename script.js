// Get all input elements
const inputs = document.querySelectorAll('input');

// Add event listeners to all inputs
inputs.forEach(input => {
    input.addEventListener('input', function(e) {
        // Only allow numbers and decimal points
        let value = e.target.value.replace(/[^\d.]/g, '');
        
        // Ensure only one decimal point
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        e.target.value = value;
        calculateMetrics();
    });
});

function calculateMetrics() {
    // Get input values and convert to numbers
    const revenue = parseFloat(document.getElementById('revenue').value) || 0;
    const months = Math.max(1, parseFloat(document.getElementById('months').value) || 1);
    const startingSubs = parseFloat(document.getElementById('startingSubs').value) || 0;
    const subsGained = parseFloat(document.getElementById('subsGained').value) || 0;
    const subsChurned = parseFloat(document.getElementById('subsChurned').value) || 0;

    // Calculate average number of subscribers during period
    const endingSubs = startingSubs + subsGained - subsChurned;
    const avgSubs = (startingSubs + endingSubs) / 2;

    // Calculate Monthly Revenue per Subscriber
    const monthlyRPS = avgSubs > 0 ? (revenue / months) / avgSubs : 0;

    // Calculate Monthly Rates
    const monthlyGains = subsGained / months;
    const monthlyLosses = subsChurned / months;
    
    // Calculate Subscriber Lifespan
    const netGrowth = monthlyGains - monthlyLosses;
    const sl = netGrowth > 0 ? endingSubs / netGrowth : 0;

    // Calculate Lifetime Value (LTV)
    const ltv = monthlyRPS * sl;

    // Update display
    document.getElementById('rps').textContent = formatCurrency(monthlyRPS);
    document.getElementById('sl').textContent = formatMonths(sl);
    document.getElementById('ltv').textContent = formatCurrency(ltv);
}

function formatCurrency(value) {
    if (isNaN(value) || !isFinite(value)) return '$0.00';
    return '$' + value.toFixed(2);
}

function formatMonths(value) {
    if (isNaN(value) || !isFinite(value)) return '0 months';
    return Math.round(value) + ' months';
}

// Initial calculation
calculateMetrics(); 