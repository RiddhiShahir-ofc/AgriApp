// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { nanoid } = require('nanoid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

/**
 * POST /api/register
 * body: { role, ...fields }
 * returns { success:true, phone: '...', role }
 */
app.post('/api/register', (req, res) => {
  const { role, phone } = req.body;
  // Normally, you'd save to DB here. Return mock success.
  const userPhone = phone || `9${Math.floor(100000000 + Math.random() * 900000000)}`;
  return res.json({ success: true, phone: userPhone, role });
});

/**
 * GET /api/role-data/:role
 * query: section=profile|reports|notifications
 */
app.get('/api/role-data/:role', (req, res) => {
  const { role } = req.params;
  const section = req.query.section || 'profile';
  // Return different mock data based on role and section
  if (section === 'profile') {
    return res.json({ name: `${role}-user`, role, stats: { items: Math.floor(Math.random()*100) } });
  }
  if (section === 'reports') {
    return res.json({ chart: [Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100)] });
  }
  if (section === 'notifications') {
    return res.json({ notifications: [`Welcome ${role}`, `New listing in your area`, `Price alert for crop X`] });
  }
  res.json({ ok: true });
});

/**
 * GET /api/market-data
 * query: mandi, crop
 */
app.get('/api/market-data', (req, res) => {
  const { mandi = 'all', crop = 'all' } = req.query;
  // return a sample chart
  return res.json({
    mandi, crop,
    chart: [10 + Math.random()*50, 20 + Math.random()*40, 30 + Math.random()*30, 40 + Math.random()*20]
  });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Mock backend listening on ${PORT}`));
