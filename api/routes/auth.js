const router = require("express").Router();
const User = require("../models/User");
const Payment = require("../models/payment");
const Investor = require("../models/Investor");
const bcrypt = require("bcrypt");
const cheerio = require("cheerio");
const axios = require("axios");
const Post = require("../models/Post");
//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      
    });
    const user = await newUser.save();

    res.status(200).json(user);

  }
  catch (err) {
    res.status(500).json(err);
  }

});
/*
router.post("/payment", async (req, res) => {
  
  try {
    const newPayment = new Payment({
      username: req.body.username,
      stud_username:req.body.stud_username,
      post_title:req.body.post_title,
      payment_details:req.body.payment_details,
      post_id:req.body.post_id,
    });
   
    const user = await newPayment.save();

    res.status(200).json(user);

  }
  catch (err) {
    res.status(500).json(err);
  }

});
*/
router.post("/payment", async (req, res) => {
  try {
    const postId = req.body.post_id;
    const paymentDetails = parseFloat(req.body.payment_details);  // Convert to float to handle decimals

    // Find the post by post_id
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found for the given post ID.' });
    }

    // Update the payment_details of the post
    post.payment_details = parseFloat(post.payment_details) + paymentDetails;  // Ensure both are treated as numbers
    await post.save();

    res.status(200).json({ message: 'Payment details updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});





// Define a route for fetching JSON data of breweries
router.get("/govt", async (req, res) => {
  try {
    const { data } = await axios.get(`https://api.openbrewerydb.org/v1/breweries?per_page=16`);
    res.json(data);
  } catch (err) {
    console.error({ error: err });
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route for fetching details of a single brewery
router.get("/govt/:id", async (req, res) => {
  try {
    const breweryId = req.params.id;
    const { data } = await axios.get(`https://api.openbrewerydb.org/v1/breweries/${breweryId}`);
    res.json(data);
  } catch (err) {
    console.error({ error: err });
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/webinars", async (req, res) => {
  try {
    const { data } = await axios.get(`https://www.entrepreneur.com/events/type/webinars`);
    const $ = cheerio.load(data);

    const cards = $(".card.hoverable").map((i, element) => {
      const header = $(element).find(".card-content > .fs-f > a").text();
      const link = $(element).find(".card-image > a").attr("href");
      const image = $(element).find('.card-image img').attr('src').replace(/blur=50/, '');
      // console.log(`https://www.startupindia.gov.in${image}`);
      return `
        <div class="card">
          <img src="${image}">
          <h3>${header}</h3>
          <a href="${link}">View Details</a>
        </div>
      `;
    }).get().join("");

    const html = `
    <html>
        <head>
          <style>
          body {
            background-color: white;
            font-family: Arial, sans-serif;
            color: #333;
          }
          
          .card {
            display: inline-block;
            margin: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            width: 300px;
            transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
            box-shadow: 0 8px 20px rgba(0,0,0,0.3)
          }
          
          .card:hover {
            transform: translateY(-5px);
            background-image: linear-gradient(153deg, #F8C332 0%, #FB8332 95%) /* change the background color on hover */
            
          }
          
          .card h3 {
            font-size: 24px;
            margin: 0 0 10px;
          }
          
          .card img {
            max-width: 100%;
            height: auto;
            border-radius: 5px;
          }
          
          .card a {
            display: inline-block;
            margin-top: 10px;
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            transition: background-color 0.2s ease-in-out;
          }
          
          .card a:hover {
            background-color: #0062cc;
          }
          
          </style>
        </head>
        <body>
          ${cards}
        </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    console.log({ error: err });
  }
});

router.get('/mentors', (req, res) => {
  const url = 'https://iitstartups.org/mentors/';

  axios.get(url)
    .then(response => {
      const $ = cheerio.load(response.data);

      const mentors = [];

      $('div.col-md-3').each((i, element) => {
        const name = $(element).find('h2').text().trim();
        const href = $(element).find('a').attr('href');
        const title = $(element).find('div.tb-field').text().trim();
        const image = $(element).find('img').attr('src');

        mentors.push({ name, href, title, image });
      });

      res.send(renderCards(mentors));
    })
    .catch(error => {
      console.log(error);
      res.send('Error!');
    });
});

function renderCards(mentors) {
  let html = '';

  mentors.forEach(mentor => {
    html += `
      <div class="card">
        <img class="card-img-top" src="${mentor.image}" alt="">
        <div class="card-body">
          <h5 class="card-title">${mentor.name}</h5>
          <p class="card-text">${mentor.title}</p>
          <a href="${mentor.href}" class="btn btn-primary" target="_blank">LinkedIn Profile</a>
        </div>
      </div>
    `;
  });

  return `
    <!doctype html>
    <html>
      <head>
        <title>IIT Startups Mentors</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <div class="container">
          ${html}
        </div>
      </body>
    </html>
  `;
}



/*router.get('/webinars', (req, res) => {
  axios.get('https://www.entrepreneur.com/events/type/webinars')
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      let cardsHtml = '';
      const htmlStyles = `
      <style>
        /* Your CSS styles here 
        .card {
          border: 1px solid black;
          padding: 20px;
          margin-bottom: 20px;
        }
    
        .card-image {
          width: 100%;
          margin-bottom: 10px;
        }
    
        .card-image img {
          max-width: 100%;
          height: auto;
        }
    
        .card-content {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }
    
        .card-action {
          font-size: 16px;
        }
      </style>
    `;
      $('.card.hoverable').each((i, el) => {
        const title = $(el).find('.card-content > .fs-f > a').text();
        const author = $(el).find('.card-action > .grey-text.text-darken-2 > a > img').attr('alt');
        const img = $(el).find('.card-image img').attr('src').replace(/blur=50/, '');

        const link = $(el).find('.card-image > a').attr('href');

        const cardHtml = `
          <div class="card">
            <div class="card-image">
              <a href="${link}">
                <img src="${img}">
              </a>
            </div>
            <div class="card-content">
              <a href="${link}">${title}</a>
            </div>
            <div class="card-action">
              By ${author}
            </div>
          </div>
        `;
        cardsHtml += cardHtml;
      });

      const fullHtml = `
        <html>
          <head>
            <title>Webinars</title>
            ${htmlStyles}
          </head>
          <body>
            <h1>Webinars</h1>
            ${cardsHtml}
          </body>
        </html>
      `;
console.log(fullHtml);
      res.send(fullHtml);
    })
    .catch(error => {
      console.log(error);
      res.send('An error occurred while fetching data');
    });
});
*/


router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json("Wrong credentials!");
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json("Wrong credentials!");
    }

    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});


module.exports = router;
