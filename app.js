const express = require('express');

const app = express();

app.listen(3000, function () {
  console.log('App on port 3000');
})

app.get('/mean/:nums', function(req, res){
    
    let nums = req.params.nums.split(',').map(Number);
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        }
    const mean = sum / nums.length;
    res.json({mean});
})

app.get('/median/:nums', function(req, res){
    let nums = req.params.nums.split(',').map(Number);
    nums.sort((a,b) => a - b);
    const middleIndex = Math.floor(nums.length / 2);

    if (nums.length === 0){
        return res.status(400).json({error: 
        'nums are required'});
    } else if (nums.length % 2 === 0) {
        const median = (nums[middleIndex - 1 ] + nums[middleIndex]) / 2;
        return res.json({ median });
    } else {
        const median = nums[middleIndex]
        res.json({median});
    }
    
})

app.get('/mode/:nums', function (req, res) {
   
    let nums = req.params.nums.split(',').map(Number);
    
    let numFrequency = {};

    for (let i = 0; i < nums.length; i++) {
        if (numFrequency[nums[i]]) {
            numFrequency[nums[i]] += 1;
        } else {
            numFrequency[nums[i]] = 1;
        }
    }

    let highestFrequency = -1;
    let mode = -1;

    Object.keys(numFrequency).forEach(num => {
        let frequency = numFrequency[num];
        if (frequency > highestFrequency) {
            highestFrequency = frequency;
            mode = num;
        }
    });

    res.json({ mode });
});
