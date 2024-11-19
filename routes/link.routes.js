const { Router } = require('express');
const Link = require('../models/Link');
const shortId = require('shortid');
const config = require('config');
const auth = require('../middleware/auth.middleware');
const router = Router();
const puppeteer = require('puppeteer');

router.post('/generate', auth, async (req, res) => {
  try {
    const baseURL = config.get('baseURL');
    const { from } = req.body;
    const code = shortId.generate();
    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }

    const browser = await puppeteer.launch();
    let title = '';
    let document = {};

    try {
      const [page] = await browser.pages();
      await page.goto(from);
      title = await page.evaluate(() => document.title);
      document = await page.evaluate(() => document);
    } catch (err) {
      console.error(err);
    } finally {
      await browser.close();
    }

    to = baseURL + '/to/' + code;
    const link = new Link({
      document: document,
      title: title,
      success: true,
      code,
      to,
      from,
      owner: req.user.userId,
    });
    await link.save();

    res.status(201).json({ link });
  } catch (error) {
    res.status(500).json({ message: 'Something is wrong... Please try again' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Something is wrong... Please try again' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: 'Something is wrong... Please try again' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Link.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Link was removed', success: true });
  } catch (error) {
    res.status(500).json({ message: 'Something is wrong... Please try again', success: false });
  }
});

module.exports = router;
