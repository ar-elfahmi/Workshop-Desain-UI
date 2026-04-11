/**
 * Indonesian Regional Dependent Dropdown
 * Powered by Axios & Emsifa API
 */

const API_BASE_URL = 'https://www.emsifa.com/api-wilayah-indonesia/api';

const selectors = {
    provinsi: document.getElementById('provinsi'),
    kota: document.getElementById('kota'),
    kecamatan: document.getElementById('kecamatan'),
    kelurahan: document.getElementById('kelurahan')
};

const loaders = {
    provinsi: document.getElementById('loader-provinsi'),
    kota: document.getElementById('loader-kota'),
    kecamatan: document.getElementById('loader-kecamatan'),
    kelurahan: document.getElementById('loader-kelurahan')
};

/**
 * Initialize app by loading provinces
 */
document.addEventListener('DOMContentLoaded', () => {
    fetchData('provinces.json', selectors.provinsi, 'Pilih Provinsi', loaders.provinsi);
});

/**
 * Event Listeners for Cascading Changes
 */

// Level 1: Provinsi -> Affects Level 2, 3, 4
selectors.provinsi.addEventListener('change', (e) => {
    const id = e.target.value;
    resetDropdowns(['kota', 'kecamatan', 'kelurahan']);
    
    if (id !== '0') {
        fetchData(`regencies/${id}.json`, selectors.kota, 'Pilih Kota', loaders.kota);
    }
});

// Level 2: Kota -> Affects Level 3, 4
selectors.kota.addEventListener('change', (e) => {
    const id = e.target.value;
    resetDropdowns(['kecamatan', 'kelurahan']);
    
    if (id !== '0') {
        fetchData(`districts/${id}.json`, selectors.kecamatan, 'Pilih Kecamatan', loaders.kecamatan);
    }
});

// Level 3: Kecamatan -> Affects Level 4
selectors.kecamatan.addEventListener('change', (e) => {
    const id = e.target.value;
    resetDropdowns(['kelurahan']);
    
    if (id !== '0') {
        fetchData(`villages/${id}.json`, selectors.kelurahan, 'Pilih Kelurahan', loaders.kelurahan);
    }
});

/**
 * Common fetch function using Axios
 * @param {string} endpoint 
 * @param {HTMLElement} targetSelect 
 * @param {string} placeholderText 
 * @param {HTMLElement} loader 
 */
async function fetchData(endpoint, targetSelect, placeholderText, loader) {
    try {
        showLoader(loader, true);
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
        const data = response.data;

        // Clear and add placeholder
        targetSelect.innerHTML = `<option value="0">${placeholderText}</option>`;

        // Populate items
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            targetSelect.appendChild(option);
        });

    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        alert('Gagal mengambil data wilayah. Silakan coba lagi nanti.');
    } finally {
        showLoader(loader, false);
    }
}

/**
 * Reset dropdowns to their default state
 * @param {Array} keys - Keys of the selectors object
 */
function resetDropdowns(keys) {
    keys.forEach(key => {
        const placeholder = key.charAt(0).toUpperCase() + key.slice(1);
        selectors[key].innerHTML = `<option value="0">Pilih ${placeholder}</option>`;
    });
}

/**
 * Loading indicator helper
 */
function showLoader(loader, show) {
    if (loader) {
        loader.style.display = show ? 'block' : 'none';
    }
}
