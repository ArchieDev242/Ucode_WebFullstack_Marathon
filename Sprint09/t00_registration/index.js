const User = require('./models/user');
const express = require('express');
const body_parser = require('body-parser');
const path = require('path');
const app = express();
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const port = 3000;

app.post('/register', async (req, res) => {
  const { login, password, confirm_password, full_name, email } = req.body;

  try 
  {
    if(password !== confirm_password) 
      {
      return res.status(400).json({ 
        error: 'Passwords do not match! :<' 
      });
    }

    const is_user_exist = await User.find_by_login(login);

    if(is_user_exist) 
      {
      return res.status(409).json({ 
        error: 'This username is already taken! :<' 
      });
    }

    const is_email_exist = await User.find_by_email(email);

    if(is_email_exist) 
      {
      return res.status(409).json({ 
        error: 'This email is already registered! :<' 
      });
    }

    await User.create(login, password, full_name, email);

    res.json({ 
      success: true,
      message: 'Registration successful! 🎉' 
    });

  } catch(error) 
  {
    console.error('Registration error :< :', error);
    
    if(error.code === 'ER_DUP_ENTRY') 
      {
      return res.status(409).json({
        error: 'Data conflict! Non-unique values :<'
      });
    }
    
    if(error.code === 'ER_DBACCESS_DENIED_ERROR') 
      {
      return res.status(500).json({
        error: 'Database access error :<  Check your connection settings.'
      });
    }

    res.status(500).json({ 
      error: 'Internal server error! :<' 
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}
);