const RANDOM_ORG_API_URL = 'https://api.random.org/json-rpc/4/invoke';
const RANDOM_ORG_API_KEY = '783ca9cd-fc04-4f03-89aa-fb7d115b3a4f'; // Ваш API-ключ Random.org
const EVENTS_DELAY = 30000; // Интервал в 30 секунд для задержки

document.getElementById('startBtn').addEventListener('click', async () => {
    const startBtn = document.getElementById('startBtn');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const keyContainer = document.getElementById('keyContainer');
    const generatedKeys = document.getElementById('generatedKeys');
    const keyCount = parseInt(document.getElementById('keyCountSelect').value);

    // Reset UI for new generation
    progressBar.style.width = '0%';
    progressText.innerText = '0%';
    progressContainer.classList.remove('hidden');
    keyContainer.classList.add('hidden');
    generatedKeys.innerText = '';

    startBtn.disabled = true;

    let progress = 0;
    const updateProgress = (increment) => {
        progress += increment;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
        progressText.innerText = `${Math.round(progress)}%`;
    };

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    async function generateKeyProcess() {
        try {
            const part1 = generateRandomString(3); // XXX
            const part2 = generateRandomString(4); // XXXXX
            const part3 = generateRandomString(4); // XXXX
            const part4 = generateRandomString(3); // XX

            return `CLONE-${part1}-${part2}-${part3}-${part4}`;
        } catch (error) {
            console.error(`Error during key generation: ${error.message}`);
        }
        return null;
    }

    async function generateKeys() {
        try {
            const keysPromises = Array.from({ length: keyCount }, generateKeyProcess);
            return await Promise.all(keysPromises);
        } catch (error) {
            console.error(`Error during key generation: ${error.message}`);
            return [];
        }
    }

    const keys = await generateKeys();
    generatedKeys.innerText = keys.filter(key => key).join('\n');
    keyContainer.classList.remove('hidden');
    startBtn.disabled = false;
});

document.getElementById('creatorChannelBtn').addEventListener('click', () => {
    window.location.href = 'https://t.me/+EnrzkiMofTsyZWVi'; // URL вашего канала
});

