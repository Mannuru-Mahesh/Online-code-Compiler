const express = require('express');
const cors = require('cors');
const { executeCode } = require('./utils/executeCode');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/run', async (req, res) => {
  const { language, code, input } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: 'Empty code body!' });
  }

  try {
    const result = await executeCode(language, code, input);
    res.json({ success: true, output: result.output });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});