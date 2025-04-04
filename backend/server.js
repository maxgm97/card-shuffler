const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = 'shuffles.json';

const loadShuffles = () => {
    if (fs.existsSync(DATA_FILE)) {
        return JSON.parse(fs.readFileSync(DATA_FILE));
    }
    return [];
};

const saveShuffles = (shuffles) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(shuffles, null, 2));
};

app.get('/api/shuffles', (req, res) => {
    res.json(loadShuffles());
});

app.post('/api/shuffles', (req, res) => {
    const newShuffle = req.body.shuffle;
    let shuffles = loadShuffles();
    shuffles.push(newShuffle);
    saveShuffles(shuffles);
    res.json(shuffles);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
