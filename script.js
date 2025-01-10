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
    const totalSubs = parseFloat(document.getElementById('totalSubs').value) || 0;
    const periodSubs = parseFloat(document.getElementById('periodSubs').value) || 0;
    const subsGained = parseFloat(document.getElementById('subsGained').value) || 0;
    const subsChurned = parseFloat(document.getElementById('subsChurned').value) || 0;

    // Calculate Revenue Per Subscriber (RPS)
    const rps = periodSubs > 0 ? revenue / (periodSubs * months) : 0;

    // Calculate Subscriber Lifespan (SL)
    // Convert total gains/losses to monthly rate for lifespan calculation
    const monthlyGains = subsGained / months;
    const monthlyLosses = subsChurned / months;
    const netGrowth = monthlyGains - monthlyLosses;
    const sl = netGrowth > 0 ? totalSubs / netGrowth : 0;

    // Calculate Lifetime Value (LTV)
    const ltv = rps * sl;

    // Calculate projections
    const proj50k = 50000 * rps;
    const proj100k = 100000 * rps;

    // Update display
    document.getElementById('rps').textContent = formatCurrency(rps);
    document.getElementById('sl').textContent = formatMonths(sl);
    document.getElementById('ltv').textContent = formatCurrency(ltv);
    document.getElementById('proj50k').textContent = formatCurrency(proj50k);
    document.getElementById('proj100k').textContent = formatCurrency(proj100k);
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