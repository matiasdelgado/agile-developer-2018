const express = require('express');
const router = express.Router();
const issuesDB = require('../models/issue.store');

router.get('/', function(req, res) {
  const issues = issuesDB.getAllOpen();
  const highSeverity = issues.filter(i => i.severity === 'High');

  let data = {
    highPercent: 0
  };

  if (issues.length > 0) {
    data = {
      highPercent: highSeverity.length / issues.length
    };
  }

  res.render('dashboard', data);
});

module.exports = router;
